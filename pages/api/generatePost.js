import OpenAI from "openai";

export default async function generatePost(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

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

  const { title, metaDescription } =
    seoResponse.choices[0]?.message?.content ?? {};

  console.log("SEO Response", seoResponse.choices[0]?.message?.content);

  res.status(200).json({ post: { postContent, title, metaDescription } });
}
