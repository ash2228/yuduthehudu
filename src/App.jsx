import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState("No New Tasks To Show");
  useEffect(() => {
    let tasksString = localStorage.getItem("tasks");
    if (tasksString) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks);
    }
  }, []);
  const saveToLS = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("tasksf", JSON.stringify(taskStatus));
  };
  const taskChanged = (e) => {
    setTask(e.target.value);
  };
  const keyHandler = (e) => {
    if (e.key == "Enter") {
      setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
      setTask("");
      setTaskStatus("Your Tasks:");
    }
  };
  const buttonhandler = () => {
    setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
    setTask("");
    setTaskStatus("Your Tasks:");
  };
  const handelChange = (e) => {
    let id = e.target.name;
    let index = tasks.findIndex((item) => {
      return item.id === id;
    });
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };
  const handleDelete = (e, id) => {
    let newTasks = tasks.filter((item) => {
      return item.id != id;
    });
    setTasks(newTasks);
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-20 rounded-xl p-5 bg-slate-900 flex flex-col">
        <h1 className="text-white text-xl font-bold inline mx-auto">Your Yudus</h1>
        <input
          className="float-right rounded-xl text-xl"
          type="text"
          value={task}
          onChange={taskChanged}
          onKeyDown={keyHandler}
        />
        <button
          onClick={() => {
            buttonhandler();
          }}
          className="text-white my-10 bg-red-800 p-3 rounded-xl"
        >
          Add
        </button>
      </div>
      <div className="container mx-auto my-20 rounded-xl p-5 bg-slate-900">
        <h1 className="font-bold text-white">{taskStatus}</h1>
        {tasks.map((item) => {
          return (
            <ol className="text-white my-8" key={item.id}>
              <li>
                <h1 className="mx-20">
                  <span className={item.isCompleted ? "line-through" : ""}>
                    {item.task}
                  </span>
                </h1>
                <button
                  className="bg-red-700 text-white float-right rounded-xl p-3 -my-10 mx-20"
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name={item.id}
                  id=""
                  className="bg-red-700 text-white float-left rounded-xl size-5 -my-6"
                  onChange={handelChange}
                  value={item.isCompleted}
                />
              </li>
            </ol>
          );
        })}
        <button
          onClick={() => {
            saveToLS();
          }}
          className="text-white my-10 bg-red-800 p-3 rounded-xl"
        >
          SAVE
        </button>
      </div>
    </>
  );
}
export default App;
