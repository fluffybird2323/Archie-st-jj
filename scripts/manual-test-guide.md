# Square Integration Manual Testing Guide

This guide walks you through manually testing the complete Square checkout and tracking flow.

## Prerequisites

Before testing, ensure you have:

- ✅ Square Sandbox account set up
- ✅ Environment variables configured:
  - `SQUARE_ACCESS_TOKEN`
  - `SQUARE_APPLICATION_ID`
  - `SQUARE_ENVIRONMENT=sandbox`
  - `SQUARE_LOCATION_ID`
- ✅ Application running locally or deployed

## Test Scenarios

### 1. Cart Functionality Test

**Objective**: Verify cart operations work correctly

**Steps**:
1. Navigate to any product page
2. Select size and color
3. Click "Add to Cart"
4. Open cart sidebar
5. Verify item appears with correct details
6. Test quantity increase/decrease buttons
7. Test item removal
8. Add multiple different items
9. Verify total calculation

**Expected Results**:
- ✅ Items add to cart correctly
- ✅ Quantities update properly
- ✅ Total price calculates correctly
- ✅ Items can be removed
- ✅ Cart persists across page navigation

### 2. Checkout Process Test

**Objective**: Test the complete checkout flow

**Steps**:
1. Add items to cart (minimum $1.00 total)
2. Click "CHECKOUT" button
3. Verify redirect to Square checkout page
4. Fill in test payment information:
   - **Card Number**: `4111 1111 1111 1111` (Visa)
   - **Expiry**: Any future date
   - **CVV**: `123`
   - **ZIP**: `12345`
5. Fill in shipping address
6. Complete payment
7. Verify redirect to success page

**Expected Results**:
- ✅ Checkout button creates Square session
- ✅ Redirects to Square hosted checkout
- ✅ Payment processes successfully
- ✅ Redirects back to success page
- ✅ Success page shows order details

### 3. Success Page Test

**Objective**: Verify order confirmation displays correctly

**Steps**:
1. Complete a checkout (from Test 2)
2. Verify success page loads
3. Check order number format (`ARTIE-XXXXXX`)
4. Verify estimated delivery date
5. Check order status indicators
6. Verify "Continue Shopping" button works

**Expected Results**:
- ✅ Success page loads without errors
- ✅ Order number displays correctly
- ✅ Delivery date is reasonable (5+ days)
- ✅ Status shows "Order Confirmed"
- ✅ Navigation works properly

### 4. Order Tracking Test

**Objective**: Test order lookup functionality

**Steps**:
1. Navigate to `/track-order`
2. Enter a valid order ID from previous test
3. Click "Track Order"
4. Verify order details display
5. Test with invalid order ID
6. Verify error handling

**Expected Results**:
- ✅ Valid order ID shows complete details
- ✅ Order status displays correctly
- ✅ Line items show with correct prices
- ✅ Invalid order ID shows appropriate error
- ✅ Form validation works

### 5. Multi-Language Test

**Objective**: Test internationalization

**Steps**:
1. Test checkout in different locales:
   - English (`/en` or `/`)
   - Japanese (`/ja`)
   - Chinese (`/zh`)
2. Verify currency conversion
3. Check order tracking in different languages

**Expected Results**:
- ✅ Prices display in correct currency
- ✅ Square checkout uses appropriate currency
- ✅ Order tracking works in all languages
- ✅ Success page shows localized content

### 6. Error Handling Test

**Objective**: Test error scenarios

**Steps**:
1. **Empty Cart**: Try checkout with empty cart
2. **Network Error**: Disconnect internet during checkout
3. **Invalid Order**: Track non-existent order
4. **Malformed Data**: Send invalid data to API

**Expected Results**:
- ✅ Empty cart shows appropriate message
- ✅ Network errors display user-friendly messages
- ✅ Invalid orders show "Order not found"
- ✅ API validates input properly

## Test Data

### Valid Test Credit Cards (Sandbox)
- **Visa**: `4111 1111 1111 1111`
- **Mastercard**: `5555 5555 5555 4444`
- **American Express**: `3782 822463 10005`

### Test Addresses
\`\`\`
Name: John Doe
Address: 123 Test Street
City: San Francisco
State: CA
ZIP: 94102
Country: US
\`\`\`

## Automated Testing

Run the automated test suite:

\`\`\`bash
# Install dependencies
npm install

# Run automated tests
npx ts-node scripts/test-square-integration.ts

# Or with custom base URL
BASE_URL=https://yourdomain.com npx ts-node scripts/test-square-integration.ts
\`\`\`

## Troubleshooting

### Common Issues

1. **"Square is not configured" error**
   - Check environment variables are set
   - Verify Square credentials are valid

2. **"Order not found" in tracking**
   - Ensure order was created successfully
   - Check order ID format (should start with order ID from Square)

3. **Checkout redirect fails**
   - Verify `NEXT_PUBLIC_BASE_URL` is set correctly
   - Check Square webhook/redirect URLs

4. **Currency conversion issues**
   - Verify exchange rates in `lib/i18n/config.ts`
   - Check locale detection

### Debug Steps

1. Check browser console for JavaScript errors
2. Check server logs for API errors
3. Verify Square Dashboard for order creation
4. Test with different browsers/devices

## Success Criteria

All tests should pass with:
- ✅ No JavaScript console errors
- ✅ Proper error handling and user feedback
- ✅ Correct currency conversion
- ✅ Successful payment processing
- ✅ Accurate order tracking
- ✅ Responsive design on mobile/desktop

## Production Checklist

Before going live:
- [ ] Switch `SQUARE_ENVIRONMENT` to `production`
- [ ] Update Square credentials to production keys
- [ ] Test with real payment methods
- [ ] Verify SSL certificate
- [ ] Test webhook endpoints (if implemented)
- [ ] Monitor error logs
