
"use client";

import { useState, useMemo, useCallback } from "react";
import { useCart } from "@/context/CartContext"; // Assuming a CartContext exists/will be created

function ProductOptions({ product, variants }) {
  const { addToCart } = useCart(); // Use cart context hook
  const [quantity, setQuantity] = useState(1);

  // Initialize selected options based on the first available variant
  const initialVariant = variants.find(v => v.availableForSale) || variants[0];
  const initialOptions = initialVariant.selectedOptions.reduce((acc, option) => {
    acc[option.name] = option.value;
    return acc;
  }, {});
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  // Find the currently selected variant based on selected options
  const selectedVariant = useMemo(() => {
    return variants.find(variant =>
      variant.selectedOptions.every(
        option => selectedOptions[option.name] === option.value
      )
    );
  }, [variants, selectedOptions]);

  // Handle option selection change
  const handleOptionChange = useCallback((optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value,
    }));
  }, []);

  // Handle quantity change
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedVariant) {
      console.error("No variant selected");
      // Optionally show an error message to the user
      return;
    }
    if (!selectedVariant.availableForSale) {
      alert("Sorry, this variant is currently sold out.");
      return;
    }

    // Call the addToCart function from context
    addToCart({
      variantId: selectedVariant.id,
      quantity: quantity,
      // Pass necessary product info for cart display
      title: product.title,
      handle: product.handle,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price.amount,
      currencyCode: selectedVariant.price.currencyCode,
      image: selectedVariant.image?.url || product.images.edges[0]?.node.url,
    });

    alert(`${quantity} x ${product.title} (${selectedVariant.title}) added to cart!`); // Placeholder confirmation
  };

  const price = selectedVariant?.price.amount;
  const compareAtPrice = selectedVariant?.compareAtPrice?.amount;
  const currencyCode = selectedVariant?.price.currencyCode || "USD"; // Default currency
  const isAvailable = selectedVariant?.availableForSale || false;

  return (
    <div>
      {/* Price Display */}
      <div className="text-2xl text-coffee-brown font-semibold mb-4 flex items-baseline gap-2">
        <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(price)}</span>
        {compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price) && (
          <span className="text-lg text-gray-500 line-through">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(compareAtPrice)}
          </span>
        )}
      </div>

      {/* Variant Options */}
      {product.options.map(option => (
        <div key={option.id} className="mb-6">
          <label className="block font-semibold mb-2">{option.name}:</label>
          <div className="flex flex-wrap gap-2">
            {option.values.map(value => {
              const isActive = selectedOptions[option.name] === value;
              // Check if this option value leads to an available variant
              // (Simple check: assumes options are independent, might need refinement)
              const isPossible = variants.some(variant =>
                variant.selectedOptions.find(opt => opt.name === option.name && opt.value === value)
              );

              return (
                <button
                  key={value}
                  className={`px-4 py-2 rounded-md border ${
                    isActive
                      ? "bg-coffee-brown text-cream border-coffee-brown"
                      : isPossible
                      ? "bg-white text-coffee-brown border-medium-gray hover:border-coffee-brown"
                      : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                  } transition-colors`}
                  onClick={() => isPossible && handleOptionChange(option.name, value)}
                  disabled={!isPossible}
                  aria-label={`Select ${option.name} ${value}`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Quantity:</label>
        <div className="flex items-center">
          <button
            className="w-10 h-10 flex items-center justify-center border border-medium-gray rounded-l-md hover:bg-light-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            className="w-16 h-10 border-t border-b border-medium-gray text-center"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            aria-label="Quantity"
          />
          <button
            className="w-10 h-10 flex items-center justify-center border border-medium-gray rounded-r-md hover:bg-light-gray transition-colors"
            onClick={() => handleQuantityChange(1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-caramel text-cream py-3 rounded-md font-semibold hover:bg-caramel/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={handleAddToCart}
        disabled={!isAvailable}
      >
        {isAvailable ? "Add to Cart" : "Sold Out"}
      </button>
    </div>
  );
}

export default ProductOptions;

