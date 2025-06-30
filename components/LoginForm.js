import Image from "next/image";
import FormContainer from "./FormContainer";

export default function LoginForm({ onLogin, onRequest, error, loading }) {
  function performLogin(formData) {
    onLogin?.(formData.username, formData.password);
  }

  function navigateRequest() {
    onRequest?.();
  }

  return (
    <div className="flex max-w-6xl h-full bg-black rounded-xl shadow-lg overflow-hidden">
      <div className="flex lg:flex-1 ">
        {/* Nav items */}
        <div className="w-1/6">
          {/* <button className=" border border-White text-white font-bold rounded-r-lg shadow-xl px-5 -mr-7 py-2 text-sm  transition-colors duration-150 bg-Red  focus:shadow-outline hover:bg-Red">
            Guest
          </button>
          <button className=" border border-White text-white font-bold rounded-r-lg shadow-xl px-3  mr-4 mt-2 py-2 text-sm  transition-colors duration-150 bg-Red focus:shadow-outline hover:bg-Red">
            Member
          </button> */}
        </div>
        {/* Splash image */}
        <div className="relative w-5/6">
          <Image src="/FinalBanner01.png" layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="flex flex-col justify-center text-center flex-1 ">
        <div className="p-8 overflow-y-auto ">
          <Image
            src="/MAS.png"
            alt="Picture of the author"
            width={200}
            height={100}
            objectFit="contain"
          />
          <h1 className="mt-2 text-center text-3xl font-bold uppercase ">
            Welcome to Insight
          </h1>
          <p className="mt-2 text-center text-sm font-light">
            We are a global apparel-tech conglomerate, setting the industry
            benchmark for sustainable and ethical manufacturing. In our
            relentless pursuit of innovation, we collaborate with the
            world&apos;s leading brands and nurture partnerships that have
            changed the course of the apparel industry.
          </p>
          <FormContainer
            className="flex mt-6 space-y-4 flex-col self-stretch"
            onSubmit={performLogin}
          >
            <input
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl placeholder-gray-500 placeholder-opacity-100 appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="px-4 py-2 bg-white  text-gray-700 border border-gray-300 rounded-xl placeholder-gray-500 placeholder-opacity-100 appearance-none focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password"
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
                {error.name === "InvalidParameterException" ? (
                  <span>Username not valid.</span>
                ) : (
                  <span>{error.message}</span>
                )}
              </p>
            )}
            <div className="flex justify-center items-center">
              <button
                className="flex justify-center items-center px-4 py-2 w-40  bg-red font-bold border border-white rounded-xl shadow-xl hover:bg-red disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                Login
              </button>
            </div>
          </FormContainer>
          <button
            className="block w-max mt-5 mx-auto text-neutral-400 text-xs hover:text-white hover:underline"
            onClick={navigateRequest}
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
}
