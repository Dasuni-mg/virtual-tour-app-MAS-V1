import Link from "next/link";
import MapGoogle from "./MapGoogle";

import TourSection from "./TourSection";

export default function Home3(props) {
  return (
    <section className="text-gray-400 bg-neutral body-font overflow-auto flex-1">
      <div className="flex">
        <div className="flex-1 flex-col">
          <div className="flex flex-wrap justify-center mt-10 px-24">
            <div className="relative w-full h-[600px]  transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl border-2 border-white rounded-lg">
              <MapGoogle tours={Object.keys(props.tours).reduce(
                  (acc, key) => acc.concat(props.tours[key]),
                  []
                )}/>
            </div>
          </div>
          <div className="flex flex-wrap justify-center p-12  mt-5 ">
            {/* <button
              type="button"
              className="focus:outline-none text-white bg-red hover:bg-red focus:ring-4 focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Schedule A Tour
            </button> */}
            <Link href="/schedules" passHref>
              <a className="focus:outline-none text-white bg-red hover:bg-red focus:ring-4 focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                Upcoming Tours
              </a>
            </Link>
          </div>
          <header>
            <h1 className="text-white justify-center font-extrabold uppercase text-5xl px-20 mt-10">
              Virtual Tours
            </h1>
          </header>
          {Object.keys(props.tours).map((key) => (
            <TourSection
              key={key}
              section={key}
              tours={props.tours[key].map((value) => ({
                id: value.id,
                image: value.thumbnail,
                name: value.name,
                href: value.url,
              }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
