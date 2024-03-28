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
  console.log("origin: ", origin);

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${origin}/success`,
    // cancel_url: `${process.env.NEXT_PUBLIC_URL}/token-topup`,
  });

  console.log("User", user);

  const client = await clientPromise;
  const db = client.db("CopyMatic");

  const userProfile = await db.collection("users").updateOne(
    {
      auth0Id: user.sub,
    },
    {
      $inc: {
        availableTokens: 10,
      },
      $setOnInsert: {
        auth0Id: user.sub,
      },
    },
    { upsert: true },
  );

  res.status(200).json({ session: checkoutSession });
}
