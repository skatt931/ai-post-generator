import { getServerSideProps } from "./api/utils/protectRoot";
import AppLayout from "./components/AppLayout";

export default function TokenTopup() {
  return <div>TokenTopup page</div>;
}

TokenTopup.getLayout = (page, pageProps) => {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

export { getServerSideProps };
