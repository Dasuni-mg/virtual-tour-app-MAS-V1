import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
export default function Header() {
  return (
    <section className="text-gray-400 bg-black           body-font overflow-hidden">
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

              <button className="flex items-center px-4 py-2 mt-5 w-full text-white transition-colors duration-200 transform text-white hover:bg-gray-200 hover:bg-gray-700 hover:text-white hover:text-white">
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

        <div className="w-full flex-col ">
          <nav className="bg-Black border-b bg-Black  border-white shadow-2xl border-b-4 rounded-b-lg">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"></div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="relative mr-7 ">
                    <div className="grid grid-rows-1 grid-flow-col gap-4">
                      <div>
                        <button
                          type="button"
                          className="flex rounded-full bg-Black text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-White"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </button>
                      </div>

                      <div className="text-white hover:text-white">
                        <h1>Demo User</h1>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mr-7 rounded-full bg-Black p-1 text-White hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <header>
            <div
              className="w-full bg-center bg-cover h-[18rem] rounded-b-lg"
              style={{
                backgroundImage: `url(${"/Header.png"})`,
                width: "150",
                height: "200",
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-black           bg-opacity-30"></div>
            </div>
          </header>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="w-500 h-full mx-20  mb-10">
              <div className="p-4 -ml-5 mt-5">
                <label htmlFor="table-search" className="sr-only ">
                  Search
                </label>
                <div className="relative mt-5 mb-10">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5  text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search For Items"
                  ></input>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="overflow-x-auto shadow-md sm:rounded-lg border-2 border-white">
                  <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden ">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed divide-gray-700">
                          <thead className="bg-black  ">
                            <tr>
                              <th scope="col" className="p-4"></th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-md font-medium tracking-wider text-left  uppercase text-white"
                              >
                                Product Name
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-md font-medium tracking-wider text-left  uppercase text-white"
                              >
                                Category
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-md font-medium tracking-wider text-left  uppercase text-white"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="py-3 px-6 text-md font-medium tracking-wider text-left  uppercase text-white"
                              >
                                Price
                              </th>
                              <th scope="col" className="p-4">
                                <span className="sr-only">Edit</span>
                              </th>
                              <th scope="col" className="p-4">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <br></br>
                          <tbody className=" divide-y divide-gray-200 bg-black          divide-gray-700">
                            <tr className=" hover:bg-gray-700">
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-1"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                  ></input>{" "}
                                  <label
                                    htmlFor="checkbox-table-1"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                Apple Imac 27&quot;
                              </td>
                              <td className="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                Desktop PC
                              </td>
                              <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                                $1999
                              </td>
                              <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                                $1999
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-blue-500 hover:underline"
                                >
                                  Edit
                                </a>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-red hover:underline"
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                            <tr className=" hover:bg-gray-700">
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-2"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                  ></input>{" "}
                                  <label
                                    htmlFor="checkbox-table-2"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                Apple MacBook Pro 17&quot;
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-white">
                                Laptop
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                $2999
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                $599
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-blue-500 hover:underline"
                                >
                                  Edit
                                </a>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-red hover:underline"
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                            <tr className=" hover:bg-gray-700">
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-3"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                  ></input>{" "}
                                  <label
                                    htmlFor="checkbox-table-3"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                iPhone 13 Pro
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-white">
                                Phone
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                $999
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                $599
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-blue-500 hover:underline"
                                >
                                  Edit
                                </a>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-red hover:underline"
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                            <tr className=" hover:bg-gray-700">
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-4"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                  ></input>{" "}
                                  <label
                                    htmlFor="checkbox-table-4"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                Apple Magic Mouse 2
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-white">
                                Accessories
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                $99
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                $599
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-blue-500 hover:underline"
                                >
                                  Edit
                                </a>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-red hover:underline"
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                            <tr className=" hover:bg-gray-700">
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-5"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                  ></input>{" "}
                                  <label
                                    htmlFor="checkbox-table-5"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                Apple Watch Series 7
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-white">
                                Accessories
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                $599
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap text-white">
                                $599
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-blue-500 hover:underline"
                                >
                                  Edit
                                </a>
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  className="text-blue-600 text-red hover:underline"
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className=" mt-10 mb-5 text-white bg-red hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-red hover:bg-red focus:ring-blue-800"
              >
                AddUser
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
