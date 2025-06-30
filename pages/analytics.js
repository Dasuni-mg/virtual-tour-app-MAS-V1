import { withSSRContext } from "aws-amplify";
import Home11 from "../components/Home11";
import { getCurrentUser } from "../graphql/queries";

export async function getServerSideProps({ req, params }) {
  try {
    const SSR = withSSRContext({ req });
    const user = await SSR.Auth.currentAuthenticatedUser();
    const userResponse = await SSR.API.graphql({
      query: getCurrentUser,
    });
    if (userResponse.data.getCurrentUser.__typename !== "Visitor")
      return {
        props: {
          username: user.username,
          admin: true,
        },
      };
    return {
      redirect: { destination: "/", permanent: true },
    };
  } catch (e) {
    if (["The user is not authenticated"].includes(e))
      return {
        redirect: { destination: "/login", permanent: false },
      };
    throw e;
  }
}

function Analytics() {
  return <Home11 />;
}

export default Analytics;
