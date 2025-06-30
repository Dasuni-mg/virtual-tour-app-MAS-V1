import { Amplify } from "aws-amplify";
import cdkExports from "../cdk-exports.json";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";
import "../styles/globals.css";

Amplify.configure({
  aws_user_pools_id: cdkExports.InsightStack.awsUserPoolsId,
  aws_user_pools_web_client_id: cdkExports.InsightStack.awsUserPoolsWebClientId,
  aws_appsync_graphqlEndpoint:
    cdkExports.InsightStack.awsAppsyncGraphqlEndpoint,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  ssr: true,
});

function MyApp({
  Component,
  pageProps: { username, navBar = true, admin, ...rest },
}) {
  return (
    <div className="flex w-full h-full">
      {username && navBar && <NavBar admin={admin} />}
      <Component {...rest} username={username} admin={admin} />
    </div>
  );
}

export default MyApp;
