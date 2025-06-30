import Contact from "../components/Contact";
import React from "react";
import { withSSRContext } from "aws-amplify";
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
        navBar: false,
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

export default function assist_us() {
  return <Contact />;
}
