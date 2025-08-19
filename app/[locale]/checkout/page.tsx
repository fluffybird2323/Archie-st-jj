import React from 'react';
import CheckoutForm from "@/components/checkout-form";
import OrderSummary from "@/components/order-summary";

export default function CheckoutPage() {
  return (
    <div className="container">
      <header className="header">
        <h1>Checkout</h1>
      </header>
      <div className="checkout-wrapper">
        <main className="main-content">
          <CheckoutForm />
        </main>
        <aside className="sidebar">
          <OrderSummary />
        </aside>
      </div>
    </div>
  );
}