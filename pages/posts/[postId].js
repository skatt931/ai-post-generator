import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import AppLayout from "@components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Markdown from "react-markdown";
import { getAppProps } from "utils/getAppProps";

export default function Post(props) {
  console.log("Props: ", props);
  const keywords = props.keywords.split(", ");
  return (
    <div className="m-10">
      <div className="my-6 rounded-sm border-l-destructive bg-slate-400 p-2">
        Created at
      </div>
      <p>{props.createdAt}</p>
      <div className="my-6 rounded-sm border-l-destructive bg-slate-400 p-2">
        Meta Description
      </div>
      <div className="my-6 rounded-sm border-l-destructive bg-slate-400 p-2">
        Keywords
      </div>
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="mr-2 rounded-md bg-zinc-900 px-2 py-1 text-white"
        >
          #{keyword}
        </span>
      ))}
      <div className="my-6 rounded-sm border-l-destructive bg-slate-400 p-2">
        Blog Post
      </div>
      <Markdown>{props.postContent || ""}</Markdown>
    </div>
  );
}

Post.getLayout = (page, pageProps) => {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

// Protect the root of the application with withPageAuthRequired hook from the auth package
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);

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
        ...props,
      },
    };
  },
});
