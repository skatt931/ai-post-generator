import { withPageAuthRequired } from "@auth0/nextjs-auth0";
// Protect the root of the application with withPageAuthRequired hook from the auth package
export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
