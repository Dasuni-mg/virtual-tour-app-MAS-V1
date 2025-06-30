/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
export default function Header() {
  return (
    <section className="text-gray-400 bg-black       body-font overflow-hidden">
      <div className="flex">
      <div className="flex flex-col  w-48  py-8  bg-black  border-white shadow-2xl border-r-4 rounded-r-lg">
          <div className="flex flex-col  items-center ">
            <Image
              src="/MAS.png"
              alt="Picture of the author"
              width={120}
              height={70}
              objectFit="contain"
            ></Image>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <a
                className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-200 transform text-white hover:bg-gray-200 hover:bg-gray-700 hover:text-white hover:text-white"
                href="#"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium text-sm">
                  User Management
                </span>
              </a>

              <a
                className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-200 transform text-white hover:bg-gray-200 hover:bg-gray-700 hover:text-white hover:text-white"
                href="#"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium text-sm">
                  Security & Admin
                </span>
              </a>

              <a
                className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-200 transform text-white hover:bg-gray-200 hover:bg-gray-700 hover:text-white hover:text-white"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>

                <span className="mx-4 font-medium">
                  Analytics & Notifications
                </span>
              </a>

              <a
                className=" flex items-center px-4 py-2 mt-5 text-white transition-colors duration-200 transform text-white hover:bg-gray-200 hover:bg-gray-700 hover:text-white hover:text-white"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>

                <span className="mx-4 font-medium text-sm">Core Apps</span>
              </a>
              <div className="grid grid-cols-1 divide-y mt-10">
                <span></span>
                <span></span>
              </div>
              <a
                className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-200 transform text-white hover:bg-gray-200 hover:bg-gray-700 hover:text-white hover:text-white"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>

                <span className="mx-4 font-medium text-sm">Contacts</span>
              </a>

              <button
                className="flex items-center px-4 py-2 mt-5 w-full text-white transition-colors duration-200 transform text-white hover:bg-gray-200 hover:bg-gray-700 hover:text-white hover:text-white"
               
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                <span className="mx-4 font-medium text-sm">Logout</span>
              </button>
            </nav>
          </div>
        </div>

        
        <div className="flex flex-row space-x-10  px-10 py-10">
          <div className="basis-4/6 flex-col w-800 ">
            <div className="shadow overflow-hidden py-5 border-2 border-white rounded-xl ">
              <div className="px-4 py-5 bg-black       text-White sm:p-6 ">
                <div className="flex  drop-shadow-md rounded-lg px-10 mb-5 pb-10">
                  <img
                    className="w-28 h-28 rounded-full border-4 border-slate-50 object-cover"
                    src="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
                  />
                  <header className="px-10 mt-5  text-white">
                    <h1 className=" text-2xl ">Name</h1>
                    <h1 className="text-white text-md ">Fashion Designer</h1>
                  </header>
                </div>
                <div className="grid grid-cols-6 gap-6 px-10 text-white">
                  <div className="col-span-6 w-2/3">
                    <label htmlFor="first-name" className=" text-White">
                      Full Name
                    </label>

                    <div className="grid grid-rows-1 grid-flow-col">
                      <div>
                        <p className="text-white mt-2 text-sm">Example Name </p>
                      </div>

                      <div className="text-white mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 28 28"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="last-name" className="text-White">
                      Job Title
                    </label>

                    <div className="grid grid-rows-1 grid-flow-col">
                      <div>
                        <p className="text-white mt-2 text-sm">Fashion Designer</p>
                      </div>

                      <div className="text-white mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 28 28"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className=" text-White">
                      Team
                    </label>
                    <div className="grid grid-rows-1 grid-flow-col">
                      <div>
                        <p className="text-white mt-2 text-sm">Bodyline 02</p>
                      </div>

                      <div className="text-white mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 28 28"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="eamil" className="text-White">
                      Email
                    </label>
                    <div className="grid grid-rows-1 grid-flow-col">
                      <div>
                        <p className="text-white mt-2 text-sm">Example E-mail</p>
                      </div>

                      <div className="text-white mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 28 28"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="tp-no" className="text-White">
                      Telephone No
                    </label>
                    <div className="grid grid-rows-1 grid-flow-col">
                      <div>
                        <p className="text-white mt-2 text-sm ">Example Telephone No</p>
                      </div>

                      <div className="text-white mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 28 28"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="about" className="text-White text-md">
                      About
                    </label>
                    <div className="grid grid-rows-1 grid-flow-col">
                      <div>
                        <p className="text-white mt-2 text-sm ">
                          {" "}
                          Example About <br></br>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </p>
                      </div>

                      <div className="text-white  mt-44">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 28 28"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-2/6   space-y-10">
            {" "}
            <div className="shadow overflow-hidden py-5 text-White border-2 border-white rounded-xl ">
              <div className=" border-b border-White">
                <div className="flex flex-wrap px-10 mb-5 mt-5 ">
                  <h2 className="text-white text-md font-semibold">
                    Upcoming Meetings
                  </h2>
                </div>
              </div>
              <div className="text-white text-sm px-10 mt-5 text-sm">
                Kreeda Tour
              </div>
              <div className="text-white text-sm px-10 mb-5 text-sm">
                Jun/20/2022 - 04:00 AM{" "}
              </div>
            </div>
            <div className="shadow overflow-hidden py-5 text-White border-2 border-white rounded-xl">
              <div className=" border-b border-White  ">
                <div className="flex flex-wrap px-10 mb-5 mt-5">
                  <h2 className="text-white text-md font-semibold">
                    Notifications
                  </h2>
                </div>
              </div>
              <div className="text-white text-sm px-10 mt-5">
                <div className="w-full p-2 mt-8 bg-black       rounded flex">
                  <div
                    tabIndex="0"
                    aria-label="heart icon"
                    role="img"
                    className="focus:outline-none w-8 h-8 border rounded-full border-White flex items-center justify-center"
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/notification_1-svg2.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="pl-3">
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-sm leading-none"
                    >
                      <span className="text-White">James Doe</span> favourited
                      an <span className="text-White">item</span>
                    </p>
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-xs leading-3 pt-1 text-White"
                    >
                      2 hours ago
                    </p>
                  </div>
                </div>

                <div className="w-full p-2 mt-4 bg-black       rounded flex">
                  <div
                    tabIndex="0"
                    aria-label="loading icon"
                    role="img"
                    className="focus:outline-none w-8 h-8 border rounded-full border-White flex items-center justify-center"
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/notification_1-svg7.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="pl-3">
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-sm leading-none"
                    >
                      Shipmet delayed for order
                      <span className="text-White"> #25551</span>
                    </p>
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-xs leading-3 pt-1 text-White"
                    >
                      2 hours ago
                    </p>
                  </div>
                </div>
                <h2
                  tabIndex="0"
                  className="focus:outline-none text-sm leading-normal pt-5 border-b pb-2 border-White text-White"
                >
                  YESTERDAY
                </h2>

                <div className="w-full p-2 mt-4 bg-black       rounded flex">
                  <div
                    tabIndex="0"
                    aria-label="loading icon"
                    role="img"
                    className="focus:outline-none w-8 h-8 border rounded-full border-White flex items-center justify-center"
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/notification_1-svg9.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="pl-3">
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-sm leading-none"
                    >
                      Shipmet delayed for order
                      <span className="text-White"> #25549</span>
                    </p>
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                    >
                      2 hours ago
                    </p>
                  </div>
                </div>
                <div className="w-full p-2 mt-4 bg-black      rounded flex">
                  <div
                    tabIndex="0"
                    aria-label="loading icon"
                    role="img"
                    className="focus:outline-none w-8 h-8 border rounded-full border-White flex items-center justify-center"
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/notification_1-svg9.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="pl-3">
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-sm leading-none"
                    >
                      Shipmet delayed for order
                      <span className="text-White"> #25527</span>
                    </p>
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                    >
                      2 hours ago
                    </p>
                  </div>
                </div>

                <div className="w-full p-2 mt-5 bg-black      rounded flex items-center">
                  <div
                    tabIndex="0"
                    aria-label="success icon"
                    role="img"
                    className="focus:outline-none w-8 h-8 border rounded-full border-green-200 flex flex-shrink-0 items-center justify-center"
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/notification_1-svg11.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="pl-3 w-full">
                    <div className="flex items-center justify-between">
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-sm leading-none text-green-700"
                      >
                        Design sprint completed
                      </p>
                      <p
                        tabIndex="0"
                        className="focus:outline-none focus:text-indigo-600 text-xs leading-3 underline cursor-pointer text-green-700"
                      >
                        View
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
