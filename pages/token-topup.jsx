import AppLayout from "@components/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getAppProps } from "utils/getAppProps";

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
    <>
      <div>TokenTopup page</div>
      <button
        className="relative p-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={clickHandler}
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="group relative  rounded-[6px] bg-primary px-8 py-2  text-primary-foreground  transition duration-200 hover:bg-transparent">
          Add tokens
        </div>
      </button>
    </>
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
