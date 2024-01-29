import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Update = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    findUser();
  }, []);

  const findUser = async () => {
    const responce = await fetch(`http://localhost:5000/api/v1/find/${id}`);
    const data = await responce.json();

    setAge(data.data.age);
    setEmail(data.data.email);
    setName(data.data.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adduser = { name, email, age };

    const responce = await fetch(`http://localhost:5000/api/v1/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(adduser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await responce.json();

    if (!responce.ok) {
      console.log(data.massage);
    }
    if (responce.ok) {
      console.log("user updated sucessfully");
      setAge(0);
      setEmail("");
      setName("");
      navigate("/");
    }
  };

  return (
    <div className="pt-14">
      <form
        onSubmit={handleSubmit}
        className="text-gray-600 body-font relative"
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Add Employee
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Fill out the form below to register a new employee.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Enter your name"
                    type="text"
                    id="name"
                    // name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    id="email"
                    // name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="age" className="leading-7 text-sm text-gray-600">
                    Age
                  </label>
                  <input
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    id="age"
                    // name="age"
                    type="number"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Add
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-indigo-500">example@email.com</a>
                <p className="leading-normal my-5">
                  49 Smith St.
                  <br />
                  29 year old
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
