import AppLayout from "@components/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getAppProps } from "utils/getAppProps";

export default function Success() {
  return (
    <>
      <h1>Thank you for your purchase!</h1>
    </>
  );
}

Success.getLayout = (page, pageProps) => {
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
