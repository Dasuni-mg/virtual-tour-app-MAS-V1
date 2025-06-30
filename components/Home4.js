import { Auth } from "aws-amplify";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import NavBar from "./NavBar";
import TourSection from "./TourSection";

export default function Home4(props) {
  const [copyIndex, setCopyIndex] = useState(-1);
  const router = useRouter();

  async function logout() {
    await Auth.signOut();
    router.push("/");
  }

  return (
 
       <section className="text-gray-400 bg-black w-full body-font overflow-hidden ">
      <div className="flex">
        <div className="basis-5/6 flex-col w-800 ">
          <header>
          <h1 className="text-white justify-center font-extrabold uppercase text-5xl px-20 mt-10">
              Upcoming Schedules
            </h1>
          </header>
          {props.schedules.length ? (
            props.schedules.map((schedule, index) => (
              <div
                key={schedule.id}
                className="flex justify-between align-center space-x-3 mx-20  my-10 text-white"
              >
                <div>
                  <h1 className="text-xl">{schedule.title}</h1>
                  <a
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    href={schedule.tour?.url}
                  >
                    {schedule.tour?.url}
                  </a>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `
A user is inviting you to a scheduled meeting.

Topic: ${schedule.title}
When: ${new Date(schedule.date).toLocaleString()}

Join the meeting by following link:
${schedule.tour?.url}
                  `.trim()
                    );
                    setCopyIndex(index);
                  }}
                  className="px-4 py-2 bg-red font-bold border border-white rounded-xl shadow-xl"
                >
                  {copyIndex === index ? "Copied!" : "Copy Invitation"}
                </button>
              </div>
            ))
          ) : (
            <div className="mx-20  my-10 text-white" >
              <h1 className="text-white text-center text-3xl px-10 mt-10 mb-5">
                No Upcoming schedules
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
