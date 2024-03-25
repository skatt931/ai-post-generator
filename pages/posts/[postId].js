import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import AppLayout from "../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Markdown from "react-markdown";

export default function Post(props) {
  console.log("Props: ", props);
  return (
    <div className="m-10">
      <h1 className="mb-5 text-xl">{props.topic}</h1>
      <Markdown>{props.postContent}</Markdown>
    </div>
  );
}

Post.getLayout = (page, pageProps) => {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

// Protect the root of the application with withPageAuthRequired hook from the auth package
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("CopyMatic");
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    // Get the post from the database
    const post = await db.collection("posts").findOne({
      // Get the post by the post ID
      _id: new ObjectId(ctx.params.postId),
      userId: user._id,
    });

    if (!post) {
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        postContent: post.postContent,
        title: post.title,
        topic: post.topic,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        createdAt: new Date(post.createdAt).toLocaleString(),
      },
    };
  },
});
