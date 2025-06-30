import { Auth } from "aws-amplify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavBar from "./NavBar";

export default function Home1({ name, admin }) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-prompt"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
                          Welcome to the Virtual Tour of our MAS Facilities!
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-400 mt-3">
                            Welcome to the Virtual Tour of MAS Holdings. We
                            pleased to be walking you through our facility
                            today.
                          </p>
                          <p className="text-sm text-gray-400 mt-3">
                            The information and the content disclosed during
                            this virtual tour is confidential and proprietary to
                            MAS Holdings (Private) Limited. It is strictly
                            forbidden to share any recording or screenshots of
                            this virtual tour with any third party, without
                            prior written consent of MAS Holdings (Private)
                            Limited.
                          </p>
                          <p className="text-sm text-gray-400 mt-3">
                            Upon acceptance of these terms, you will be allowed
                            to enter the tour.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-black focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Accept
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <section className="text-gray-400 bg-neutral-900 body-font overflow-auto flex-1">
        <div className="flex">
          <div className="flex-col w-full ...">
            <nav className="bg-black border-white shadow-2xl border-b-4 rounded-b-lg">
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
                              src="/avatar.png"
                              alt=""
                            />
                          </button>
                        </div>

                        <div className="text-white hover:text-white">
                          <h1>{name}</h1>
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
              <div className="relative aspect-[4000/1512]">
                <Image
                  src="/c3.jpg"
                  alt="Welcome"
                  layout="fill"
                  objectFit="cover"
                />
                {/* <Carousel>
                <div>
                  <img src="/c1.jpg" alt="image1" />
                </div>
                <div>
                  <img src="/c2.jpg" alt="image2" />
                </div>
                <div>
                  <img src="/c3.jpg" alt="image3" />
                </div>
              </Carousel> */}
              </div>
            </header>

            <div className="container  mx-auto justify-items-center -mt-10">
              <div className="flex flex-wrap  text-center py-24 justify-center justify-items-center  ">
                <Link href="/tours">
                  <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
                    <div className="border-2 border-white hover:border-white cursor-pointer shadow-2xl  py-8 rounded-3xl">
                      <Image
                        src="/2.png"
                        alt="Picture of the author"
                        width={100}
                        height={100}
                      ></Image>
                      <h2 className="title-font font-medium text-md text-white">
                        Virtual Tour App
                      </h2>
                    </div>
                  </div>
                </Link>
                {admin && (
                  <Link href="/analytics">
                    <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
                      <div className="border-2 border-white hover:border-white cursor-pointer shadow-2xl  py-8 rounded-3xl">
                        <Image
                          src="/3.png"
                          alt="Picture of the author"
                          width={100}
                          height={100}
                        ></Image>
                        <h2 className="title-font font-medium text-md text-white">
                          Analytics
                        </h2>
                      </div>
                    </div>
                  </Link>
                )}
                <Link href="/guide">
                  <div className="p-4 md:w-1/5 sm:w-1/2 w-full">
                    <div className="border-2 border-white hover:border-white cursor-pointer shadow-2xl  py-8 rounded-3xl">
                      <Image
                        src="/4.png"
                        alt="Picture of the author"
                        width={100}
                        height={100}
                      ></Image>
                      <h2 className="title-font font-medium text-md text-white">
                        User Guide
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
