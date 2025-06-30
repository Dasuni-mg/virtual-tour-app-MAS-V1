import Image from "next/image";
import FormContainer from "./FormContainer";

export default function ResetForm({ forgot = false, onReset, error, loading }) {
  function performReset(formData) {
    onReset?.(formData.password, formData.password_confirm, formData.code);
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
          Create a new password
        </h1>
        {forgot && (
          <p className="mt-2 text-center text-sm">
            A <span className="font-semibold">confirmation code</span> has been
            sent to your email.
          </p>
        )}
        <div className="mt-4 p-4 bg-black rounded-lg text-start">
          <p className="text-sm">The new password should be:</p>
          <ul className="mt-2 text-sm list-disc list-inside">
            <li>8-character minimum length</li>
            <li>Contain at least 1 number</li>
            <li>
              Contain at least 1 special character (^ $ * . [ ] {} ( ) ? -
              &quot; ! @ # % &amp; / \ , &gt; &lt; &apos; : ; | _ ~ ` + = )
            </li>
            <li>Contain at least 1 lowercase letter</li>
            <li>Contain at least 1 uppercase letter</li>
          </ul>
        </div>
        <FormContainer
          className="flex mt-6 space-y-4 flex-col self-stretch"
          onSubmit={performReset}
        >
          {forgot && (
            <input
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl placeholder-gray-500 placeholder-opacity-100 appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              name="code"
              placeholder="Confirmation Code"
            />
          )}
          <input
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl placeholder-gray-500 placeholder-opacity-100 appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            placeholder="New password"
          />
          <input
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl placeholder-gray-500 placeholder-opacity-100 appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            name="password_confirm"
            placeholder="Confirm new password"
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
            Create new password
          </button>
        </FormContainer>
      </div>
    </div>
  );
}
