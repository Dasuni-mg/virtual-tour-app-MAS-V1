import { withSSRContext } from "aws-amplify";
import Home3 from "../../components/Home3";
import { getCurrentUser } from "../../graphql/queries";

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
        tours: response.data.getCurrentUser.tours.item,
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

export default function Tours({ tours = [] }) {
  console.log(tours)
  return (
    <Home3
      tours={Object.entries(
        tours.reduce(
          (obj, { tour }) =>
            !Object.keys(obj).includes(tour.cluster.id)
              ? { ...obj, [tour.cluster.id]: tour.cluster.name }
              : obj,
          {}
        )
      ).reduce(
        (obj, [key, value]) => ({
          ...obj,
          [value]: tours
            .filter(({ tour }) => tour.cluster.id === key)
            .map(({ tour: { cluster, ...rest } }) => rest),
        }),
        {}
      )}
    />
  );
}
