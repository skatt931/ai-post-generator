import { getServerSideProps } from "./api/utils/protectRoot";
import AppLayout from "./components/AppLayout";

export default function TokenTopup() {
  const clickHandler = async () => {
    const response = await fetch("/api/addTokens", {
      method: "POST",
    });
    const data = await response.json();
    console.log("Result", data);
  };
  return (
    <>
      <div>TokenTopup page</div>
      <button className="btn" onClick={clickHandler}>
        Add tokens
      </button>
    </>
  );
}

TokenTopup.getLayout = (page, pageProps) => {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

export { getServerSideProps };
