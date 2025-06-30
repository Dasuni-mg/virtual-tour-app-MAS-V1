import { withSSRContext } from "aws-amplify";
import Home9 from "../../../components/Home9";
import { getAllTours, getCurrentUser, getUser } from "../../../graphql/queries";

export async function getServerSideProps({ req, params }) {
  try {
    const SSR = withSSRContext({ req });
    const user = await SSR.Auth.currentAuthenticatedUser();
    const [userDetailResponse, tourResponse, currentUserResponse] =
      await Promise.all([
        SSR.API.graphql({
          query: getUser,
          variables: {
            username: params.username,
          },
        }),
        SSR.API.graphql({
          query: getAllTours,
        }),
        SSR.API.graphql({
          query: getCurrentUser,
        }),
      ]);

    const { id, ...rest } = userDetailResponse.data.getUser;
    const idParts = id.split("::");
    if (currentUserResponse.data.getCurrentUser.__typename !== "Visitor")
      return {
        props: {
          username: user.username,
          admin: true,
          user: { ...rest, id: idParts[1], username: idParts[0] },
          tours: tourResponse.data.getAllTours,
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

export default function Index({ tours, user }) {
  return <Home9 tours={tours} user={user} />;
}
