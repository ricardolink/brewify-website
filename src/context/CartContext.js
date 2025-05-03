"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { shopifyFetch } from "@/lib/shopify";

// GraphQL Mutations and Queries for Cart
const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              cost {
                 totalAmount {
                   amount
                   currencyCode
                 }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ADD_CART_LINES_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              cost {
                 totalAmount {
                   amount
                   currencyCode
                 }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const REMOVE_CART_LINES_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              cost {
                 totalAmount {
                   amount
                   currencyCode
                 }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_CART_LINES_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              cost {
                 totalAmount {
                   amount
                   currencyCode
                 }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  handle
                }
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
            cost {
               totalAmount {
                 amount
                 currencyCode
               }
            }
          }
        }
      }
    }
  }
`;

// Create Context
const CartContext = createContext();

// Local Storage Key
const CART_ID_STORAGE_KEY = "brewify_shopify_cart_id";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch or Create Cart on Initial Load
  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      setError(null);
      const existingCartId = localStorage.getItem(CART_ID_STORAGE_KEY);

      if (existingCartId) {
        try {
          const { body } = await shopifyFetch({
            query: GET_CART_QUERY,
            variables: { cartId: existingCartId },
          });
          if (body.data.cart) {
            setCart(body.data.cart);
            setCartId(existingCartId);
          } else {
            // Cart ID exists but cart not found (maybe expired/deleted)
            localStorage.removeItem(CART_ID_STORAGE_KEY);
            await createCart(); // Create a new one
          }
        } catch (e) {
          console.error("Error fetching existing cart:", e);
          setError("Could not fetch cart.");
          localStorage.removeItem(CART_ID_STORAGE_KEY);
          // Optionally try creating a new cart here too
        }
      } else {
        await createCart();
      }
      setLoading(false);
    };

    initializeCart();
  }, []); // Run only once on mount

  // Create a new cart
  const createCart = useCallback(async () => {
    try {
      const { body } = await shopifyFetch({
        query: CREATE_CART_MUTATION,
        variables: { input: {} }, // Can add buyerIdentity etc. here if needed
      });
      if (body.data.cartCreate.userErrors.length) {
        throw new Error(body.data.cartCreate.userErrors[0].message);
      }
      const newCart = body.data.cartCreate.cart;
      setCart(newCart);
      setCartId(newCart.id);
      localStorage.setItem(CART_ID_STORAGE_KEY, newCart.id);
    } catch (e) {
      console.error("Error creating cart:", e);
      setError("Could not create cart.");
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(
    async (item) => {
      if (!cartId) {
        setError("Cart not initialized.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const { body } = await shopifyFetch({
          query: ADD_CART_LINES_MUTATION,
          variables: {
            cartId,
            lines: [{ merchandiseId: item.variantId, quantity: item.quantity }],
          },
        });
        if (body.data.cartLinesAdd.userErrors.length) {
          throw new Error(body.data.cartLinesAdd.userErrors[0].message);
        }
        setCart(body.data.cartLinesAdd.cart);
      } catch (e) {
        console.error("Error adding item to cart:", e);
        setError("Could not add item to cart.");
      }
      setLoading(false);
    },
    [cartId]
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    async (lineId) => {
      if (!cartId) {
        setError("Cart not initialized.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const { body } = await shopifyFetch({
          query: REMOVE_CART_LINES_MUTATION,
          variables: { cartId, lineIds: [lineId] },
        });
        if (body.data.cartLinesRemove.userErrors.length) {
          throw new Error(body.data.cartLinesRemove.userErrors[0].message);
        }
        setCart(body.data.cartLinesRemove.cart);
      } catch (e) {
        console.error("Error removing item from cart:", e);
        setError("Could not remove item from cart.");
      }
      setLoading(false);
    },
    [cartId]
  );

  // Update item quantity in cart
  const updateCartItemQuantity = useCallback(
    async (lineId, quantity) => {
      if (!cartId) {
        setError("Cart not initialized.");
        return;
      }
      if (quantity < 1) {
        // Use remove if quantity is 0 or less
        removeFromCart(lineId);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const { body } = await shopifyFetch({
          query: UPDATE_CART_LINES_MUTATION,
          variables: { cartId, lines: [{ id: lineId, quantity }] },
        });
        if (body.data.cartLinesUpdate.userErrors.length) {
          throw new Error(body.data.cartLinesUpdate.userErrors[0].message);
        }
        setCart(body.data.cartLinesUpdate.cart);
      } catch (e) {
        console.error("Error updating item quantity:", e);
        setError("Could not update item quantity.");
      }
      setLoading(false);
    },
    [cartId, removeFromCart]
  );

  // Memoize context value
  const value = useMemo(
    () => ({
      cart,
      cartId,
      loading,
      error,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      lineItems: cart?.lines?.edges?.map(edge => edge.node) || [],
      totalQuantity: cart?.lines?.edges?.reduce((sum, edge) => sum + edge.node.quantity, 0) || 0,
      subtotal: cart?.cost?.subtotalAmount?.amount,
      total: cart?.cost?.totalAmount?.amount,
      currencyCode: cart?.cost?.totalAmount?.currencyCode || "USD",
      checkoutUrl: cart?.checkoutUrl,
    }),
    [cart, cartId, loading, error, addToCart, removeFromCart, updateCartItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use the CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

