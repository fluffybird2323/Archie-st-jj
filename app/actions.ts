"use server";

// Patch JSON.stringify to handle BigInt
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";
// Define supported currency codes
type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'SEK' | 'NZD' | 'MXN' | 'SGD' | 'HKD' | 'NOK' | 'KRW' | 'TRY' | 'RUB' | 'INR' | 'BRL' | 'ZAR' | 'DKK' | 'PLN' | 'THB' | 'IDR' | 'HUF' | 'CZK' | 'ILS' | 'CLP' | 'PHP' | 'AED' | 'COP' | 'SAR' | 'MYR' | 'RON' | 'ARS' | 'VND' | 'UAH' | 'PEN' | 'KWD' | 'QAR' | 'OMR' | 'BHD' | 'NGN' | 'EGP' | 'PKR' | 'BDT' | 'LKR' | 'DZD' | 'MAD' | 'TND' | 'JOD' | 'LBP' | 'SDG' | 'SYP' | 'YER' | 'IQD' | 'AFN' | 'ALL' | 'AMD' | 'ANG' | 'AOA' | 'AWG' | 'AZN' | 'BAM' | 'BBD' | 'BGN' | 'BIF' | 'BMD' | 'BND' | 'BOB' | 'BSD' | 'BTN' | 'BWP' | 'BYN' | 'BZD' | 'CDF' | 'CRC' | 'CUP' | 'CVE' | 'DJF' | 'DOP' | 'ERN' | 'ETB' | 'FJD' | 'FKP' | 'GEL' | 'GHS' | 'GIP' | 'GMD' | 'GNF' | 'GTQ' | 'GYD' | 'HNL' | 'HRK' | 'HTG' | 'ISK' | 'JMD' | 'KES' | 'KGS' | 'KHR' | 'KMF' | 'KYD' | 'KZT' | 'LAK' | 'LRD' | 'LSL' | 'LYD' | 'MDL' | 'MGA' | 'MKD' | 'MMK' | 'MNT' | 'MOP' | 'MRO' | 'MUR' | 'MVR' | 'MWK' | 'MZN' | 'NAD' | 'NIO' | 'NPR' | 'PAB' | 'PGK' | 'PYG' | 'RSD' | 'RWF' | 'SBD' | 'SCR' | 'SHP' | 'SLL' | 'SOS' | 'SRD' | 'SSP' | 'STD' | 'SVC' | 'SZL' | 'TJS' | 'TMT' | 'TND' | 'TOP' | 'TTD' | 'TWD' | 'TZS' | 'UGX' | 'UYU' | 'UZS' | 'VEF' | 'VUV' | 'WST' | 'XAF' | 'XCD' | 'XOF' | 'XPF' | 'ZMW' | 'ZWL';

function getCurrencyFromCountryCode(countryCode: string): Currency {
  const countryToCurrency: Record<string, Currency> = {
    US: 'USD',
    GB: 'GBP',
    JP: 'JPY',
    CA: 'CAD',
    AU: 'AUD',
    CH: 'CHF',
    CN: 'CNY',
    SE: 'SEK',
    NZ: 'NZD',
    MX: 'MXN',
    SG: 'SGD',
    HK: 'HKD',
    NO: 'NOK',
    KR: 'KRW',
    TR: 'TRY',
    RU: 'RUB',
    IN: 'INR',
    BR: 'BRL',
    ZA: 'ZAR',
    DK: 'DKK',
    PL: 'PLN',
    TH: 'THB',
    ID: 'IDR',
    HU: 'HUF',
    CZ: 'CZK',
    IL: 'ILS',
    CL: 'CLP',
    PH: 'PHP',
    AE: 'AED',
    CO: 'COP',
    SA: 'SAR',
    MY: 'MYR',
    RO: 'RON',
    AR: 'ARS',
    VN: 'VND',
    UA: 'UAH',
    PE: 'PEN',
    KW: 'KWD',
    QA: 'QAR',
    OM: 'OMR',
    BH: 'BHD',
    NG: 'NGN',
    EG: 'EGP',
    PK: 'PKR',
    BD: 'BDT',
    LK: 'LKR',
    DZ: 'DZD',
    MA: 'MAD',
    TN: 'TND',
    JO: 'JOD',
    LBP: 'LBP',
    SD: 'SDG',
    SY: 'SYP',
    YE: 'YER',
    IQ: 'IQD',
    AF: 'AFN',
    AL: 'ALL',
    AM: 'AMD',
    // Add more country codes and currencies as needed
  };

  return countryToCurrency[countryCode] || 'USD';
}

//country corresponding to currency 
type Country =
  | "US" | "GB" | "AU" | "CA" | "CN" | "HK" | "NZ" | "SG"
  | "TR" | "ZA" | "RU" | "IN" | "BR" | "MX" | "PH" | "TH"
  | "ID" | "KR" | "MY" | "VN" | "JP" | "KR" | "TH";


if (!process.env.SQUARE_ACCESS_TOKEN) {
  throw new Error("Missing SQUARE_ACCESS_TOKEN environment variable");
}

const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
});

// ---------------- Payment ----------------
export async function submitPayment(
  sourceId: string,
  customerId: string,
  amount: number,
  countryCode: string
) {
  console.log('submitPayment function called with arguments:', { sourceId, customerId, amount, countryCode });
  const currency = getCurrencyFromCountryCode(countryCode);
  console.log('Amount before Square API call:', amount);
  console.log('Type of amount before Square API call:', typeof amount);
  try {
    const response = await squareClient.payments.create({
      idempotencyKey: randomUUID(),
      sourceId,
      customerId,
      amountMoney: {
        amount: Math.round(amount),
        currency,
      },
    });

    if (response.errors) {
      console.error("Square API Errors:", response.errors);
      throw new Error(JSON.stringify(response.errors));
    }

    return response.payment;
  } catch (error) {
    console.error("Unexpected error in submitPayment:", error);
    throw error;
  }
}

// ---------------- Customer ----------------
export async function createCustomer(
  email: string,
  phone: string,
  countryCode: string,
  fullName: string,
  address: string,
  apartment: string,
  city: string,
  state: string,
  zip: string,
  country: string
) {
  try {
    const response = await squareClient.customers.create({
      idempotencyKey: randomUUID(),
      givenName: fullName.split(" ")[0] || undefined,
      familyName: fullName.split(" ").slice(1).join(" ") || undefined,
      emailAddress: email,
      phoneNumber: `${countryCode}${phone}`,
      address: {
        addressLine1: address,
        addressLine2: apartment,
        locality: city,
        administrativeDistrictLevel1: state,
        postalCode: zip,
        country: country as Country, // must be 2-letter ISO code
      },
    });

    if (response.errors) {
      console.error("Square API Errors:", response.errors);
      throw new Error(JSON.stringify(response.errors));
    }

    return response.customer;
  } catch (error) {
    console.error("Unexpected error in createCustomer:", error);
    throw error;
  }
}

