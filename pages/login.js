import { Auth } from "aws-amplify";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RequestForm from "../components/RequestForm";
import ResetForm from "../components/ResetForm";

export default function Login() {
  const router = useRouter();
  const [user, holdUser] = useState(null);
  const [forgotUser, holdForgotUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function performSignIn(username, password) {
    if (error) setError(null);
    setLoading(true);
    try {
      const user = await Auth.signIn(username, password);
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") return holdUser(user);
      router.push("/");
    } catch (err) {
      if (err.name === "PasswordResetRequiredException")
        return holdForgotUser({ username });
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function performCompleteNewPassword(
    password,
    passwordConfirm,
    confirmationCode
  ) {
    if (error) setError(null);
    setLoading(true);
    try {
      if (password !== passwordConfirm)
        throw new Error("Passwords do not match.");
      if (confirmationCode && forgotUser?.username) {
        await Auth.forgotPasswordSubmit(
          forgotUser.username,
          confirmationCode,
          password
        );
        return holdForgotUser(null);
      }
      await Auth.completeNewPassword(user, password);
      router.push("/?greeting=true");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  function performNavigateRequest() {
    if (error) setError(null);
    holdForgotUser({ username: null });
  }

  function performNavigateLogin() {
    if (error) setError(null);
    holdForgotUser(null);
  }

  async function performNavigateReset(username) {
    if (error) setError(null);
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      holdForgotUser({ username });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col mx-auto h-full p-10">
      {/* Input section */}
      {user || forgotUser?.username ? (
        <ResetForm
          forgot={forgotUser?.username}
          onReset={performCompleteNewPassword}
          error={error}
          loading={loading}
        />
      ) : forgotUser ? (
        <RequestForm
          onRequest={performNavigateReset}
          onLogin={performNavigateLogin}
          error={error}
          loading={loading}
        />
      ) : (
        <LoginForm
          onLogin={performSignIn}
          onRequest={performNavigateRequest}
          error={error}
          loading={loading}
        />
      )}
    </section>
  );
}
