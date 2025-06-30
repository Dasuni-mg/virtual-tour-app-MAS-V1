import { withSSRContext } from "aws-amplify";
import Home1 from "../components/Home1";
import { getCurrentUser } from "../graphql/queries";

export async function getServerSideProps({ req, params }) {
  try {
    const SSR = withSSRContext({ req });
    const user = await SSR.Auth.currentAuthenticatedUser();
    const response = await SSR.API.graphql({
      query: getCurrentUser,
    });

    return {
      props: {
        username: user.username,
        admin: response.data.getCurrentUser.__typename !== "Visitor",
        name: response.data.getCurrentUser.name,
      },
    };
  } catch (e) {
    if (["The user is not authenticated"].includes(e))
      return {
        redirect: { destination: "/login", permanent: false },
      };
    throw e;
  }
}

export default function Index({ name, admin }) {
  return <Home1 name={name} admin={admin} />;
}
