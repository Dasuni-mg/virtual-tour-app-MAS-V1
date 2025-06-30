import { API, Auth } from "aws-amplify";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { sendSupportMessage } from "../graphql/mutations";
import FormContainer from "./FormContainer";

export default function Contact() {
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const onSubmit = async (formData) => {
    const user = await Auth.currentAuthenticatedUser();
    await API.graphql({
      query: sendSupportMessage,
      variables: {
        email: user.attributes.email,
        ...formData,
      },
    });
    setEmailSent(true);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="item-center justify-center mx-auto">
      <div className="m-10 flex border-2 border-white rounded-xl shadow-lg overflow-hidden lg:self-center flex-col justify-center text-center">
        <div className="p-10 m-15 justify-center min-w-[768px]">
          <Image
            src="/MAS.png"
            alt="Picture of the author"
            width={200}
            height={100}
            objectFit="contain"
          />
          <h1 className="mt-2 text-center text-3xl font-bold uppercase ">
            System Support
          </h1>
          {/* <p className="mt-2 text-center text-sm font-light">
            We are a global apparel-tech conglomerate, setting the industry
            benchmark for sustainable and ethical manufacturing. In our
            relentless pursuit of innovation, we collaborate with the
            world&apos;s leading brands and nurture partnerships that have
            changed the course of the apparel industry.
          </p> */}
          {emailSent ? (
            <div>
              <p className="mt-2 text-center text-sm font-light">
                Email has been received successfully.
              </p>
            </div>
          ) : (
            <FormContainer
              className="flex mt-10 space-y-4 flex-col self-stretch"
              onSubmit={onSubmit}
            >
              <input
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl placeholder-gray-500 placeholder-opacity-100 appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                name="subject"
                placeholder="Subject"
              />
              <textarea
                className="px-4 h-20 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl placeholder-gray-500 placeholder-opacity-100 appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                name="message"
                placeholder="Message"
              />
              <button
                className="px-5 py-2 bg-red font-bold border border-white rounded-xl shadow-xl hover:bg-red disabled:opacity-50"
                type="Submit"
              >
                Submit
              </button>
            </FormContainer>
          )}
          <button
            className="block w-max mt-6 mx-auto text-neutral-400 text-xs hover:text-white hover:underline"
            onClick={goBack}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
