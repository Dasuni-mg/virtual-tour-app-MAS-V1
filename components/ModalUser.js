import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Fragment } from "react";

const ModalUser = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-90"></div>
      <div className="bg-neutral-900 border border-1 border-white rounded-lg w-10/12 divide-y divide-white relative ">
        <div className="flex flex-col items-start px-7 py-4">
          <div className="flex  items-center w-full">
            <div className="text-white  text-3xl">User Report</div>
            <svg
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              onClick={() => props.callback(false)}
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-rows-4 grid-cols-5 px-7 py-2 grid-flow-col gap-4">
          {props.record ? (
            <Fragment>
              <div className="row-span-1 bg-neutral-900 col-span-1">
                <h1 className="text-xl text-white font-semibold">
                  Users Signed-In
                </h1>
                <p className="text-white text-left font-extrabold uppercase text-5xl mt-3">
                  {props.record.total}
                </p>
              </div>
              <div className="row-span-4 bg-neutral-900 col-span-4">
                <h1 className="text-xl mb-4 text-white font-semibold">
                  Log History
                </h1>
                <div className="overflow-x-auto rounded-2xl shadow-lg shadow-white bg-black">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y table-fixed rounded-2xl shadow-lg shadow-white rounded-2xl divide-gray-700 ">
                        <thead className="bg-black text-white rounded-2xl ">
                          <tr>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xl font-semibold text-left text-white"
                            >
                              User Name
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-6 text-xl font-semibold text-left text-white"
                            >
                              Count
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-black">
                          {props.record.users.map((record, key) => (
                            <tr key={key}>
                              <td className="py-4 px-6 text-l font-medium whitespace-nowrap text-white">
                                {record.username}
                              </td>
                              <td className="py-4 px-6 text-l font-medium whitespace-nowrap text-white">
                                {record.loginCount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="row-span-5 bg-neutral-900 col-span-5 flex items-center justify-center py-40">
              <div className="w-8 h-8 border-2 border-l-white border-t-white border-r-white border-b-black rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
