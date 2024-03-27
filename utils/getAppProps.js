import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "@lib/mongodb";

export const getAppProps = async (ctx) => {
  const useSession = await getSession(ctx.req, ctx.res);
  const client = await clientPromise;
  const db = client.db("CopyMatic");
  const user = await db.collection("users").findOne({
    auth0Id: useSession?.user?.sub,
  });

  if (!user) {
    return {
      availableTokens: 0,
      posts: [],
    };
  }
  const post = await db
    .collection("posts")
    .find({
      userId: user._id,
    })
    .sort({ createdAt: -1 })
    .toArray();

  return {
    availableTokens: user.availableTokens,
    posts: post.map(({ _id, createdAt, userId, ...rest }) => ({
      _id: _id.toString(),
      createdAt: createdAt.toString(),
      ...rest,
    })),
    postId: ctx.params?.postId || null,
  };
};
