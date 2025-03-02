import React, { useEffect, useState } from "react";
import Link from "next/link";

const Todos = () => {
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [completedTodo, setCompletedTodo] = useState(null); // Tracks which todo is being completed
  const [todos, setTodos] = useState([]);
  const [actionType, setActionType] = useState("");

  const [addTodoModal, setAddTodoModal] = useState(false); // For Add Todo Popup
  const [newTodo, setNewTodo] = useState(""); // For storing new todo input

  useEffect(() => {
    let storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAction = () => {
    if (actionType === "delete") {
      let newTodos = todos.filter((item) => item.title !== todoToDelete);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
      setShowModal(false);
    } else if (actionType === "complete") {
      // Set only the clicked todo as completed
      setCompletedTodo(todoToDelete);

      setTimeout(() => {
        let newTodos = todos.filter((item) => item.title !== todoToDelete);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
        // Reset completed state since the todo is removed
        setCompletedTodo(null);
      }, 1000);

      setShowModal(false);
    }
  };

  const openModal = (title, type) => {
    setTodoToDelete(title);
    setActionType(type);
    setShowModal(true);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      alert("Please enter a valid todo!");
      return;
    }

    let updatedTodos = [...todos, { title: newTodo }];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    setNewTodo(""); // Clear input
    setAddTodoModal(false); // Close modal
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Your Todo's
          </h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Your Todo's will show up here
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {todos.map((item) => {
            return (
              <div key={item.title} className="w-4/5 mx-auto p-4">
                <div className="border border-black p-6 rounded-lg flex items-center justify-between">
                  <div
                    className="w-10 h-10 mt-0 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 cursor-pointer"
                    onClick={() => openModal(item.title, "complete")}
                  >
                    {completedTodo === item.title ? (
                      <svg
                        className="w-12 h-12"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="24px"
                        height="24px"
                      >
                        <path
                          fill="#c8e6c9"
                          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                        />
                        <path
                          fill="#4caf50"
                          d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z"
                          stroke="#464455"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  <h2 className="text-lg ml-5 flex-1 text-gray-900 font-medium title-font mb-2">
                    {item.title}
                  </h2>

                  <Link href={`/edit/${encodeURIComponent(item.title)}`}>
                    <svg
                      className="w-8 mx-auto mr-2 h-7 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.7 5.2a1.024 1.024 0 0 1 0 1.448l-2.626 2.628-3.35-3.35L17.35 3.3a1.024 1.024 0 0 1 1.448 0zm-4.166 5.614-3.35-3.35-8.509 8.511L3 21l5.025-1.675z" />
                    </svg>
                  </Link>

                  <svg
                    className="mt-0 ml-auto cursor-pointer"
                    onClick={() => openModal(item.title, "delete")}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                  >
                    <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Todo Button */}
        <button
          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={() => setAddTodoModal(true)}
        >
          Add Todo
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4">
              {actionType === "delete"
                ? "Are you sure you want to delete this task?"
                : "Mark this task as completed?"}
            </p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleAction}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {addTodoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add New Todo
            </h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter your todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setAddTodoModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                onClick={handleAddTodo}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Todos;
