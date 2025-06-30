import Image from "next/image";
import Link from "next/link";

export default function TourSection(props) {
  return (
    <>
      <header>
        <h1 className="text-white text-3xl px-20 mt-10 font-extrabold uppercase">
          {props.section}
        </h1>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 px-20 mt-12 mb-5 items-center w-max">
        {props.tours.map((tour) => (
          <div key={tour.id} className="flex flex-col items-center mb-2">
            <div className="relative aspect-[4/3] w-80 max-w-xs rounded-lg shadow-lg border-2 border-gray-400 overflow-hidden">
              <Image
                src={tour.image}
                alt="product"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 flex space-y-2 bg-[#000000]/50 text-white flex-col justify-center items-center transition-opacity opacity-0 hover:opacity-100">
                <a
                  key={tour.name}
                  target="_blank"
                  href={tour.href}
                  rel="noreferrer"
                  className="focus:outline-none text-white bg-red hover:bg-red focus:ring-4 focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  <svg
                    className="w-5 h-5 inline mr-1 align-top"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                  </svg>
                  <span>Visit</span>
                </a>
                <Link
                  href={`/tours/schedule/${encodeURIComponent(tour.id)}`}
                  passHref
                >
                  <a className="focus:outline-none text-white bg-red hover:bg-red focus:ring-4 focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                    <svg
                      className="w-5 h-5 inline mr-1 align-top"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    <span>Schedule</span>
                  </a>
                </Link>
              </div>
            </div>
            <div className="px-2 py-4 inline-block max-w-[230px] text-center">
              <h4 className="mb-3 text-lg font-semibold tracking-tight text-White text-center group-hover:underline">
                {tour.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
