'use client';

import React from 'react';
import { useCart } from "@/lib/cart-context";
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export default function OrderSummary() {
  const { state } = useCart();

  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="order-summary">
      {state.items.length > 0 && state.items.map((item: CartItem) => (
        <div key={item.id} className="product">
          <div className="product-info">
            <div className="product-image">
              <Image src={item.image} alt={item.name} width={64} height={64} />
              <span className="product-quantity">{item.quantity}</span>
            </div>
            <div className="product-details">
              <span className="product-name" style={{ marginBottom: '8px' }}>{item.name}</span><br></br>
              <span className="product-meta">Size: {item.size} • Color: {item.color}</span>
            </div>
          </div>
          <span className="product-price">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <div className="discount-section">
        <div className="discount-input-group">
          <input type="text" className="form-input" placeholder="Discount code" />
          <button className="pay-button apply-button">Apply</button>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span style={{ color: 'green' }}>Free</span>
        </div>
      </div>

      <div className="total-section">
        <div className="total-label">Total</div>
        <div className="total-price">${total.toFixed(2)}</div>
      </div>
    </div>
  );
}