import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { shopifyFetch } from "@/lib/shopify";
import ProductOptions from "@/components/ProductOptions"; // Assuming a new component for options/variants

// GraphQL query to fetch a single product by handle, including variants and options
const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      seo {
        title
        description
      }
      options {
        id
        name
        values
      }
      variants(first: 100) { # Fetch up to 100 variants
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
               url
               altText
               width
               height
            }
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      # Fetch metafields if needed for origin, tasting notes etc.
      # Example: origin: metafield(namespace: "custom", key: "origin") { value }
    }
  }
`;

// Function to generate metadata for SEO
export async function generateMetadata({ params }) {
  const { handle } = params;
  try {
    const shopifyResponse = await shopifyFetch({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    const product = shopifyResponse.body.data.product;
    if (!product) {
      return { title: "Product Not Found" };
    }

    return {
      title: product.seo?.title || product.title,
      description: product.seo?.description || product.descriptionHtml.substring(0, 150), // Basic fallback
      openGraph: {
        title: product.title,
        description: product.seo?.description || product.descriptionHtml.substring(0, 150),
        images: product.images.edges.map(edge => ({
          url: edge.node.url,
          width: edge.node.width,
          height: edge.node.height,
          alt: edge.node.altText,
        })),
        type: "product",
      },
    };
  } catch (error) {
    console.error("Failed to fetch product metadata:", error);
    return { title: "Brewify Coffee" }; // Fallback title
  }
}

export default async function ProductDetailPage({ params }) {
  const { handle } = params;

  // Fetch product data from Shopify
  let product = null;
  try {
    const shopifyResponse = await shopifyFetch({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });
    product = shopifyResponse.body.data.product;
  } catch (error) {
    console.error(`Failed to fetch product (${handle}):`, error);
    // Handle error state appropriately in a real app
  }

  if (!product) {
    // TODO: Implement a proper Not Found page
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-serif text-coffee-brown">Product Not Found</h1>
          <p className="text-dark-gray mt-4">Sorry, we couldn\"t find the product you were looking for.</p>
        </div>
        <Footer />
      </>
    );
  }

  const firstImage = product.images.edges[0]?.node;
  const variants = product.variants.edges.map(edge => edge.node);

  // TODO: Extract origin, tasting notes etc. from metafields or description if needed
  const origin = "Fetched Origin"; // Placeholder
  const detailedDescription = "Fetched detailed description"; // Placeholder
  const tastingNotes = ["Note1", "Note2"]; // Placeholder
  const altitude = "Fetched Altitude"; // Placeholder
  const process = "Fetched Process"; // Placeholder
  const harvest = "Fetched Harvest"; // Placeholder

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Product images */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-[400px] md:h-[500px]">
                {firstImage ? (
                  <Image
                    src={firstImage.url}
                    alt={firstImage.altText || product.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
              </div>
              {/* TODO: Add thumbnail gallery if multiple images exist */}
            </div>
          </div>

          {/* Product details & options */}
          <div className="md:w-1/2">
            {/* <div className="mb-2 text-dark-gray">Origin: {origin}</div> */}
            <h1 className="text-3xl font-serif text-coffee-brown mb-4">{product.title}</h1>

            {/* Product Options Component (Handles Variants, Price, Add to Cart) */}
            <ProductOptions product={product} variants={variants} />

            {/* Same-day roasting notice */}
            <div className="bg-latte-foam p-4 rounded-md my-6">
              <div className="font-semibold mb-1">Same-Day Roasting</div>
              <p className="text-sm">
                We roast our coffee beans on the same day they\"re shipped to ensure maximum freshness.
                Orders placed before 12 PM EST will be roasted and shipped on the same day.
              </p>
            </div>

            {/* Shipping info */}
            <div className="text-sm text-dark-gray">
              <div className="flex items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free shipping on orders over $35
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ships within 1-2 business days
              </div>
            </div>
          </div>
        </div>

        {/* Product details tabs/section */}
        <div className="mt-16">
          <div className="border-b border-medium-gray mb-8">
            <div className="inline-block border-b-2 border-coffee-brown pb-2 font-semibold">
              Product Details
            </div>
          </div>

          <div className="prose max-w-none text-dark-gray mb-12" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          {/* TODO: Display specifications (origin, altitude, etc.) if fetched via metafields */}
          {/*
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-serif text-coffee-brown mb-4">About This Coffee</h2>
              <p className="text-dark-gray mb-4">{detailedDescription}</p>

              <h3 className="font-semibold mb-2">Tasting Notes</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {tastingNotes.map(note => (
                  <span key={note} className="bg-latte-foam px-3 py-1 rounded-full text-sm">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-serif text-coffee-brown mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Origin</h3>
                  <p className="text-dark-gray">{origin}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Altitude</h3>
                  <p className="text-dark-gray">{altitude}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Process</h3>
                  <p className="text-dark-gray">{process}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Harvest</h3>
                  <p className="text-dark-gray">{harvest}</p>
                </div>
              </div>
            </div>
          </div>
          */}

          {/* Brewing recommendations (Keep as static content for now) */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-xl font-serif text-coffee-brown mb-6">Brewing Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Pour Over</h3>
                <p className="text-dark-gray mb-2">
                  Ratio: 1:16 (coffee to water)<br />
                  Grind: Medium<br />
                  Water: 205°F
                </p>
                <p className="text-sm text-dark-gray">
                  Pour slowly in circular motions, allowing the coffee to bloom for 30 seconds before continuing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">French Press</h3>
                <p className="text-dark-gray mb-2">
                  Ratio: 1:12 (coffee to water)<br />
                  Grind: Coarse<br />
                  Water: 200°F
                </p>
                <p className="text-sm text-dark-gray">
                  Steep for 4 minutes, then press slowly and serve immediately.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Espresso</h3>
                <p className="text-dark-gray mb-2">
                  Ratio: 1:2 (coffee to water)<br />
                  Grind: Fine<br />
                  Water: 200°F
                </p>
                <p className="text-sm text-dark-gray">
                  Aim for a 25-30 second extraction time for best results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

