import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Edit = () => {
  const router = useRouter();
  const { title } = router.query;

  const [todo, setTodo] = useState({ title: "" });

  useEffect(() => {
    let todos = localStorage.getItem("todos");
    if (todos) {
      let todosJson = JSON.parse(todos);
      let foundTodo = todosJson.find((e) => e.title === title);
      if (foundTodo) {
        setTodo(foundTodo);
      }
    }
  }, [title]);

  const onChange = (e) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const updateTodo = () => {
    let todos = localStorage.getItem("todos");
    if (todos) {
      let todosJson = JSON.parse(todos);
      let index = todosJson.findIndex((value) => value.title === title);
      if (index !== -1) {
        todosJson[index].title = todo.title;
        localStorage.setItem("todos", JSON.stringify(todosJson));
        alert("Todo has been updated");
        router.push("/todos"); // Redirect back to the list
      } else {
        alert("Todo does not exist");
      }
    }
  };

  return (
    <div className="my-2 text-3xl">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Update a Todo
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="title"
                className="leading-7 text-sm text-gray-600"
              >
                Todo
              </label>
              <input
                onChange={onChange}
                value={todo.title}
                type="text"
                id="title"
                name="title"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              onClick={updateTodo}
              className="text-white w-fit bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Update Todo
            </button>
            <p className="text-xs text-gray-500 mt-3">
              The best todo list app out there!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Edit;
