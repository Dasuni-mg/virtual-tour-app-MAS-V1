import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
export default function Header() {
  return (
    <section className="text-gray-400 bg-black body-font overflow-hidden ">
      <header>
        <div
          className="w-full bg-center bg-cover h-[32rem] rounded-b-lg"
          style={{
            backgroundImage: `url(${"/Header.png"})`,
            width: "150",
            height: "200",
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-30"></div>
        </div>
      </header>

      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-white shadow-2xl px-4 py-6 rounded-3xl ">
              <Image
                src="/1.png"
                alt="Picture of the author"
                width={150}
                height={150}
              ></Image>
              <h2 className="title-font font-medium text-xl text-white">
                Live Guided Tour
              </h2>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-white shadow-2xl px-4 py-6 rounded-3xl">
              <Image
                src="/2.png"
                alt="Picture of the author"
                width={150}
                height={150}
              ></Image>
              <h2 className="title-font font-medium text-xl text-white">
                Virtual Tour App
              </h2>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-white shadow-2xl px-4 py-6 rounded-3xl">
              <Image
                src="/3.png"
                alt="Picture of the author"
                width={150}
                height={150}
              ></Image>
              <h2 className="title-font font-medium text-xl text-white">
                Analytics
              </h2>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-white shadow-2xl px-4 py-6 rounded-3xl">
              <Image
                src="/4.png"
                alt="Picture of the author"
                width={150}
                height={150}
              ></Image>
              <h2 className="title-font font-medium text-xl text-white">
                User Guide
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
