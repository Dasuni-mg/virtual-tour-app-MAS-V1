import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from "d3";
import { Fragment, useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";
import {
  getLatestRecord,
  getUserReport,
  getTourReport,
  getSingleTourReport,
  getActivityLog,
} from "../graphql/queries";
import { DateTime } from "luxon";
import ModalUser from "./ModalUser";
import ModalTour from "./ModalTour";
import ModalSingleTour from "./ModalSingleTour";

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/donut-chart
function drawDonutChart(
  svgElement,
  data,
  {
    width = 1280, // outer width, in pixels
    height = 400, // outer height, in pixels
  } = {}
) {
  // Compute values.
  const N = d3.map(data, (d) => d.name);
  const V = d3.map(data, (d) => d.value);
  const I = d3.range(N.length).filter((i) => !isNaN(V[i]));

  const innerRadius = Math.min(width / 2, height) / 3;
  const outerRadius = Math.min(width / 2, height) / 2.5;

  // Unique the names.
  const names = new d3.InternSet(N);

  // Construct scales.
  const color = d3.scaleOrdinal(names, [
    "#e41a1c",
    "#377eb8",
    "#4daf4a",
    "#984ea3",
    "#ff7f00",
    "#ffff33",
  ]);

  // Compute labels.
  const formatValue = d3.format(",");
  const name = (i) => N[i];
  const value = (i) => formatValue(V[i]);

  // Construct arcs.
  const arcs = d3
    .pie()
    .padAngle(4 / outerRadius)
    .sort(null)
    .value((i) => V[i])(I);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const svg = d3
    .select(svgElement)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  (svg.select("g:nth-child(1)").node()
    ? svg.select("g:nth-child(1)")
    : svg.append("g")
  )
    .attr("stroke", "none")
    .attr("transform", `translate(${width / 5} ${height / 2})`)
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d) => color(N[d.data]))
    .attr("d", arc)
    .append("title")
    .text((d) => name(d.data));

  const table = (
    svg.select("g:nth-child(2)").node()
      ? svg.select("g:nth-child(2)")
      : svg.append("g")
  )
    .attr("font-family", "Prompt")
    .attr("font-size", 16)
    .attr("font-weight", "normal")
    .attr("fill", "currentColor")
    .attr(
      "transform",
      `translate(${width / 2} ${((7 - N.length) * height) / 12 - 10})`
    );

  table
    .selectAll("circle")
    .data(arcs)
    .join("circle")
    .attr("r", 8)
    .attr("cy", (_, i) => (height / 6) * i + 8)
    .attr("fill", (d) => color(N[d.data]));

  table
    .selectAll(".first")
    .data(arcs)
    .join("text")
    .attr("class", "first")
    .attr("transform", (_, i) => `translate(14 ${(height / 6) * i})`)
    .selectAll("tspan")
    .data((d) => [name(d.data)])
    .join("tspan")
    .attr("alignment-baseline", "hanging")
    .text((d) => d);

  table
    .selectAll(".second")
    .data(arcs)
    .join("text")
    .attr("class", "second")
    .attr("transform", (_, i) => `translate(${width / 2} ${(height / 6) * i})`)
    .selectAll("tspan")
    .data((d) => [value(d.data)])
    .join("tspan")
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "hanging")
    .text((d) => d);
}

