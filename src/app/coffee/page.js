import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { shopifyFetch } from "@/lib/shopify";

// GraphQL query to fetch coffee products from a specific collection
const GET_COFFEE_PRODUCTS_QUERY = `
  query GetCoffeeProducts {
    collection(handle: "coffee-beans") { # Assuming a collection with handle 'coffee-beans'
      title
      products(first: 20) { # Fetch first 20 products
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            tags # Assuming tags might be used for origin/roast, e.g., "Origin:Brazil"
          }
        }
      }
    }
  }
`;

// Helper function to transform Shopify product data into the format ProductCard expects
function transformShopifyProduct(shopifyProduct) {
  const productNode = shopifyProduct.node;
  return {
    id: productNode.id,
    name: productNode.title,
    handle: productNode.handle, // Use handle for linking
    // Extract origin/roast from tags if possible (example logic)
    origin: productNode.tags.find(tag => tag.startsWith("Origin:"))?.split(":")[1] || "Unknown",
    roast: productNode.tags.find(tag => tag.startsWith("Roast:"))?.split(":")[1] || "Unknown",
    price: parseFloat(productNode.priceRange.minVariantPrice.amount),
    image: productNode.images.edges[0]?.node.url || "/placeholder-image.jpg", // Fallback image
    altText: productNode.images.edges[0]?.node.altText || productNode.title,
    description: productNode.descriptionHtml, // Use descriptionHtml for potentially rich text
  };
}

export default async function CoffeePage() {
  // Fetch products from Shopify
  let products = [];
  let collectionTitle = "Coffee Beans";
  try {
    const shopifyResponse = await shopifyFetch({
      query: GET_COFFEE_PRODUCTS_QUERY,
    });
    if (shopifyResponse.body.data.collection) {
      collectionTitle = shopifyResponse.body.data.collection.title;
      products = shopifyResponse.body.data.collection.products.edges.map(transformShopifyProduct);
    } else {
      console.warn("Could not find collection 'coffee-beans'. Displaying empty list.");
    }
  } catch (error) {
    console.error("Failed to fetch Shopify products:", error);
    // Handle error state appropriately in a real app
  }

  // TODO: Re-implement filtering and sorting based on Shopify data (tags, price, etc.)
  // For now, just display all fetched products.

  return (
    <>
      <Header />

      <div className="bg-latte-foam py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif text-coffee-brown text-center mb-4">{collectionTitle}</h1>
          <p className="text-center text-dark-gray max-w-2xl mx-auto">
            Explore our selection of freshly roasted coffee beans from around the world.
            Each batch is roasted to perfection to bring out the unique flavors of each origin.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar - Placeholder/Needs reimplementation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-serif text-coffee-brown mb-6">Filters</h2>
              <p className="text-dark-gray text-sm">Filtering functionality coming soon!</p>
              {/* TODO: Add filters based on Shopify tags or metafields */}
            </div>
          </div>

          {/* Products grid */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-dark-gray">Showing {products.length} products</p>
              {/* TODO: Add sorting controls */}
              <div className="flex items-center">
                 <label htmlFor="sort" className="mr-2">Sort by:</label>
                 <select id="sort" className="border border-medium-gray rounded-md p-2" disabled>
                   <option value="featured">Featured</option>
                   {/* Add other sort options */}
                 </select>
               </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  // Ensure ProductCard uses the 'handle' for linking
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-dark-gray text-lg mb-4">No coffee products found.</p>
                <p className="text-dark-gray text-sm">Please ensure the 'coffee-beans' collection exists and contains products in your Shopify store.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

