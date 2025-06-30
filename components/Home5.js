import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
export default function Header() {
  return (
    <section className="text-gray-400 bg-black body-font overflow-hidden">
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
                className="flex items-center px-4 py-2 mt-5  text-white transition-colors duration-200 transform text-white hover:bg-gray-200 hover:bg-gray-700 hover:text-white hover:text-white"
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

                <span className="mx-4 font-extralight text-sm ">
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

        <div className="basis-5/6 flex-col w-800 ...">
          <div className="item-center justify-center w-800 px-20 ">
            <div className="sm:mt-0">
              <div className="mb-20 md:mt-10 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden py-5 border-2 border-white rounded-xl">
                    <div className="px-4 py-5 bg-black text-white sm:p-6 ">
                      <div className="flex  drop-shadow-md rounded-lg px-20 pb-5">
                        <img
                          className="w-28 h-28 rounded-full border-4 border-slate-50 object-cover"
                          src="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
                        />
                      </div>
                      <div className="grid grid-cols-6 gap-6 px-20 ">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className=" text-white">
                            First name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 bg-black focus:ring-White border-2 focus:border-White block w-full h-10 shadow-sm sm:text-sm border-white rounded-md"
                          ></input>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="text-white">
                            Last name
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 bg-black focus:ring-White border-2 focus:border-White block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></input>{" "}
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="full-name" className="text-white">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="full-name"
                            id="full-name"
                            autoComplete="full-name"
                            className="mt-1 bg-black focus:ring-White border-2 focus:border-White block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></input>{" "}
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="email-address" className="text-white">
                            Email address
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 bg-black focus:ring-White border-2 focus:border-White block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></input>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="job-title" className="text-white">
                            Job Title
                          </label>
                          <select
                            id="job-title"
                            name="job-title"
                            autoComplete="job-title"
                            className="mt-1 block w-full py-2 px-3 border border-White  rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white bg-black sm:text-sm"
                          >
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                          </select>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="street-address"
                            className="text-white"
                          >
                            Street address
                          </label>
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="mt-1 bg-black focus:ring-White border-2 focus:border-White block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></input>{" "}
                        </div>
                        <div className="mt-3 mb-5">
                          <h3 className="mb-4 font-semibold text-white text-white">
                            Category
                          </h3>
                          <ul className=" items-center w-full text-sm font-medium text-white  sm:flex  text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r border-gray-600">
                              <div className="flex items-center pl-3">
                                <input
                                  id="vue-checkbox-list"
                                  type="checkbox"
                                  value=""
                                  className="w-20 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                ></input>{" "}
                                <label
                                  htmlFor="vue-checkbox-list"
                                  className="py-3  ml-2 w-full text-sm font-medium text-gray-900 text-gray-300"
                                >
                                  Bodyline 01
                                </label>
                              </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r border-gray-600">
                              <div className="flex items-center pl-3">
                                <input
                                  id="react-checkbox-list"
                                  type="checkbox"
                                  value=""
                                  className="w-20 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                ></input>{" "}
                                <label
                                  htmlFor="react-checkbox-list"
                                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 text-gray-300"
                                >
                                  Bodyline 02
                                </label>
                              </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r border-gray-600">
                              <div className="flex items-center pl-3">
                                <input
                                  id="react-checkbox-list"
                                  type="checkbox"
                                  value=""
                                  className="w-20 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                ></input>{" "}
                                <label
                                  htmlFor="react-checkbox-list"
                                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 text-gray-300"
                                >
                                  Bodyline 03
                                </label>
                              </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r border-gray-600">
                              <div className="flex items-center pl-3">
                                <input
                                  id="angular-checkbox-list"
                                  type="checkbox"
                                  value=""
                                  className="w-20 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                ></input>{" "}
                                <label
                                  htmlFor="angular-checkbox-list"
                                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 text-gray-300"
                                >
                                  Slimline 01
                                </label>
                              </div>
                            </li>

                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r border-gray-600">
                              <div className="flex items-center pl-3">
                                <input
                                  id="angular-checkbox-list"
                                  type="checkbox"
                                  value=""
                                  className="w-20 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                ></input>{" "}
                                <label
                                  htmlFor="angular-checkbox-list"
                                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 text-gray-300"
                                >
                                  Slimline 02
                                </label>
                              </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r border-gray-600">
                              <div className="flex items-center pl-3">
                                <input
                                  id="angular-checkbox-list"
                                  type="checkbox"
                                  value=""
                                  className="w-20 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                ></input>{" "}
                                <label
                                  htmlFor="angular-checkbox-list"
                                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 text-gray-300"
                                >
                                  Slimline 03
                                </label>
                              </div>
                            </li>
                            <li className="w-full border-gray-600">
                              <div className="flex items-center pl-3">
                                <input
                                  id="laravel-checkbox-list"
                                  type="checkbox"
                                  value=""
                                  className="w-20 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                ></input>{" "}
                                <label
                                  htmlFor="laravel-checkbox-list"
                                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 text-gray-300"
                                >
                                  Kreeda
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center mt-5 ">
                      <button
                        type="button"
                        className=" focus:outline-none text-white bg-red hover:bg-red focus:ring-4 focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red hover:bg-red focus:ring-red"
                      >
                        Schedule A Meeting
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
