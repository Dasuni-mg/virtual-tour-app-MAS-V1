import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const videos = [
  {
    thumbnail: "/guide/thumbnails/host.png",
    name: "Host Video",
    url: "/guide/videos/host.mp4",
  },
  {
    thumbnail: "/guide/thumbnails/guest.png",
    name: "Guest Video",
    url: "/guide/videos/guest.mp4",
  },
];

const pdfs = [
  {
    thumbnail: "/vt.png",
    name: "Virtual Tour Guide",
    url: "/guide/documents/guide.pdf",
  },

  // Add more videos here...
];

export default function VTGuide() {
  return (
    <section className="text-gray-400 bg-neutral-900 w-full body-font overflow-auto flex-1">
      <div className="flex flex-col">
        <div className="flex-col w-full ...">
          <header>
            <h1 className="text-white justify-center font-extrabold uppercase text-5xl px-20 mt-10">
              Virtual Tour Guide
            </h1>
          </header>

          <div className="flex justify-between items-center mx-20 my-10 text-white">
            <div>
              <h1 className=" text-2xl text-white">Live Guided Tour Vidoes</h1>
            </div>
          </div>
          <div className="container  mx-auto justify-items-center -mt-10">
            <div className="flex flex-wrap  text-center py-6  px-10 justify-start justify-items-center  ">
              {videos.map((video, index) => (
                <Link key={index} href={video.url} passHref>
                  <a
                    className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative border-2 px-3 h-40 border-white hover:border-white cursor-pointer shadow-2xl overflow-hidden py-8 rounded-3xl">
                      <Image
                        src={video.thumbnail}
                        alt={`Thumbnail ${index}`}
                        layout="fill"
                        objectFit="cover"
                      />
                      <FontAwesomeIcon
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black w-10 h-10"
                        icon={faCirclePlay}
                      />
                    </div>
                    <h2 className="title-font m-2  font-medium text-md text-white">
                      {video.name}
                    </h2>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mx-20 my-10 text-white">
            <div>
              <h1 className=" text-2xl text-white">
                Live Guided Tour Documents
              </h1>
            </div>
          </div>
          <div className="container  mx-auto justify-items-center -mt-10">
            <div className="flex flex-wrap  text-center py-6  px-11 justify-start justify-items-center  ">
              {pdfs.map((pdf, index) => (
                <Link key={index} href={pdf.url} passHref>
                  <a
                    className="p-5 md:w-1/4 sm:w-1/2 w-full cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="border-2 px-3 h-40 border-white hover:border-white cursor-pointer shadow-2xl  py-8 rounded-3xl">
                      <Image
                        src={pdf.thumbnail}
                        alt={`Thumbnail ${index}`}
                        width={100}
                        height={100}
                      />
                    </div>
                    <h2 className="title-font m-2 font-medium text-md text-white">
                      {pdf.name}
                    </h2>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
