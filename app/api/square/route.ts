/// <reference types="node" />
import { type NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

// Initialize Square client with proper error handling
const getSquareClient = () => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const environment =
    process.env.NODE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox;

  if (!accessToken) {
    throw new Error("SQUARE_ACCESS_TOKEN environment variable is not set");
  }

  return new SquareClient({
    token: accessToken,
    environment,
  });
};

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          error:
            "Square is not configured. Please set SQUARE_ACCESS_TOKEN environment variable.",
        },
        { status: 500 }
      );
    }

    if (!process.env.SQUARE_LOCATION_ID) {
      return NextResponse.json(
        {
          error:
            "Square is not configured. Please set SQUARE_LOCATION_ID environment variable.",
        },
        { status: 500 }
      );
    }

    const squareClient = getSquareClient();
    const body = await request.json();

    const { lineItems } = body;

    const orderRequest = {
      order: {
        lineItems: lineItems,
        locationId: process.env.SQUARE_LOCATION_ID,
      },
      idempotencyKey: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    const { order } = await squareClient.orders.create(orderRequest);

    if (!order) {
        throw new Error("Failed to create Square order");
    }

    const paymentRequest = {
        sourceId: body.sourceId, // This will come from the client-side
        idempotencyKey: `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amountMoney: order.totalMoney,
        orderId: order.id,
    };

    const { payment } = await squareClient.payments.create(paymentRequest);

    return NextResponse.json({ payment });
  } catch (error) {
    console.error("Error processing Square request:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred while processing the request" },
      { status: 500 }
    );
  }
}