import { API, Auth } from "aws-amplify";
import Image from "next/image";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { createMeeting } from "../graphql/mutations";
import FormContainer from "./FormContainer";
import NavBar from "./NavBar";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import { getAllUsers } from "../graphql/queries";

const Menu = (props) => {
  return props.selectProps.inputValue && <components.Menu {...props} />;
};

export default function Home6(props) {
  const [clipboardData, setClipboardData] = useState(false);
  const [invitationCopied, setInvitationCopied] = useState(false);
  const timeoutRef = useRef(null);
  const router = useRouter();

  const loadUsers = (input) => {
    return new Promise((resolve) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        const response = await API.graphql({
          query: getAllUsers,
          variables: {
            limit: 3,
            emails: [input],
          },
        });
        resolve(
          response.data.getAllUsers.item
            .filter(({ email }) => email !== props.email)
            .map(({ email }) => ({
              value: email,
              label: email,
            }))
        );
      }, 750);
    });
  };

  async function submitSchedule(formData) {
    const response = await API.graphql({
      query: createMeeting,
      variables: {
        title: formData.topic,
        date: new Date(formData.when).toISOString(),
        tourId: props.tour,
        participants: formData.participants,
      },
    });
    setClipboardData({
      title: response.data.createMeeting.title,
      date: response.data.createMeeting.date,
      url: response.data.createMeeting.tour.url,
    });
  }

  return (
    <section className="text-gray-400 bg-black w-full body-font overflow-hidden ">
      <div className="flex">
        <div className="basis-6/6 flex-col w-full ...">
          <header>
            <h1 className="text-white justify-center font-extrabold uppercase text-5xl px-20 mt-10">
              Create Schedule
            </h1>
          </header>
          <div className="item-center justify-center w-full px-20 mt-10 ">
            <div className="mt-10 sm:mt-0">
              <div className="mb-20 md:mt-20 md:col-span-3">
                <FormContainer onSubmit={submitSchedule}>
                  <div className="shadow overflow-hidden py-10 border-2 border-white rounded-xl">
                    <div className="px-4 py-5 bg-black text-white sm:p-6 ">
                      <div className="grid grid-cols-6 gap-6 px-20 ">
                        <div className="col-span-6">
                          <label htmlFor="topic" className="text-white">
                            Topic
                          </label>
                          <input
                            type="text"
                            name="topic"
                            id="topic"
                            className="mt-1 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></input>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="when" className="text-white">
                            When?
                          </label>
                          <input
                            style={{ colorScheme: "dark" }}
                            type="datetime-local"
                            id="when"
                            name="when"
                            className="mt-1 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></input>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="invited_users" className="text-white">
                            Participants
                          </label>

                          <AsyncSelect
                            name="participants"
                            loadOptions={loadUsers}
                            components={{ Menu }}
                            className="text-black"
                            placeholder="Select Users..."
                            isMulti
                            isSearchable
                          />
                        </div>

                        {/* <div className="col-span-6">
                          <label
                            htmlFor="street-address"
                            className="text-white"
                          >
                            Add Participants
                          </label>
                          <input
                            type="text"
                            name="add-participant s"
                            id="add-participant"
                            autoComplete="add-participant"
                            className="mt-1 bg-black focus:ring-White border-2 focus:border-White block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></input>{" "}
                        </div> */}

                        {/* <div className="col-span-6 ">
                          <label
                            htmlFor="job-title"
                            className="text-white"
                          ></label>
                          <select
                            id="job-title"
                            name="job-title"
                            autoComplete="job-title"
                            className="mt-1 block w-full py-2 px-3 border border-White  rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white bg-black sm:text-sm"
                          >
                            <option>Does Not Repeat</option>
                            <option>Repeat</option>
                            <option>Full Day</option>
                          </select>
                        </div> */}

                        {/* <div className="col-span-6">
                          <label htmlFor="description" className="text-white">
                            Description
                          </label>
                          <textarea
                            type="text"
                            name="description"
                            id="description"
                            autoComplete="description"
                            className="mt-1 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full h-24 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></textarea>
                        </div> */}
                      </div>
                    </div>
                    {clipboardData ? (
                      <div className="px-20">
                        <div className="flex justify-between items-center p-4 mt-5 bg-neutral-700 w-full">
                          <span className="text-white">
                            Schedule created suceessfully.
                          </span>
                          <div className="flex space-x-2 text-white">
                            <Link href="/schedules" passHref>
                              <a className="px-4 py-2 bg-red font-bold border border-white rounded-xl shadow-xl">
                                Go to Schedules
                              </a>
                            </Link>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `
A user is inviting you to a scheduled meeting.

Topic: ${clipboardData.title}
When: ${new Date(clipboardData.date).toLocaleString()}

Join the meeting by following link:
${clipboardData.url}
                                                  `.trim()
                                );
                                setInvitationCopied(true);
                              }}
                              className="px-4 py-2 bg-red font-bold border border-white rounded-xl shadow-xl"
                            >
                              {invitationCopied ? "Copied!" : "Copy Invitation"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap justify-center mt-5 ">
                        <button
                          type="submit"
                          className=" focus:outline-none text-white bg-red hover:bg-red focus:ring-4 focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        >
                          Schedule A Meeting
                        </button>
                      </div>
                    )}
                  </div>
                </FormContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
