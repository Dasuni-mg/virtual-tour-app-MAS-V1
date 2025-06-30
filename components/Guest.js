import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
import { useState } from "react";
export default function Guest(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onClick() {
    if (username && password) props.onSubmit(username, password);
  }

  return (
    <section className="h-full p-10 bg-neutral-800 overflow-hidden">
      <div className="flex max-w-6xl h-full mx-auto border-2 border-white rounded-xl shadow-lg">
        {/* Nav items */}
        {/* <div className="mt-40">
            <button className=" border border-White text-white font-bold rounded-r-lg shadow-xl px-5 -mr-7 py-2 text-sm  transition-colors duration-150 bg-Red  focus:shadow-outline hover:bg-Red">
              Guest
            </button>
            <button className=" border border-White text-white font-bold rounded-r-lg shadow-xl px-3  mr-4 mt-2 py-2 text-sm  transition-colors duration-150 bg-Red focus:shadow-outline hover:bg-Red">
              Member
            </button>
          </div> */}
        {/* Splash image */}
        <div className="relative lg:ml-4 lg:flex-1">
          <Image
            src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Input section */}
        <div className="p-8 flex-1">
          <a className="flex items-center justify-center  ">
            <Image
              src="/MAS.svg"
              alt="Picture of the author"
              width={100}
              height={120}
            ></Image>
          </a>

          <h1 className="text-3xl uppercase font-bold text-White text-center mb-2">
            Welcome To Insight.
          </h1>
          <p className="text-sm text-White text-center mb-14">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s.
          </p>

          <div className="mt-4">
            <input
              className="placeholder-gray-500 rounded-xl placeholder-opacity-100 bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              placeholder="User ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="mt-4">
            <div className="flex justify-between"></div>
            <input
              className="placeholder-gray-500 rounded-xl placeholder-opacity-100 bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="grid justify-items-center mt-8 ...">
            <button
              className=" rounded-xl shadow-xl bg-Red  mt-2 mb-2 border border-White text-white font-bold py-2 px-4 w-full rounded hover:bg-Red   "
              onClick={onClick}
            >
              Login
            </button>
          </div>
          <div className="mt-5 flex justify-around  ...">
            <a
              href="#"
              className="text-xs py-3 text-White  flex justify-center item-center"
            >
              Change Password
            </a>

            <a
              href="#"
              className="text-xs py-3 text-White  flex justify-center item-center"
            >
              Reset Password
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
