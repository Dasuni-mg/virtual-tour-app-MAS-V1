import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
export default function Header() {
  return (
    <section className="text-white bg-black body-font overflow-hidden">
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

        <div className="flex-col  ...">
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
          <div className="item-center justify-center w-800 px-20 mt-10 ">
            <div className="mt-10 sm:mt-0">
              <div className="mb-20 md:mt-20 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden py-10 border-2 border-white rounded-xl">
                    <div className="px-4 py-5 bg-black text-White sm:p-6 ">
                      <div className="flex  drop-shadow-md rounded-lg px-20 mb-5 pb-10">
                        <img
                          className="w-28 h-28 rounded-full border-4 border-slate-50 object-cover"
                          src="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
                        />
                        <header className="px-10 mt-5  text-white">
                          <h1 className=" text-2xl ">Name</h1>
                          <h1 className="text-white text-md ">
                            Fashion Designer
                          </h1>
                        </header>
                      </div>
                      <div className="grid grid-cols-6 gap-6 px-20 text-white">
                        <div className="col-span-6 w-2/3">
                          <label htmlFor="first-name" className=" text-White">
                            Full Name
                          </label>
                          <p className="text-white mt-2 text-sm">
                            Example Name
                          </p>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="text-White">
                            Job Title
                          </label>
                          <p className="text-white mt-2 text-sm">
                            Fashion Designer
                          </p>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className=" text-White">
                            Team
                          </label>
                          <p className="text-white mt-2">Bodyline 02</p>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="eamil" className="text-White">
                            Email
                          </label>
                          <p className="text-white mt-2 text-sm">
                            Example E-mail
                          </p>
                        </div>{" "}
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="tp-no" className="text-White">
                            Telephone No
                          </label>
                          <p className="text-white mt-2 text-sm">
                            Example Telephone No
                          </p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="about" className="text-White">
                            About
                          </label>
                          <p className="text-white mt-2 text-sm">
                            Example About <br></br>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry&apos;s standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It
                            has survived not only five centuries, but also the
                            leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the
                            1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                          </p>
                        </div>
                      </div>
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
