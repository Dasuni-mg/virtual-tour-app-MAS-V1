import { withSSRContext } from "aws-amplify";
import Home10 from "../../components/Home10";
import { getCurrentUser, getUser } from "../../graphql/queries";

export async function getServerSideProps({ req, params }) {
  try {
    const SSR = withSSRContext({ req });
    const user = await SSR.Auth.currentAuthenticatedUser();
    const [userDetailResponse, currentUserResponse] = await Promise.all([
      SSR.API.graphql({
        query: getUser,
        variables: {
          username: params.username,
        },
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

export default function Index({ user }) {
  console.log(user);
  return <Home10 user={user} />;
}
