import { withSSRContext } from "aws-amplify";
import Home4 from "../components/Home4";
import { getCurrentUser } from "../graphql/queries";

export async function getServerSideProps({ req }) {
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
        schedules: response.data.getCurrentUser.meetings.item,
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

function Schedules({ schedules }) {
  return <Home4 schedules={schedules} />;
}

export default Schedules;
