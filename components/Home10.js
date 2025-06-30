import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEnvelope,
  faGlobeAfrica,
  faGlobeAsia,
  faLock,
  faLockOpen,
  faPen,
  faTrash,
  faUserAlt,
  faUserLock,
  faUserPen,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { API } from "aws-amplify";
import { deleteUser, toggleUser } from "../graphql/mutations";

export default function Header({ user: userProp }) {
  const [user, updateUser] = useState(userProp);
  const [currentAction, setCurrentAction] = useState(null);
  const router = useRouter();

  return (
    <Fragment>
      <Transition.Root show={!!currentAction} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-prompt"
          onClose={() => setCurrentAction(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#000] bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-3xl font-extrabold uppercase text-white"
                        >
                          <span>
                            {currentAction?.action === "delete"
                              ? "Delete User: "
                              : currentAction?.user.enabled
                              ? "Disable User: "
                              : "Enable User: "}
                          </span>
                          <span>{currentAction?.user.username}</span>
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-400 mt-3">
                            Are you sure you want to{" "}
                            <span>
                              {currentAction?.action === "delete"
                                ? "delete"
                                : currentAction?.user.enabled
                                ? "disable"
                                : "enable"}
                            </span>{" "}
                            user?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-black focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={async () => {
                        if (currentAction.action === "delete") {
                          await API.graphql({
                            query: deleteUser,
                            variables: {
                              id: `${currentAction.user.username}::${currentAction.user.id}`,
                            },
                          });
                          return router.back();
                        }
                        await API.graphql({
                          query: toggleUser,
                          variables: {
                            id: `${currentAction.user.username}::${currentAction.user.id}`,
                            enable: !currentAction.user.enabled,
                          },
                        });
                        updateUser({ ...user, enabled: !user.enabled });
                        setCurrentAction(null);
                      }}
                    >
                      {currentAction?.action === "delete"
                        ? "Delete"
                        : currentAction?.user.enabled
                        ? "Disable"
                        : "Enable"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-neutral-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-black focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setCurrentAction(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex flex-col w-full bg-neutral-900 overflow-auto flex-1">
        <header className="px-20 mt-10 flex flex-row justify-between items-center ">
          <h1 className="text-white  font-extrabold uppercase text-5xl">
            User: <span>{user.username}</span>
          </h1>
          <div className="flex space-x-4">
            <button
              className="p-2 rounded-lg bg-blue-600"
              onClick={(ev) => {
                ev.stopPropagation();
                router.push(`/users/edit/${user.username}`);
              }}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="w-3 h-3 mr-2 align-baseline"
              />
              <span>Edit</span>
            </button>
            <button
              className="p-2 rounded-lg bg-blue-600"
              onClick={(ev) => {
                ev.stopPropagation();
                setCurrentAction({
                  action: "toggle",
                  user,
                });
              }}
            >
              {user.enabled ? (
                <Fragment>
                  <FontAwesomeIcon
                    icon={faLock}
                    className="w-3 h-3 mr-2 align-baseline"
                  />
                  <span>Disable</span>
                </Fragment>
              ) : (
                <Fragment>
                  <FontAwesomeIcon
                    icon={faLockOpen}
                    className="w-3 h-3 mr-2 align-baseline"
                  />
                  <span>Enable</span>
                </Fragment>
              )}
            </button>
            <button
              className="p-2 rounded-lg bg-red"
              onClick={(ev) => {
                ev.stopPropagation();
                setCurrentAction({
                  action: "delete",
                  user,
                });
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="w-3 h-3 mr-2 align-baseline"
              />
              <span>Delete</span>
            </button>
          </div>
        </header>

        <div className="px-20 py-7">
          <div className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-7 w-full">
            <div className="p-7 row-span-3 rounded-lg shadow-white shadow-lg bg-black">
              <div className="flex flex-col justify-between space-y-6">
                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon icon={faUserAlt} className="w-6 h-6 mr-4" />
                  <div>
                    <p className=" text-lg">Full Name</p>
                    <p className=" text-sm">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 mr-4" />
                  <div>
                    <p className=" text-lg">Email</p>
                    <p className=" text-sm">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon
                    icon={faGlobeAsia}
                    className="w-6 h-6 mr-4"
                  />
                  <div>
                    <p className=" text-lg">Country</p>
                    <p className=" text-sm">{user.country}</p>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon icon={faBuilding} className="w-6 h-6 mr-4" />
                  <div>
                    <p className=" text-lg">Company</p>
                    <p className=" text-sm">{`${user.company.name} (${
                      user.company.external ? "External" : "Internal"
                    })`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-7 row-span-3 rounded-lg shadow-white shadow-lg bg-black  ">
              <div>
                <div className=" flex flex-col justify-start">
                  <p className=" text-lg">Allocated Tours</p>
                  <ul className="p-6 list-disc">
                    {user.tours.item.map(({ tour }) => (
                      <li key={tour.id}>{tour.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-7 rounded-lg shadow-white shadow-lg bg-black">
              <div>
                <h1 className="text-xl">Created On</h1>
                <p className="mt-2 text-sm">
                  {DateTime.fromISO(user.createdAt).toFormat(
                    "yyyy/LL/dd hh:mm:ss a"
                  )}
                </p>
              </div>
              <div className="mt-4">
                <h1 className="text-xl">Last Logged On</h1>
                <p className="mt-2 text-sm">
                  {user.signedInAt
                    ? DateTime.fromISO(user.signedInAt).toFormat(
                        "yyyy/LL/dd hh:mm:ss a"
                      )
                    : "Never"}
                </p>
              </div>
            </div>
            <div className="p-7 row-span-2 rounded-lg shadow-white shadow-lg bg-black flex flex-col justify-center">
              <h1 className="text-xl">User History</h1>

              <div className="flex flex-col justify-center">
                <p className="p-2 text-sm">This is a success alert</p>
                <p className="p-2 text-sm flex justify-end">Jan20</p>
                <p className="p-2 text-sm">This is a success alert</p>
                <p className="p-2 text-sm flex justify-end">Jan20</p>
                <p className="p-2 text-sm">This is a success alert</p>
                <p className="p-2 text-sm flex justify-end">Jan20</p>
                <p className="p-2 text-sm">This is a success alert</p>
                <p className="p-2 text-sm flex justify-end">Jan20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
