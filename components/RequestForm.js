import Image from "next/image";
import FormContainer from "./FormContainer";

export default function RequestForm({ onRequest, onLogin, error, loading }) {
  function performRequest(formData) {
    onRequest?.(formData.username);
  }

  function navigateLogin() {
    onLogin?.();
  }

  return (
    <div className="flex border-2 border-white rounded-xl shadow-lg overflow-hidden lg:self-center flex-col justify-center text-center">
      <div className="p-8 overflow-y-auto">
        <Image
          src="/MAS.png"
          alt="Picture of the author"
          width={200}
          height={100}
          objectFit="contain"
        />
        <h1 className="mt-2 text-center text-3xl font-bold uppercase">
          Forgot password?
        </h1>
        <p className="mt-2 text-center text-sm">
          Enter the username/email of your account to reset the password.
        </p>
        <FormContainer
          className="flex mt-10 space-y-4 flex-col self-stretch"
          onSubmit={performRequest}
        >
          <input
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl placeholder-gray-500 placeholder-opacity-100 appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            placeholder="Username"
          />
          {error && (
            <p className="text-yellow-400">
              <svg
                className="inline-block w-[24px] h-[24px] mr-2 align-top"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
              <span>{error.message}</span>
            </p>
          )}
          <button
            className="px-4 py-2 bg-red font-bold border border-white rounded-xl shadow-xl hover:bg-red disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            Next
          </button>
        </FormContainer>
        <button
          className="block w-max mt-6 mx-auto text-neutral-400 text-xs hover:text-white hover:underline"
          onClick={navigateLogin}
        >
          Go back to login
        </button>
      </div>
    </div>
  );
}
