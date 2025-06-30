import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { createUser, editUser } from "../graphql/mutations";
import FormContainer from "./FormContainer";
import { Combobox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { countries } from "../data/countries";
import { companies } from "../data/companies";

export default function Header({ user, tours, clusterAdminEnabled }) {
  const [externalEmployee, setExternalEmployee] = useState(
    !!user?.company.external
  );
  const handleExternalEmployee = () => {
    setExternalEmployee(!externalEmployee);
  };

  const [selectedCountry, setSelectedCountry] = useState(
    user ? countries.find((country) => user.country === country) : countries[0]
  );
  const [selectedCompany, setSelectedCompany] = useState(
    user && !user.company.external
      ? companies.find((company) => user.company.name === company)
      : companies[0]
  );
  const [queryCountry, setQueryCountry] = useState("");
  const [queryCompany, setQueryCompany] = useState("");

  const filteredCountries =
    queryCountry === ""
      ? countries
      : countries.filter((country) =>
          country
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryCountry.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredCompanies =
    queryCompany === ""
      ? companies
      : companies.filter((company) =>
          company
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryCompany.toLowerCase().replace(/\s+/g, ""))
        );

  const router = useRouter();

  async function submitUser(formData) {
    delete formData[""];
    const {
      external,
      country: [country],
      company: companyValue,
      ...rest
    } = formData;
    const company =
      typeof external[0] === "string" ? companyValue : companyValue[0];
    if (user) {
      await API.graphql({
        query: editUser,
        variables: {
          ...rest,
          country,
          company,
          external: typeof external[0] === "string" ? true : false,
          id: `${user.username}::${user.id}`,
        },
      });
    } else {
      await API.graphql({
        query: createUser,
        variables: {
          ...rest,
          country,
          company,
          external: typeof external[0] === "string" ? true : false,
        },
      });
    }
    router.back();
  }

  return (
    <div className="flex flex-col bg-neutral-900 w-full body-font overflow-auto flex-1">
      <header>
        <h1 className="text-white justify-center font-extrabold uppercase text-5xl px-20 mt-10">
          {user ? `Edit user: ${user.username}` : "Add new user"}
        </h1>
      </header>
      <div className="p-5 m-5 h-full">
        <section
          className="p-4 mx-10 
        border-white bg-black h-100 shadow-2xl shadow-white rounded-xl"
        >
          <FormContainer onSubmit={submitUser}>
            {!!user || (
              <Fragment>
                <label htmlFor="username" className="text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="mt-1 mb-2 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </Fragment>
            )}
            <label htmlFor="name" className="text-white">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user ? user.name : ""}
              className="mt-1 mb-2 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={user ? user.email : ""}
              className="mt-1 mb-2 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <label htmlFor="country" className="text-white">
              Country
            </label>
            <input type="hidden" name="country" value={selectedCountry} />
            <Combobox value={selectedCountry} onChange={setSelectedCountry}>
              <div className="relative mt-1">
                <div>
                  <Combobox.Input
                    className="mt-1 mb-2 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    displayValue={(country) => country}
                    onChange={(event) => setQueryCountry(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <span className="inline-block px-1">
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="block w-2.5 h-2.5"
                      />
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="block w-2.5 h-2.5"
                      />
                    </span>
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQueryCountry("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                    {filteredCountries.length === 0 && queryCountry !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredCountries.map((country, index) => (
                        <Combobox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-gray-600 text-white"
                                : "text-gray-900"
                            }`
                          }
                          value={country}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {country}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-teal-600"
                                  }`}
                                >
                                  <FontAwesomeIcon icon={faCheck} />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>

            <label htmlFor="company" className="text-white">
              Company
            </label>
            <div>
              {externalEmployee ? (
                <input
                  type="text"
                  name="company"
                  id="company"
                  defaultValue={user ? user.company.name : ""}
                  className="mt-1 mb-2 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full h-10 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              ) : (
                <Fragment>
                  <input type="hidden" name="company" value={selectedCompany} />
                  <Combobox
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                  >
                    <div className="relative mt-1">
                      <div>
                        <Combobox.Input
                          className="mt-1 mb-2 p-2 bg-black focus:ring-white border-2 focus:border-white block w-full shadow-sm sm:text-sm border-gray-300 rounded-md z-20"
                          displayValue={(company) => company}
                          onChange={(event) =>
                            setQueryCompany(event.target.value)
                          }
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <span className="inline-block px-1">
                            <FontAwesomeIcon
                              icon={faChevronUp}
                              className="block w-2.5 h-2.5"
                            />
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className="block w-2.5 h-2.5"
                            />
                          </span>
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryCompany("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredCompanies.length === 0 &&
                          queryCompany !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredCompanies.map((company, index) => (
                              <Combobox.Option
                                key={index}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-gray-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={company}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {company}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        <FontAwesomeIcon icon={faCheck} />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </Fragment>
              )}
            </div>

            <div>
              <input
                type="checkbox"
                id="external"
                name="external"
                checked={externalEmployee}
                onChange={handleExternalEmployee}
              />
              <label htmlFor="external" className="ml-4">
                External employee
              </label>
            </div>
            {clusterAdminEnabled ? (
              <Fragment>
                <h1 className="mt-7 text-md">User Type</h1>
                <div>
                  <input
                    type="radio"
                    id="typename-visitor"
                    name="typename"
                    value="Visitor"
                    defaultChecked
                  />
                  <label htmlFor="typename-visitor" className="ml-4">
                    Visitor
                  </label>
                  <input
                    className="ml-8"
                    type="radio"
                    id="typename-cluster"
                    name="typename"
                    value="ClusterAdmin"
                  />
                  <label htmlFor="typename-cluster" className="ml-4">
                    Divisional Admin
                  </label>
                </div>
              </Fragment>
            ) : (
              <input type="hidden" name="typename" value="Visitor" />
            )}
            <h1 className="mt-7 text-md">Allocated Tours</h1>
            {tours.map(({ id, name }) => (
              <div key={id}>
                <input
                  type="checkbox"
                  name="allocatedTours"
                  id={id}
                  value={id}
                  defaultChecked={
                    !!user &&
                    user.tours.item.map(({ tour }) => tour.id).includes(id)
                  }
                />
                <label htmlFor={id} className="ml-4">
                  {name}
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="focus:outline-none mt-4 text-white bg-red hover:bg-red focus:ring-4 focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              {user ? "Edit user" : "Add user"}
            </button>
          </FormContainer>
        </section>
      </div>
    </div>
  );
}
