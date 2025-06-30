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

        <div className=" flex-col w-full ...">
          <header>
            <h1 className="text-white text-3xl px-20 mt-10">
              Hello, Welcome Back!
            </h1>
          </header>

          <div className="relative overflow-x-auto   ">
            <div className="w-500 h-full mx-20 mt-10 mb-10 ">
              <div className="flex flex-col  ">
                <div className="overflow-x-auto shadow-md sm:rounded-lg border-2 border-white">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden ">
                      <table className="min-w-full divide-y divide-gray-200 table-fixed divide-gray-700">
                        <thead className="bg-black ">
                          <tr>
                            <th scope="col" className="p-4">
                              
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-md  font-medium tracking-wider text-left uppercase text-white"
                            >
                              Product Name
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-md  font-medium tracking-wider text-left uppercase text-white"
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-md font-medium tracking-wider text-left uppercase text-white"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-md  font-medium tracking-wider text-left   uppercase text-white"
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
                          <br></br>
                        </thead>
                        <tbody className=" divide-y divide-gray-200 bg-black divide-gray-700">
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
                            <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                              Apple Imac 27
                            </td>
                            <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                              Desktop PC
                            </td>
                            <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                              $1999
                            </td>
                            <td className="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
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
                              Apple MacBook Pro 17
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

              <section className="w-full mt-5 mb-15 py-4">
                <div className="container px-4 mx-auto">
                  <div className="flex flex-wrap -m-3  ">
                    <div className="w-full lg:w-1/2 xl:w-1/4 p-3">
                      <div className="h-full border-2 border-white bg-black rounded-md shadow-dashboard">
                        <div className="p-6 border-b border-coolGray-100">
                          <div className="flex flex-wrap items-center justify-between -m-2 mb-4">
                            <div className="w-auto p-2">
                              <h2 className="text-coolGray-900 text-lg font-semibold">
                                Active now
                              </h2>
                            </div>
                            <div className="w-auto p-2">
                              <svg
                                width="16"
                                height="16"
                                viewbox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 6.66667C7.73629 6.66667 7.47851 6.74487 7.25924 6.89138C7.03998 7.03788 6.86908 7.24612 6.76816 7.48976C6.66724 7.73339 6.64084 8.00148 6.69229 8.26012C6.74373 8.51876 6.87072 8.75634 7.05719 8.94281C7.24366 9.12928 7.48124 9.25627 7.73988 9.30772C7.99852 9.35916 8.26661 9.33276 8.51025 9.23184C8.75388 9.13092 8.96212 8.96003 9.10863 8.74076C9.25514 8.5215 9.33333 8.26371 9.33333 8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66667 8 6.66667ZM3.33333 6.66667C3.06963 6.66667 2.81184 6.74487 2.59257 6.89138C2.37331 7.03788 2.20241 7.24612 2.10149 7.48976C2.00058 7.73339 1.97417 8.00148 2.02562 8.26012C2.07707 8.51876 2.20405 8.75634 2.39052 8.94281C2.57699 9.12928 2.81457 9.25627 3.07321 9.30772C3.33185 9.35916 3.59994 9.33276 3.84358 9.23184C4.08721 9.13092 4.29545 8.96003 4.44196 8.74076C4.58847 8.5215 4.66667 8.26371 4.66667 8C4.66667 7.64638 4.52619 7.30724 4.27614 7.05719C4.02609 6.80714 3.68696 6.66667 3.33333 6.66667ZM12.6667 6.66667C12.403 6.66667 12.1452 6.74487 11.9259 6.89138C11.7066 7.03788 11.5357 7.24612 11.4348 7.48976C11.3339 7.73339 11.3075 8.00148 11.359 8.26012C11.4104 8.51876 11.5374 8.75634 11.7239 8.94281C11.9103 9.12928 12.1479 9.25627 12.4065 9.30772C12.6652 9.35916 12.9333 9.33276 13.1769 9.23184C13.4205 9.13092 13.6288 8.96003 13.7753 8.74076C13.9218 8.5215 14 8.26371 14 8C14 7.64638 13.8595 7.30724 13.6095 7.05719C13.3594 6.80714 13.0203 6.66667 12.6667 6.66667Z"
                                  fill="#D5DAE1"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="chart-graph1-radial-bar"></div>
                        </div>
                        <div className="p-6">
                          <div className="flex flex-wrap items-center -m-2">
                            <div className="w-auto p-2">
                              <p className="font-semibold text-2xl text-coolGray-900">
                                $40,206.20
                              </p>
                            </div>
                            <div className="w-auto p-2">
                              <p className="flex items-center p-1 px-2 text-xs text-green-500 font-medium bg-green-100 rounded-full shadow-sm">
                                <svg
                                  className="mr-0.5"
                                  width="12"
                                  height="12"
                                  viewbox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.855 5.64499L6.355 3.14499C6.30745 3.09947 6.25138 3.06379 6.19 3.03999C6.06827 2.98998 5.93173 2.98998 5.81 3.03999C5.74863 3.06379 5.69255 3.09947 5.645 3.14499L3.145 5.64499C3.09838 5.69161 3.0614 5.74696 3.03617 5.80787C3.01094 5.86878 2.99796 5.93406 2.99796 5.99999C2.99796 6.13315 3.05085 6.26084 3.145 6.35499C3.23915 6.44915 3.36685 6.50204 3.5 6.50204C3.63315 6.50204 3.76085 6.44915 3.855 6.35499L5.5 4.70499V8.49999C5.5 8.6326 5.55268 8.75978 5.64645 8.85355C5.74022 8.94732 5.86739 8.99999 6 8.99999C6.13261 8.99999 6.25979 8.94732 6.35355 8.85355C6.44732 8.75978 6.5 8.6326 6.5 8.49999V4.70499L8.145 6.35499C8.19148 6.40186 8.24678 6.43906 8.30771 6.46444C8.36864 6.48982 8.434 6.50289 8.5 6.50289C8.56601 6.50289 8.63136 6.48982 8.69229 6.46444C8.75322 6.43906 8.80852 6.40186 8.855 6.35499C8.90186 6.30851 8.93906 6.25321 8.96445 6.19228C8.98983 6.13135 9.0029 6.066 9.0029 5.99999C9.0029 5.93399 8.98983 5.86864 8.96445 5.80771C8.93906 5.74678 8.90186 5.69148 8.855 5.64499Z"
                                    fill="#22C55E"
                                  ></path>
                                </svg>
                                <span>23%</span>
                              </p>
                            </div>
                          </div>
                          <p className="font-medium text-xs text-coolGray-500">
                            Current Balance
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-1/2 xl:w-3/4 p-3">
                      <div className="h-full border-2 border-white overflow-hidden bg-black rounded-md shadow-dashboard">
                        <div className="p-6 pb-0">
                          <div className="flex flex-wrap items-center justify-between -m-2">
                            <div className="w-auto p-2">
                              <h2 className="text-coolGray-900 text-lg font-semibold">
                                Visitors Overview
                              </h2>
                              <p className="font-medium text-xs text-coolGray-500">
                                Number of unique visitors
                              </p>
                            </div>
                            <div className="w-auto p-2">
                              <svg
                                width="16"
                                height="16"
                                viewbox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 6.66667C7.73629 6.66667 7.47851 6.74487 7.25924 6.89138C7.03998 7.03788 6.86908 7.24612 6.76816 7.48976C6.66724 7.73339 6.64084 8.00148 6.69229 8.26012C6.74373 8.51876 6.87072 8.75634 7.05719 8.94281C7.24366 9.12928 7.48124 9.25627 7.73988 9.30772C7.99852 9.35916 8.26661 9.33276 8.51025 9.23184C8.75388 9.13092 8.96212 8.96003 9.10863 8.74076C9.25514 8.5215 9.33333 8.26371 9.33333 8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66667 8 6.66667ZM3.33333 6.66667C3.06963 6.66667 2.81184 6.74487 2.59257 6.89138C2.37331 7.03788 2.20241 7.24612 2.10149 7.48976C2.00058 7.73339 1.97417 8.00148 2.02562 8.26012C2.07707 8.51876 2.20405 8.75634 2.39052 8.94281C2.57699 9.12928 2.81457 9.25627 3.07321 9.30772C3.33185 9.35916 3.59994 9.33276 3.84358 9.23184C4.08721 9.13092 4.29545 8.96003 4.44196 8.74076C4.58847 8.5215 4.66667 8.26371 4.66667 8C4.66667 7.64638 4.52619 7.30724 4.27614 7.05719C4.02609 6.80714 3.68696 6.66667 3.33333 6.66667ZM12.6667 6.66667C12.403 6.66667 12.1452 6.74487 11.9259 6.89138C11.7066 7.03788 11.5357 7.24612 11.4348 7.48976C11.3339 7.73339 11.3075 8.00148 11.359 8.26012C11.4104 8.51876 11.5374 8.75634 11.7239 8.94281C11.9103 9.12928 12.1479 9.25627 12.4065 9.30772C12.6652 9.35916 12.9333 9.33276 13.1769 9.23184C13.4205 9.13092 13.6288 8.96003 13.7753 8.74076C13.9218 8.5215 14 8.26371 14 8C14 7.64638 13.8595 7.30724 13.6095 7.05719C13.3594 6.80714 13.0203 6.66667 12.6667 6.66667Z"
                                  fill="#D5DAE1"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="relative top-8 lg:top-20 lg:mt-1">
                          <div className="chart-graph1-area"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
