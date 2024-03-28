import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";

import stripeInit from "stripe";

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export default async function addTokens(req, res) {
  const { user } = await getSession(req, res);

  const lineItems = [
    {
      price: process.env.STRIPE_PRODUCT_PRICE_ID,
      quantity: 1,
    },
  ];

  const protocol =
    process.env.NODE_ENV === "production" ? "https://" : "http://";
  const host = req.headers.host;
  const origin = protocol + host;

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${origin}/success`,
    payment_intent_data: {
      // Metadata should be placed in both places to ensure it is passed to the webhook
      metadata: {
        sub: user.sub,
      },
    },
    // Metadata should be placed in both places to ensure it is passed to the webhook
    metadata: {
      sub: user.sub,
    },
    // cancel_url: `${process.env.NEXT_PUBLIC_URL}/token-topup`,
  });

  console.log("User", user);

  res.status(200).json({ session: checkoutSession });
}
