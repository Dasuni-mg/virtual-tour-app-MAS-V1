import { Auth } from "aws-amplify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar({ admin }) {
  const router = useRouter();

  async function logout() {
    await Auth.signOut();
    router.push("/login");
  }

  return (
    <div className="hidden md:flex flex-col w-48 py-8 bg-black border-white shadow-2xl border-r-2 rounded-r-lg">
      <Link href="/" passHref>
        <a className="mx-auto">
          <Image
            src="/MAS.png"
            alt="Picture of the author"
            width={120}
            height={70}
            objectFit="contain"
          />
        </a>
      </Link>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {admin && (
            <Link href="/users" passHref>
              <a className="flex items-center px-4 py-2 mt-5 transition-colors duration-200 transform text-white hover:bg-gray-700 ">
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
            </Link>
          )}

          {admin && (
            <Link href="/analytics" passHref>
              <a className="flex items-center px-4 py-2 mt-5 transition-colors duration-200 transform text-white hover:bg-gray-700">
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

                <span className="mx-4 font-medium text-sm">
                  Analytics &amp; Notifications
                </span>
              </a>
            </Link>
          )}

          <Link href="/" passHref>
            <a
              className=" flex items-center px-4 py-2 mt-5 text-white transition-colors duration-200 transform hover:bg-gray-700 hover:text-white"
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
          </Link>

          <div className="grid grid-cols-1 border-t-2 mt-10" />

          <a
            className="flex items-center px-4 py-2 mt-5 transition-colors duration-200 transform text-white hover:bg-gray-700 hover:text-white"
            href="https://www.masholdings.com/"
            target="_blank"
            rel="noreferrer"
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

            <span className="mx-4 font-medium text-sm">MAS Website</span>
          </a>
          <Link href="/support" passHref>
            <a className="flex items-center px-4 py-2 mt-5 transition-colors duration-200 transform text-white hover:bg-gray-700 hover:text-white">
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

              <span className="mx-4 font-medium text-sm">System Support</span>
            </a>
          </Link>

          <button
            className="flex items-center px-4 py-2 mt-5 w-full text-white transition-colors duration-200 transform hover:bg-gray-700 hover:text-white"
            onClick={logout}
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
  );
}
