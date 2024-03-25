import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import OpenAI from "openai";
import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function generatePost(req, res) {
  // Get the user session
  const { user } = await getSession(req, res);
  // Get the MongoDB client
  const client = await clientPromise;
  // Get the MongoDB database
  const db = client.db("CopyMatic");

  // Get the user profile
  const userProfile = await db.collection("users").findOne({
    auth0Id: user.sub,
  });

  // Check if the user has enough tokens
  if (!userProfile?.availableTokens) {
    return res.status(403).json({ error: "Not enough tokens" });
  }

  // Create an OpenAI instance
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Get the topic and keywords from the request body
  const { topic, keywords } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are an SEO-friendly blog post generator called Copymatic. You are designed to output markdown without frontmatter",
      },
      {
        role: "user",
        content: `
          Generate a long and detailed SEO-friendly blog post on the flowing topic delimited by triple hyphens: 
          ---
          ${topic}
          ---
          Targeting the following comma-separated keywords delimited by triple hyphens: 
          ---
          ${keywords}
          ---
        `,
      },
    ],
  });

  const postContent = response.choices[0]?.message?.content;

  const seoResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are an SEO-friendly blog post generator called Copymatic. You are designed to output JSON. Do not include HTML tags in your output.",
      },
      {
        role: "user",
        content: `
          Generate an SEO-friendly title adn SEO-friendly meta description for the following blog post: ${postContent}
        ---
        The output JSON must be in the following format:
        {
          "title": "Example title",
          "metaDescription": "Example meta description"
        }
          `,
      },
    ],
    response_format: { type: "json_object" },
  });

  // Get the title and meta description from the response
  // TODO: Not getting the title and meta description from the response
  const { title, metaDescription } =
    (await seoResponse.choices[0]?.message?.content) ?? {};

  // Deduct a token from the user
  await db.collection("users").updateOne(
    { auth0Id: user.sub },
    {
      $inc: {
        availableTokens: -1,
      },
    },
  );

  const post = await db.collection("posts").insertOne({
    postContent,
    title,
    metaDescription,
    topic,
    keywords,
    userId: userProfile._id,
    createdAt: new Date(),
  });

  // Return the post content, title, and meta description
  res.status(200).json({ post: { postContent, title, metaDescription } });
});
