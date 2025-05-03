'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    sameAddress: true,
    saveInfo: false
  });
  
  const [orderSummary] = useState({
    items: [
      {
        id: 1,
        name: 'Brazilian Cerrado',
        roast: 'Medium',
        grind: 'Whole Bean',
        price: 16.99,
        quantity: 2
      },
      {
        id: 3,
        name: 'Colombian Supremo',
        roast: 'Medium-Dark',
        grind: 'Medium',
        price: 17.99,
        quantity: 1
      }
    ],
    subtotal: 51.97,
    shipping: 0,
    total: 51.97
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the order to a backend
    alert('Order placed successfully!');
  };

  return (
    <>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif text-coffee-brown mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Shipping information */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-serif text-coffee-brown mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-dark-gray mb-1">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full p-2 border border-medium-gray rounded-md"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-dark-gray mb-1">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full p-2 border border-medium-gray rounded-md"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="email" className="block text-dark-gray mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-2 border border-medium-gray rounded-md"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-dark-gray mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full p-2 border border-medium-gray rounded-md"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-dark-gray mb-1">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full p-2 border border-medium-gray rounded-md"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="city" className="block text-dark-gray mb-1">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full p-2 border border-medium-gray rounded-md"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-dark-gray mb-1">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="w-full p-2 border border-medium-gray rounded-md"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-dark-gray mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      className="w-full p-2 border border-medium-gray rounded-md"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="country" className="block text-dark-gray mb-1">Country *</label>
                  <select
                    id="country"
                    name="country"
                    className="w-full p-2 border border-medium-gray rounded-md"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    name="sameAddress"
                    className="mr-2"
                    checked={formData.sameAddress}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="sameAddress">Billing address same as shipping</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    className="mr-2"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="saveInfo">Save this information for next time</label>
                </div>
              </div>
              
              {/* Payment information */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-serif text-coffee-brown mb-6">Payment Method</h2>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      className="mr-2"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="credit">Credit Card</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="debit"
                      name="paymentMethod"
                      value="debit"
                      className="mr-2"
                      checked={formData.paymentMethod === 'debit'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="debit">Debit Card</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      className="mr-2"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                </div>
                
                {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-dark-gray mb-1">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        className="w-full p-2 border border-medium-gray rounded-md"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-dark-gray mb-1">Name on Card *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        className="w-full p-2 border border-medium-gray rounded-md"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-dark-gray mb-1">Expiry Date *</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          className="w-full p-2 border border-medium-gray rounded-md"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-dark-gray mb-1">CVV *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          className="w-full p-2 border border-medium-gray rounded-md"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {formData.paymentMethod === 'paypal' && (
                  <div className="bg-latte-foam p-4 rounded-md">
                    <p>You will be redirected to PayPal to complete your payment after placing your order.</p>
                  </div>
                )}
              </div>
              
              {/* Special instructions */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-serif text-coffee-brown mb-4">Special Instructions</h2>
                <textarea
                  className="w-full p-2 border border-medium-gray rounded-md"
                  rows="3"
                  placeholder="Add any special instructions or notes about your order here..."
                ></textarea>
              </div>
            </form>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-serif text-coffee-brown mb-6">Order Summary</h2>
              
              <div className="mb-6">
                {orderSummary.items.map(item => (
                  <div key={item.id} className="flex justify-between mb-3">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-dark-gray">
                        {item.roast} • {item.grind} • Qty: {item.quantity}
                      </div>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-medium-gray pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>{orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between font-semibold text-lg mt-4">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-caramel text-cream py-3 rounded-md font-semibold hover:bg-caramel/90 transition-colors"
                onClick={handleSubmit}
              >
                Place Order
              </button>
              
              <div className="mt-6 text-sm text-dark-gray">
                <p>By placing your order, you agree to our <a href="/terms" className="text-coffee-brown hover:underline">Terms of Service</a> and <a href="/privacy" className="text-coffee-brown hover:underline">Privacy Policy</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
