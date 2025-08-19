import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { SquareClient, SquareEnvironment } from 'square';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const squareClient = new SquareClient({
  environment: SquareEnvironment.Sandbox,
  token: process.env.SQUARE_ACCESS_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, countryCode, fullName, address, apartment, city, state, zip, country } = body;

    const customersApi = squareClient.customers;

    const customerResponse = await customersApi.create({
      idempotencyKey: crypto.randomUUID(),
      givenName: fullName.split(' ')[0],
      familyName: fullName.split(' ').slice(1).join(' '),
      emailAddress: email,
      phoneNumber: `${countryCode}${phone}`,
      address: {
        addressLine1: address,
        addressLine2: apartment,
        locality: city,
        administrativeDistrictLevel1: state,
        postalCode: zip,
        country: country, // 👈 must be 2-letter ISO 3166-1 alpha-2 code (e.g. "US")
      },
    });

    return NextResponse.json(customerResponse.customer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
