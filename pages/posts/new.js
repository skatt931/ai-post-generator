import AppLayout from "@components/AppLayout";
import { useState } from "react";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { getAppProps } from "utils/getAppProps";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function NewPost(props) {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    const response = await fetch("/api/generatePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, keywords }),
    });
    const data = await response.json();
    console.log("Result", data);
    setLoadingState(false);
    if (data?.postId) {
      router.push(`/posts/${data.postId}`);
    }
  };
  return (
    <div className="my-10 mx-5 flex flex-col gap-5">
      <form onSubmit={handleSubmit} className="light flex flex-col gap-5">
        <div>
          <Label htmlFor="topic" className="font-bold">
            Generate a blog post on the topic of:
          </Label>
          <Textarea
            placeholder="Enter the topic of your blog post here"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="my-2 block h-32 w-full resize-none px-4 py-2"
          />
        </div>
        <div>
          <Label htmlFor="keywords" className="font-bold">
            Targeting the following keywords:
          </Label>
          <Textarea
            placeholder="e.g. CMS, Next.js, React"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="my-2 block h-32 w-full resize-none rounded-md"
          />
        </div>
        <button className="relative h-[40px] p-[3px]" type="submit">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="group relative flex justify-center  rounded-[6px] bg-primary px-8 py-2  text-primary-foreground  transition duration-200 hover:bg-transparent">
            {loadingState ? (
              <Loader2 height={36} className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>Generate</>
            )}
          </div>
        </button>
      </form>
    </div>
  );
}

NewPost.getLayout = (page, pageProps) => {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
