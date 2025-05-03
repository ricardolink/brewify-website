import { createStorefrontClient } from "@shopify/hydrogen-react";

const storefrontClient = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  storefrontApiVersion: "2025-01", // Explicitly set the API version
});

export async function shopifyFetch({ query, variables }) {
  const response = await storefrontClient.fetch(query, {
    variables,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Shopify API request failed: ${response.status} ${errorBody}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error("Shopify API errors:", json.errors);
    throw new Error("Shopify API returned errors");
  }

  return {
    status: response.status,
    body: json,
  };
}

