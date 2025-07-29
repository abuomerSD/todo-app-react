import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

function ToDo() {
  const [taskInputValue, setTaskInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setAddTaskModalIsOpen] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const [deleteTaskModalIsOpen, setDeleteTaskModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleAddTask = (e) => {
    // check if the input is empty
    if (taskInputValue === "") {
      setModalErrorMessage("You can't add empty task");
      return;
    }

    // check if the task is already added
    const isAdded = tasks.some((task) => task === taskInputValue.trim());
    if (isAdded) {
      setModalErrorMessage("This Task is already added");
      return;
    }
    setTasks([...tasks, taskInputValue.trim()]);
    setAddTaskModalIsOpen(false);
    setTaskInputValue("");
  };

  const handleTaskInputChange = (e) => {
    setModalErrorMessage("");
    setTaskInputValue(e.target.value);
  };

  const handleDeleteTask = () => {
    const newTasks = tasks.filter((task) => task !== selectedTask);
    setTasks(newTasks);
    setDeleteTaskModalIsOpen(false);
    setSelectedTask("");
  };

  const handleEditTask = () => {
    const value = taskInputValue.trim();

    // check if the task input is empty

    if (value === "") {
      setModalErrorMessage("You can not save empty task");
      return;
    }

    // check if task already added
    const isAdded = tasks.some((task) => task === value);

    if (isAdded) {
      setModalErrorMessage("This Task is Already Added");
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? value : task
    );

    setTasks(updatedTasks);
    setSelectedTask("");
    setTaskInputValue("");
    setEditTaskModalIsOpen(false);
  };

  return (
    <div className="todo">
      <header classsName="header">
        <div className="container-fluid d-flex justify-content-center bg-dark text-white h-25">
          <h1>To Do App</h1>
        </div>
      </header>
      <div className="todo-container">
        <div className="todo-header">
          <h5>Add Task</h5>
          <FontAwesomeIcon
            icon={faCirclePlus}
            size="2x"
            className="text-success icon"
            onClick={() => setAddTaskModalIsOpen(true)}
          />
        </div>
        <div className="todo-list mt-2">
          <ul className="list-group">
            {tasks.map((task) => (
              <li className="list-group-item todo-item" key={task}>
                <p className="todo-item-description">{task}</p>
                <div className="todo-edit">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="icon text-primary"
                    onClick={() => {
                      setEditTaskModalIsOpen(true);
                      setSelectedTask(task);
                      setTaskInputValue(task);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="icon text-danger"
                    onClick={() => {
                      setSelectedTask(task);
                      setDeleteTaskModalIsOpen(true);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="modals">
        {/* add task modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setAddTaskModalIsOpen(false)}
          style={customStyles}
          contentLabel="Add Task Modal"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Task"
            value={taskInputValue}
            onChange={handleTaskInputChange}
          />
          <div className="d-flex gap-2 justify-content-center mt-2">
            <button className="btn btn-success" onClick={handleAddTask}>
              Save
            </button>
            <button
              className="btn btn-dark ml-2"
              onClick={() => {
                setAddTaskModalIsOpen(false);
                setSelectedTask("");
              }}
            >
              Close
            </button>
          </div>
          <p className="text-danger m-2">{modalErrorMessage}</p>
        </Modal>

        {/* edit task modal */}
        <Modal
          isOpen={editTaskModalIsOpen}
          onRequestClose={() => setEditTaskModalIsOpen(false)}
          style={customStyles}
          contentLabel="Edit Task Modal"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Task"
            value={taskInputValue}
            onChange={handleTaskInputChange}
          />
          <div className="d-flex gap-2 justify-content-center mt-2">
            <button className="btn btn-success" onClick={handleEditTask}>
              Update
            </button>
            <button
              className="btn btn-dark ml-2"
              onClick={() => {
                setEditTaskModalIsOpen(false);
                setSelectedTask("");
              }}
            >
              Close
            </button>
          </div>
          <p className="text-danger m-2">{modalErrorMessage}</p>
        </Modal>

        {/* delete task modal */}
        <Modal
          isOpen={deleteTaskModalIsOpen}
          onRequestClose={() => setDeleteTaskModalIsOpen(false)}
          style={customStyles}
          contentLabel="delete Task Modal"
        >
          <h6>Do You Want to Delete This Task: {selectedTask} ?</h6>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <button className="btn btn-danger" onClick={handleDeleteTask}>
              Delete
            </button>
            <button
              className="btn btn-dark"
              onClick={() => {
                setDeleteTaskModalIsOpen(false);
                setSelectedTask("");
              }}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ToDo;