export default function Home11() {
  const [dateRange, updateDateRange] = useState(7);

  const [latest, setLatest] = useState(null);
  const updateLatest = async (range) => {
    const latestRes = await API.graphql({
      query: getLatestRecord,
      variables: {
        to: new Date().toISOString().split("T")[0],
        from: new Date(Date.now() - range).toISOString().split("T")[0],
      },
    });
    console.log(latestRes.data.getLatestRecord);
    setLatest(latestRes.data.getLatestRecord);
  };
  useEffect(() => {
    setLatest(null);
    updateLatest(dateRange * 86400000);
  }, [dateRange]);

  const [userReport, setUserReport] = useState(null);
  const [showUserModal, setUserModal] = useState(false);
  const updateUserReport = async (range) => {
    const userReportRes = await API.graphql({
      query: getUserReport,
      variables: {
        to: new Date().toISOString().split("T")[0],
        from: new Date(Date.now() - range).toISOString().split("T")[0],
      },
    });
    setUserReport(userReportRes.data.getUserReport);
  };
  useEffect(() => {
    setUserReport(null);
  }, [dateRange]);
  const openUserModal = () => {
    if (!userReport) updateUserReport(dateRange * 86400000);
    setUserModal(true);
  };

  const [tourReport, setTourReport] = useState(null);
  const [showTourModal, setTourModal] = useState(false);
  const updateTourReport = async (range) => {
    const tourReportRes = await API.graphql({
      query: getTourReport,
      variables: {
        to: new Date().toISOString().split("T")[0],
        from: new Date(Date.now() - range).toISOString().split("T")[0],
      },
    });
    setTourReport(tourReportRes.data.getTourReport);
  };
  useEffect(() => {
    setTourReport(null);
  }, [dateRange]);
  const openTourModal = () => {
    if (!tourReport) updateTourReport(dateRange * 86400000);
    setTourModal(true);
  };

  const [singleTourReport, setSingleTourReport] = useState(null);
  const [showSingleTourModal, setSingleTourModal] = useState(false);
  const updateSingleTourReport = async (range, tourId) => {
    const singleTourReportRes = await API.graphql({
      query: getSingleTourReport,
      variables: {
        to: new Date().toISOString().split("T")[0],
        from: new Date(Date.now() - range).toISOString().split("T")[0],
        tourId,
      },
    });
    setSingleTourReport(singleTourReportRes.data.getSingleTourReport);
  };
  useEffect(() => {
    setSingleTourReport(null);
  }, [dateRange]);
  const openSingleTourModal = (tourId) => {
    if (!singleTourReport) updateSingleTourReport(dateRange * 86400000, tourId);
    setSingleTourModal(true);
  };

  const graphRefUser = useCallback(
    (node) => {
      if (node && latest)
        drawDonutChart(
          node,
          latest.rankedSignIn.map(({ name, count }) => ({
            name,
            value: count,
          })),
          {
            width: node.clientWidth,
            height: 240,
          }
        );
    },
    [latest]
  );

  const graphRefTour = useCallback(
    (node) => {
      if (node && latest) {
        drawDonutChart(
          node,
          latest.rankedTourAccess.map(({ name, count }) => ({
            name,
            value: count,
          })),
          {
            width: node.clientWidth,
            height: 240,
          }
        );
      }
    },
    [latest]
  );

  // Hooks related to pagination goes here.
  // Current age data stored here.
  const [log, setLog] = useState(null);
  // Pagination tokens stored here.
  const [tokens, setTokens] = useState([]);
  // A custom function to load page data when the selected page changed.
  // This also updates the token list, when a new token is found.
  const updateLog = async (nextToken) => {
    const logResponse = await API.graphql({
      query: getActivityLog,
      variables: {
        nextToken,
      },
    });
    setLog(
      logResponse.data.getActivityLog.item.map((item) =>
        item.extra ? { ...item, extra: JSON.parse(item.extra) } : item
      )
    );
    if (!tokens[tokenIndex + 1] && logResponse.data.getActivityLog.nextToken)
      setTokens(tokens.concat([logResponse.data.getActivityLog.nextToken]));
  };

  // Token index to track selected page.
  const [tokenIndex, setTokenIndex] = useState(-1);
  // Custom functions to navigate between tokens by updating the token index.
  const prevTokenIndex = () => {
    setTokenIndex(tokenIndex - 1);
  };
  const nextTokenIndex = () => {
    setTokenIndex(tokenIndex + 1);
  };
  const goToTokenIndex = (index) => {
    setTokenIndex(index);
  };

  // This hook listens to token index changes and triggers the load function.
  useEffect(() => {
    setLog(null);
    updateLog(tokens[tokenIndex] || null);
  }, [tokenIndex]);

  return (
    <section className="text-gray-400 bg-neutral-900 w-full body-font overflow-auto flex-1">
      <div className="flex flex-col">
        <div className="flex-col w-full ...">
          <header>
            <h1 className="text-white justify-center font-extrabold uppercase text-5xl px-20 mt-10">
              Analytics & Notifications
            </h1>
          </header>

          <div className="flex justify-between items-center mx-20 my-10 text-white">
            <div>
              <h1 className=" text-2xl text-white">Summary</h1>
            </div>
            <div>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-black border-2 rounded-xl text-white py-3 px-4 leading-tight focus:outline-none focus:bg-black focus:border-shadow"
                  id="grid-state"
                  value={dateRange}
                  onChange={(e) => {
                    updateDateRange(e.target.value);
                  }}
                >
                  <option value={1}>Yesterday</option>
                  <option value={7}>Last 7 days</option>
                  <option value={30}>Last 30 days</option>
                  <option value={60}>Last 60 days</option>
                  <option value={90}>Last 90 days</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg
                    className="fill-current h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {latest ? (
            <div className="mx-20 my-10 grid grid-cols-2 gap-16">
              <div className="p-5 col-span-2 rounded-2xl shadow-lg shadow-white bg-black">
                <div className="flex divide-x text-white">
                  <div className="p-4 flex-1">
                    <button
                      className="w-full text-left"
                      onClick={() => openUserModal()}
                    >
                      <p>Users signed in</p>
                      <p className="text-white text-left font-extrabold uppercase text-5xl mt-3">
                        {latest.totalSignIn}
                      </p>
                    </button>
                    <div className="">
                      {showUserModal && (
                        <ModalUser
                          callback={setUserModal}
                          record={userReport}
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    {latest.mostTourAccess ? (
                      <Fragment>
                        <button
                          className="w-full text-left"
                          onClick={() =>
                            openSingleTourModal(latest.mostTourAccess.id)
                          }
                        >
                          <p>Most viewed tour</p>
                          <p className="text-white text-left font-extrabold uppercase text-xl mt-3">
                            {latest.mostTourAccess.name}
                          </p>
                          <p className="text-white text-left">
                            {latest.mostTourAccess.count} view(s)
                          </p>
                        </button>
                        <div className="">
                          {showSingleTourModal && (
                            <ModalSingleTour
                              callback={setSingleTourModal}
                              name={latest.mostTourAccess.name}
                              record={singleTourReport}
                            />
                          )}
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <p>Most viewed tour</p>
                        <p className="text-white text-left font-extrabold uppercase text-xl mt-3">
                          {latest.mostTourAccess.name}
                        </p>
                        <p className="text-white text-left">
                          {latest.mostTourAccess.count} view(s)
                        </p>
                        <p className="text-white text-left font-extrabold uppercase text-5xl mt-3">
                          N/A
                        </p>
                      </Fragment>
                    )}
                  </div>
                  <div className="p-4 flex-1">
                    <button
                      className="w-full text-left"
                      onClick={() => openTourModal()}
                    >
                      <p>Tours visited</p>
                      <p className="text-white text-left font-extrabold uppercase text-5xl mt-3">
                        {latest.totalTourAccess}
                      </p>
                    </button>
                    <div className="">
                      {showTourModal && (
                        <ModalTour
                          callback={setTourModal}
                          record={tourReport}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl shadow-lg shadow-white bg-black">
                <h1 className="text-xl text-white">Top 5 users</h1>
                <div className="p-5">
                  <svg className="text-white w-full" ref={graphRefUser}></svg>
                </div>
              </div>
              <div className="p-5 rounded-2xl shadow-lg shadow-white bg-black">
                <h1 className="text-xl text-white">Top 5 tours</h1>
                <div className="p-5">
                  <svg className="text-white w-full" ref={graphRefTour}></svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-center">
              <div className="w-8 h-8 border-2 border-l-white border-t-white border-r-white border-b-black rounded-full animate-spin"></div>
            </div>
          )}
          <div className="mx-20 my-10 col-span-2">
            <div className="pb-6 flex justify-between items-center">
              <h1 className="text-2xl text-white">Activity Log</h1>
              <div className="inline-flex bg-black p-3 rounded-xl">
                <ul className="flex items-center -mx-[6px]">
                  <li className="px-[6px]">
                    <button
                      disabled={!tokens[tokenIndex]}
                      onClick={() => {
                        goToTokenIndex(-1);
                      }}
                      className="w-9 h-9 flex items-center justify-center rounded-md border-2 border-red text-white text-base hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faAnglesLeft} />
                    </button>
                  </li>
                  <li className="px-[6px]">
                    <button
                      disabled={!tokens[tokenIndex]}
                      onClick={() => {
                        prevTokenIndex();
                      }}
                      className="w-9 h-9 flex items-center justify-center rounded-md border-2 border-red text-white text-base hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                  </li>
                  {[...Array(tokens.length + 1).keys()]
                    .filter((key) => Math.abs(tokenIndex + 1 - key) <= 3)
                    .map((key) => (
                      <li key={key} className="px-[6px]">
                        <button
                          disabled={Math.abs(tokenIndex + 1 - key) === 3}
                          onClick={() => {
                            goToTokenIndex(key - 1);
                          }}
                          className={`w-9 h-9 flex items-center justify-center rounded-md border-2 border-red text-white text-base hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50 ${
                            tokenIndex + 1 === key ? "bg-red" : ""
                          }`}
                        >
                          {Math.abs(tokenIndex + 1 - key) < 3 ? (
                            key + 1
                          ) : (
                            <span>&#8230;</span>
                          )}
                        </button>
                      </li>
                    ))}
                  <li className="px-[6px]">
                    <button
                      disabled={!tokens[tokenIndex + 1]}
                      onClick={() => {
                        nextTokenIndex();
                      }}
                      className="w-9 h-9 flex items-center justify-center rounded-md border-2 border-red text-white text-base hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </li>
                  <li className="px-[6px]">
                    <button
                      disabled={!tokens[tokenIndex + 1]}
                      onClick={() => {
                        goToTokenIndex(tokens.length - 1);
                      }}
                      className="w-9 h-9 flex items-center justify-center rounded-md border-2 border-red text-white text-base hover:bg-primary hover:border-primary hover:text-white disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faAnglesRight} />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-lg shadow-white bg-black">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  {log ? (
                    <table className="min-w-full divide-y table-fixed divide-gray-500">
                      <thead className="bg-black">
                        <tr>
                          <th
                            scope="col"
                            className="p-6 text-md  font-medium tracking-wider text-left uppercase text-white w-[350px]"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="p-6 text-md  font-medium tracking-wider text-left uppercase text-white"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-black">
                        {log.map((item, key) => (
                          <tr
                            key={key}
                            className="hover:bg-gray-700 cursor-pointer "
                          >
                            <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                              {DateTime.fromISO(item.recordedAt).toFormat(
                                "yyyy/LL/dd hh:mm:ss a"
                              )}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                              <span className="block text-white">
                                {item.userName}
                              </span>
                              <span className="block text-slate-300 text-sm">
                                {item.recordType === "tour_access" ? (
                                  <Fragment>
                                    Accessed
                                    <span className="font-semibold ml-1">
                                      {item.extra.tourPath}
                                    </span>
                                  </Fragment>
                                ) : (
                                  "Logged into the system"
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex w-full py-20 justify-center">
                      <div className="w-8 h-8 border-2 border-l-white border-t-white border-r-white border-b-black rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
