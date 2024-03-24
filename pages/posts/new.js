import { getServerSideProps } from "../api/utils/protectRoot";
import AppLayout from "../components/AppLayout";
import { useState } from "react";
import Markdown from "react-markdown";

export default function NewPost(props) {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [postContent, setPostContent] = useState("");

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
    setPostContent(data.post.postContent);
    setLoadingState(false);
  };
  return (
    <div className="flex flex-col gap-5 my-10 mx-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="topic">
            <strong>Generate a blog post on the topic of:</strong>
          </label>
          <textarea
            className="resize-none border-slate-500 w-full block my-2 px-4 py-2 rounded-md"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="topic">
            <strong>Targeting the following keywords:</strong>
          </label>
          <textarea
            className="resize-none border-slate-500 w-full block my-2 px-4 py-2 rounded-md"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Generate
        </button>
      </form>
      <div>
        {loadingState ? "Loading..." : <Markdown>{postContent}</Markdown>}
      </div>
    </div>
  );
}

NewPost.getLayout = (page, pageProps) => {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

export { getServerSideProps };
