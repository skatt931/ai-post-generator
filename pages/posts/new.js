import { getServerSideProps } from "../api/utils/protectRoot";
import AppLayout from "../components/AppLayout";

export default function NewPost(props) {
  console.log(props.user);
  return <div>new post page</div>;
}

NewPost.getLayout = (page, pageProps) => {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

export { getServerSideProps };
