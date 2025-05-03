"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function CartLineItem({ item, removeFromCart, updateCartItemQuantity }) {
  const handleQuantityChange = (newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      updateCartItemQuantity(item.id, quantity);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-medium-gray">
      <div className="flex-shrink-0 w-24 h-24 relative">
        {item.merchandise.image ? (
          <Image
            src={item.merchandise.image.url}
            alt={item.merchandise.image.altText || item.merchandise.product.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">No Image</div>
        )}
      </div>
      <div className="flex-grow">
        <Link href={`/coffee/${item.merchandise.product.handle}`} className="font-semibold hover:underline">
          {item.merchandise.product.title}
        </Link>
        <div className="text-sm text-dark-gray">{item.merchandise.title}</div>
        <div className="text-sm text-dark-gray mt-1">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: item.cost.totalAmount.currencyCode,
          }).format(item.cost.totalAmount.amount / item.quantity)} each
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-sm text-red-600 hover:underline mt-2"
        >
          Remove
        </button>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border border-medium-gray rounded-md">
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-light-gray transition-colors disabled:opacity-50"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            className="w-12 h-8 text-center border-l border-r border-medium-gray"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            min="1"
            aria-label="Quantity"
          />
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-light-gray transition-colors"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="font-semibold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: item.cost.totalAmount.currencyCode,
          }).format(item.cost.totalAmount.amount)}
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const {
    cart,
    lineItems,
    loading,
    error,
    removeFromCart,
    updateCartItemQuantity,
    subtotal,
    currencyCode,
    checkoutUrl,
  } = useCart();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-coffee-brown mb-8">Your Cart</h1>

        {loading && <p className="text-center text-dark-gray">Loading cart...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <>
            {lineItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-dark-gray mb-4">Your cart is empty.</p>
                <Link href="/coffee" className="bg-coffee-brown text-cream px-6 py-3 rounded-md font-semibold hover:bg-coffee-brown/90 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                  {lineItems.map((item) => (
                    <CartLineItem
                      key={item.id}
                      item={item}
                      removeFromCart={removeFromCart}
                      updateCartItemQuantity={updateCartItemQuantity}
                    />
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                    <h2 className="text-xl font-serif text-coffee-brown mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currencyCode,
                        }).format(subtotal)}
                      </span>
                    </div>
                    <div className="text-sm text-dark-gray mb-4">
                      Shipping and taxes calculated at checkout.
                    </div>
                    <a
                      href={checkoutUrl}
                      className="block w-full text-center bg-caramel text-cream py-3 rounded-md font-semibold hover:bg-caramel/90 transition-colors"
                      // Disable if checkoutUrl is not available
                      aria-disabled={!checkoutUrl}
                      onClick={(e) => !checkoutUrl && e.preventDefault()} // Prevent navigation if no URL
                    >
                      {checkoutUrl ? "Proceed to Checkout" : "Checkout Unavailable"}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

