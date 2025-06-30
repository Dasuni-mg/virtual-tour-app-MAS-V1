import {
  faLock,
  faLockOpen,
  faPen,
  faTrash,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faUserPlus,
  faChevronDown,
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { API } from "aws-amplify";
import { deleteUser, toggleUser } from "../graphql/mutations";
import { getAllUsers } from "../graphql/queries";
import FormContainer from "./FormContainer";

const filters = [
  {
    id: "names",
    label: "Name",
  },
  {
    id: "countries",
    label: "Country",
  },
  {
    id: "companies",
    label: "Company",
  },
  {
    id: "latest",
    label: "Last Active",
  },
  {
    id: "enabled",
    label: "Status",
  },
];

export default function Header({ groups }) {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const appliedFiltersView = useMemo(() => {
    return Object.keys(appliedFilters).reduce((arr, key) => {
      const label = filters.find((filter) => filter.id === key).label;
      switch (key) {
        case "names":
        case "countries":
        case "companies": {
          return [
            ...arr,
            ...appliedFilters[key].map((value) => ({ key, value, label })),
          ];
        }
        case "latest": {
          return [
            ...arr,
            {
              key,
              value: `${appliedFilters[key].from} \u2194 ${appliedFilters[key].to}`,
              label,
            },
          ];
        }
        case "enabled": {
          return [
            ...arr,
            {
              key,
              value: appliedFilters[key] ? "Enabled" : "Disabled",
            },
          ];
        }
        default: {
          return arr;
        }
      }
    }, []);
  }, [appliedFilters]);
  const [filterError, setFilterError] = useState(null);
  const applyFilter = (formData) => {
    switch (selectedFilter.id) {
      case "names":
      case "countries":
      case "companies": {
        if (!formData.value.length) return setFilterError("Insufficient data");
        const { [selectedFilter.id]: old, ...rest } = appliedFilters;
        if (Array.isArray(old) && old.includes(formData.value))
          return setFilterError("Filter already exists");
        return setAppliedFilters({
          ...rest,
          [selectedFilter.id]: Array.isArray(old)
            ? old.concat([formData.value])
            : [formData.value],
        });
      }
      case "latest": {
        if (!formData.from.length || !formData.to.length)
          return setFilterError("Insufficient data");
        if (
          DateTime.fromISO(formData.to)
            .diff(DateTime.fromISO(formData.from))
            .toMillis() < 0
        )
          return setFilterError("Invalid date range");
        const { ...newFilter } = appliedFilters;
        if (newFilter[selectedFilter.id])
          return setFilterError("Filter already exists");
        return setAppliedFilters({
          ...newFilter,
          [selectedFilter.id]: { ...formData },
        });
      }
      case "enabled": {
        const { ...newFilter } = appliedFilters;
        if (newFilter[selectedFilter.id])
          return setFilterError("Filter already exists");
        return setAppliedFilters({
          ...newFilter,
          [selectedFilter.id]: JSON.parse(formData.enabled),
        });
      }
    }
  };
  const clearFilter = (filter, filterValue) => {
    switch (filter) {
      case "names":
      case "countries":
      case "companies": {
        const { [filter]: old, ...rest } = appliedFilters;
        let result = { ...rest };
        if (Array.isArray(old) && old.length > 1) {
          result[filter] = old.filter((val) => val !== filterValue);
        }
        return setAppliedFilters(result);
      }
      case "latest":
      case "enabled": {
        const { [filter]: old, ...rest } = appliedFilters;
        return setAppliedFilters(rest);
      }
    }
  };
  const clearAllFilters = () => {
    setAppliedFilters({});
  };

  useEffect(() => {
    if (filterError) {
      const timeout = setTimeout(() => {
        setFilterError(null);
      }, 1500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [filterError]);

  const [currentAction, setCurrentAction] = useState(null);
  const router = useRouter();

  const [users, setUsers] = useState(null);
  const [tokens, setTokens] = useState([]);
  const updateUsers = async (nextToken) => {
    const userResponse = await API.graphql({
      query: getAllUsers,
      variables: {
        nextToken,
        groups,
        ...appliedFilters,
      },
    });
    setUsers(
      userResponse.data.getAllUsers.item.map(({ id, ...rest }) => {
        const idParts = id.split("::");
        return { ...rest, id: idParts[1], username: idParts[0] };
      })
    );
    const token = userResponse.data.getAllUsers.nextToken || undefined;
    if (!tokens[tokenIndex + 1] && userResponse.data.getAllUsers.nextToken)
      setTokens(tokens.concat([token]));
  };

  const [tokenIndex, setTokenIndex] = useState(-1);
  const prevTokenIndex = () => {
    setTokenIndex(tokenIndex - 1);
  };
  const nextTokenIndex = () => {
    setTokenIndex(tokenIndex + 1);
  };
  const goToTokenIndex = (index) => {
    setTokenIndex(index);
  };

  useEffect(() => {
    setUsers(null);
    updateUsers(tokens[tokenIndex] || null);
  }, [tokenIndex, appliedFilters]);

  const input = (filter) => {
    switch (filter.id) {
      case "names":
      case "countries":
      case "companies": {
        return (
          <input
            type="text"
            placeholder={filter.label}
            name="value"
            className="bg-neutral-900 flex-1 items-center h-9 py-1 px-2 text-white outline-none"
          />
        );
      }
      case "latest": {
        return (
          <Fragment>
            <input
              type="date"
              placeholder="From"
              name="from"
              className="bg-neutral-900 flex-1 items-center h-9 py-1 px-2 text-white outline-none border-r-2 border-red"
            />
            <input
              type="date"
              placeholder="To"
              name="to"
              className="bg-neutral-900 flex-1 items-center h-9 py-1 px-2 text-white outline-none"
            />
          </Fragment>
        );
      }
      case "enabled": {
        return (
          <div className="flex text-sm rounded-lg border-2 border-red h-min mx-2 my-auto">
            <div>
              <input
                type="radio"
                id="user-enabled"
                name="enabled"
                value={true}
                className="peer appearance-none"
                defaultChecked
              />
              <label
                htmlFor="user-enabled"
                className="peer-checked:bg-red inline-block px-2 py-0.5"
              >
                Enabled
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="user-disabled"
                name="enabled"
                value={false}
                className="peer appearance-none"
              />
              <label
                htmlFor="user-disabled"
                className="peer-checked:bg-red inline-block px-2 py-0.5"
              >
                Disabled
              </label>
            </div>
          </div>
        );
      }
    }
  };

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
                          setAppliedFilters({ ...appliedFilters });
                          return setCurrentAction(null);
                        }
                        await API.graphql({
                          query: toggleUser,
                          variables: {
                            id: `${currentAction.user.username}::${currentAction.user.id}`,
                            enable: !currentAction.user.enabled,
                          },
                        });
                        setAppliedFilters({ ...appliedFilters });
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
      <section className="bg-neutral-900 w-full body-font overflow-auto flex-1">
        <div className="flex">
          <div className="flex-col w-full">
            <header className="px-20 mt-10 flex flex-row justify-between items-center ">
              <h1 className="text-white font-extrabold uppercase text-5xl">
                User Management
              </h1>
              <div className="flex space-x-4">
                <button
                  className="p-2 rounded-lg bg-blue-600"
                  onClick={() => {
                    router.push(`/users/create`);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="w-3 h-3 mr-2 align-baseline"
                  />
                  <span>New User</span>
                </button>
              </div>
            </header>
            <div className="flex mt-6 justify-between items-center px-20 text-white">
              <div className="inline-flex bg-black p-3 rounded-xl">
                <div className="flex items-center -mx-[6px]">
                  <div className="flex w-max mx-[6px] item-center border-2 border-red rounded-lg dark:">
                    <Listbox
                      value={selectedFilter}
                      onChange={setSelectedFilter}
                    >
                      <div className="relative">
                        <Listbox.Button className="inline-flex justify-between min-w-max items-center border-r-2 border-red px-5 h-9 text-sm text-white bg-neutral">
                          <span className="text-md font-medium">
                            {selectedFilter.label}
                          </span>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-white pl-2 w-3 h-3"
                          />
                        </Listbox.Button>
                        <Listbox.Options className="absolute min-w-max mt-1 z-10 max-h-56 overflow-auto rounded-md bg-neutral-900 py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm">
                          {filters.map((filter) => (
                            <Listbox.Option
                              key={filter.id}
                              value={filter}
                              className={({ active }) =>
                                `${
                                  active ? "bg-red" : ""
                                } text-white relative cursor-default select-none py-2 pl-3 pr-9`
                              }
                            >
                              {filter.label}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                    <FormContainer
                      className="flex flex-1"
                      onSubmit={applyFilter}
                    >
                      {input(selectedFilter)}
                      <button className="inline-flex justify-between items-center border-l-2 border-red bg-red px-5 h-9 text-sm text-white bg-neutral">
                        <span className="text-md font-medium text-white">
                          Filter
                        </span>
                        {/* <FontAwesomeIcon
                            icon={faArrowAltCircleDown}
                            className="text-white pl-2"
                          /> */}
                      </button>
                    </FormContainer>
                  </div>
                </div>
              </div>

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

            {appliedFiltersView.length > 0 || filterError ? (
              <div className="mt-4 px-20">
                <p className="px-4 text-sm space-x-6">
                  {filterError ? (
                    <span className="finline-flex items-center px-3 py-1 text-black bg-yellow-300 rounded-md">
                      <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="pr-2 w-3 h-3"
                      />
                      {filterError}
                    </span>
                  ) : (
                    <span>Applied filters</span>
                  )}
                  {appliedFiltersView.length > 0 && (
                    <button
                      className="inline-flex items-center text-neutral-300 hover:underline hover:text-red"
                      onClick={clearAllFilters}
                    >
                      <span>Clear all</span>
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="pl-2 w-4 h-4"
                      />
                    </button>
                  )}
                </p>
                <div className="flex px-4 pt-3 space-x-3">
                  {appliedFiltersView.map((filter, index) => (
                    <div
                      className="border-blue-400 border rounded-md overflow-hidden text-sm"
                      key={index}
                    >
                      {filter.label && (
                        <span className="inline-flex items-center bg-black px-2 py-1">
                          {filter.label}
                        </span>
                      )}
                      <button
                        className="inline-flex items-center bg-neutral-900 px-2 py-1 hover:bg-red"
                        onClick={() => clearFilter(filter.key, filter.value)}
                      >
                        <span>{filter.value}</span>
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="pl-2 w-4 h-4"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="relative mt-2 overflow-x-auto">
              <div className="w-500 h-full mx-20 mb-10 mt-3">
                <div className="flex flex-col">
                  <div className="overflow-x-auto rounded-2xl shadow-lg shadow-white bg-black">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden">
                        {users ? (
                          <table className="min-w-full divide-y table-fixed divide-gray-700">
                            <thead className="bg-black">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-md  font-medium tracking-wider text-left uppercase text-white"
                                >
                                  User
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-md  font-medium tracking-wider text-left uppercase text-white"
                                >
                                  Email
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-md font-medium tracking-wider text-left uppercase text-white"
                                >
                                  Created On
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-md  font-medium tracking-wider text-left uppercase text-white"
                                >
                                  Last Logged On
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-md  font-medium tracking-wider text-left uppercase text-white"
                                >
                                  Country
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-md font-medium tracking-wider text-left uppercase text-white"
                                >
                                  Company
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-black">
                              {users.map((user) => (
                                <tr
                                  key={user.id}
                                  className="hover:bg-gray-700 cursor-pointer"
                                  onClick={() => {
                                    router.push(`/users/${user.username}`);
                                  }}
                                >
                                  <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                                    <div className="flex flex-col">
                                      <span>{user.username}</span>
                                      <span className="text-gray-400">
                                        {user.name}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                                    {user.email}
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                                    {DateTime.fromISO(user.createdAt).toFormat(
                                      "yyyy/LL/dd hh:mm:ss a"
                                    )}
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                    {user.signedInAt
                                      ? DateTime.fromISO(
                                          user.signedInAt
                                        ).toFormat("yyyy/LL/dd hh:mm:ss a")
                                      : "Never"}
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap text-white">
                                    {user.country}
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                    <div className="flex flex-col">
                                      <span>{user.company.name}</span>
                                      <span className="text-gray-400">
                                        {user.company.external
                                          ? "External"
                                          : "Internal"}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                    <div className="flex space-x-4 justify-end">
                                      <button
                                        className="inline-flex space-x-2 text-blue-500 hover:underline"
                                        onClick={(ev) => {
                                          ev.stopPropagation();
                                          router.push(
                                            `/users/edit/${user.username}`
                                          );
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faPen}
                                          className="text-blue-500"
                                        />
                                        <span>Edit</span>
                                      </button>
                                      <button
                                        className="inline-flex space-x-2 text-blue-500 hover:underline"
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
                                              className="text-blue-500"
                                            />
                                            <span>Disable</span>
                                          </Fragment>
                                        ) : (
                                          <Fragment>
                                            <FontAwesomeIcon
                                              icon={faLockOpen}
                                              className="text-blue-500"
                                            />
                                            <span>Enable</span>
                                          </Fragment>
                                        )}
                                      </button>
                                      <button
                                        className="inline-flex space-x-2 text-red hover:underline"
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
                                          className="text-red"
                                        />
                                        <span>Delete</span>
                                      </button>
                                    </div>
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
          </div>
        </div>
      </section>
    </Fragment>
  );
}
