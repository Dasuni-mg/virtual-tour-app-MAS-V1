import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
export default function Header() {
  return (
    <section className="text-gray-400 bg-black body-font overflow-hidden">
      <div className="flex">
        <div className="flex flex-col  w-64  py-8  border-r bg-black  border-white shadow-2xl border-r-4 rounded-r-lg">
          <div className="flex flex-col items-center ">
            <Image
              src="/MAS.svg"
              alt="Picture of the author"
              width={100}
              height={100}
            ></Image>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <a
                className="flex items-center px-4 py-2 mt-5 text-White transition-colors duration-200 transform text-White hover:bg-gray-200 hover:bg-gray-700 hover:text-White hover:text-White"
                href="#"
              >
                <svg
                  className="w-5 h-5"
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

                <span className="mx-4 font-medium">User Management</span>
              </a>

              <a
                className="flex items-center px-4 py-2 mt-5 text-White transition-colors duration-200 transform text-White hover:bg-gray-200 hover:bg-gray-700 hover:text-White hover:text-White"
                href="#"
              >
                <svg
                  className="w-5 h-5"
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

                <span className="mx-4 font-medium">Security And Admin</span>
              </a>

              <a
                className="flex items-center px-4 py-2 mt-5 text-White transition-colors duration-200 transform text-White hover:bg-gray-200 hover:bg-gray-700 hover:text-White hover:text-White"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium">
                  Analytics And Notifications
                </span>
              </a>

              <a
                className=" flex items-center px-4 py-2 mt-5 text-White transition-colors duration-200 transform text-White hover:bg-gray-200 hover:bg-gray-700 hover:text-White hover:text-White"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium ">Core Apps</span>
              </a>
              <div className="grid grid-cols-1 divide-y mt-10">
                <span></span>
                <span></span>
              </div>
              <a
                className="flex items-center px-4 py-2 mt-5 text-White transition-colors duration-200 transform text-White hover:bg-gray-200 hover:bg-gray-700 hover:text-White hover:text-White"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium">Contacts</span>
              </a>

              <a
                className="flex items-center px-4 py-2 mt-5 text-White transition-colors duration-200 transform text-White hover:bg-gray-200 hover:bg-gray-700 hover:text-White hover:text-White"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mx-4 font-medium">Logout</span>
              </a>
            </nav>
          </div>
        </div>

        <div className="basis-5/6 flex-col w-800 ...">
          <div className="item-center justify-center w-800 px-20 mt-10 ">
            <div className="mt-10 sm:mt-0">
              <div className="mb-20 md:mt-20 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden py-10 border-2 border-white rounded-xl">
                    <header>
                      <h1 className="mb-5 text-white  justify-center text-center text-5xl px-20 ">
                        Create Guest Code
                      </h1>
                    </header>
                    <div className="px-4 py-5 bg-black text-White sm:p-6 ">
                      <div className="grid grid-cols-6 gap-6 px-20 ">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="tel-no" className=" text-White">
                            Telephone No
                          </label>
                          <input
                            type="int"
                            name="tel-no"
                            id="tel-no"
                            autoComplete="given-name"
                            className="mt-1 bg-black focus:ring-White border-2 focus:border-White block w-full h-10 shadow-sm sm:text-sm border-white rounded-md"
                          ></input>
                        </div>

                        <div className="col-span-6 ">
                          <label htmlFor="email-address" className="text-White">
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

                        <div className="mt-3 mb-5">
                          <h3 className="mb-4 font-semibold text-White text-white">
                            Category
                          </h3>
                          <ul className=" items-center w-full text-sm font-medium text-White  sm:flex  text-white">
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
                        Create Guest Code
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
