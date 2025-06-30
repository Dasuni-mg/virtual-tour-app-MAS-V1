import { withSSRContext } from "aws-amplify";
import Home6 from "../../../components/Home6";
import { getCurrentUser } from "../../../graphql/queries";

export async function getServerSideProps({ req, params }) {
  try {
    const SSR = withSSRContext({ req });
    const user = await SSR.Auth.currentAuthenticatedUser();
    await SSR.Auth.currentAuthenticatedUser();
    const response = await SSR.API.graphql({
      query: getCurrentUser,
    });

    return {
      props: {
        username: user.username,
        tour: params.id,
        admin: response.data.getCurrentUser.__typename !== "Visitor",
        email: user.attributes.email,
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

function Schedule({ tour, email }) {
  return <Home6 tour={tour} email={email} />;
}

export default Schedule;
