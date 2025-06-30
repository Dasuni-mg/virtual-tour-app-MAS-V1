import { withSSRContext } from "aws-amplify";
import Home9 from "../../components/Home9";
import { getAllTours, getCurrentUser } from "../../graphql/queries";

export async function getServerSideProps({ req, params }) {
  try {
    const SSR = withSSRContext({ req });
    const user = await SSR.Auth.currentAuthenticatedUser();
    const [tourListResponse, currentUserResponse] = await Promise.all([
      SSR.API.graphql({
        query: getAllTours,
      }),
      SSR.API.graphql({
        query: getCurrentUser,
      }),
    ]);

    if (currentUserResponse.data.getCurrentUser.__typename !== "Visitor")
      return {
        props: {
          username: user.username,
          admin: true,
          tours: tourListResponse.data.getAllTours,
          clusterAdminEnabled:
            currentUserResponse.data.getCurrentUser.__typename ===
            "MasterAdmin",
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

export default function Create({ tours, clusterAdminEnabled }) {
  return <Home9 tours={tours} clusterAdminEnabled={clusterAdminEnabled} />;
}
