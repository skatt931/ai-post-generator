import AppLayout from "@components/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getAppProps } from "utils/getAppProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

export default function TokenTopup() {
  const clickHandler = async () => {
    const response = await fetch("/api/addTokens", {
      method: "POST",
    });
    const data = await response.json();
    console.log("Result", data);
    window.location.href = data.session.url;
  };
  return (
    <div className="my-10 flex h-screen w-[100%] flex-col gap-5 overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-auto">
        <div className="m-auto flex w-full max-w-screen-sm flex-col gap-5 rounded-md border border-slate-200 bg-card p-4 text-center align-middle shadow-2xl shadow-slate-400">
          <h1>Add tokens </h1>
          <p>You can add tokens to your account</p>
          <button
            className="relative p-[3px] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={clickHandler}
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div className="group relative  rounded-[6px] bg-primary px-8 py-2  text-primary-foreground  transition duration-200 hover:bg-transparent">
              Add tokens
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

TokenTopup.getLayout = (page, pageProps) => {
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
