import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {getTodoList} from "../../Redux_Toolkit/todoDatabaseSlice"
import {
  todoDelete,
  todoStatusUpdate,
  todoTitleUpdate,
  todoDescUpdate,
} from "../../Redux_Toolkit/mainpulateTodoData";
import { MdPendingActions } from "react-icons/md";
import { TbProgressX } from "react-icons/tb";
import { AiOutlineFileDone } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { GrClose } from "react-icons/gr";


const DatabaseUser = () => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [errors, setErrors] = useState({});
  const [titleAndDesc, setTitleAndDesc] = useState({
    title: "",
    description: "",
  });
  const todoList = useSelector((state) => state.setDataLocal.localStorageData); // Match state key
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  if (!todoList) {
    return <div>Loading...</div>;
  }
  // tile and desciption
  const setDataToStates = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Validation logic for title
    if (name === "title") {
      if (value.length > 30) {
        errorMessage = "Title must be less than or equal to 30 characters";
      } else if (value.length <= 4) {
        errorMessage = "Title must be greater than 4 characters";
      }
    }

    // Validation logic for description
    if (name === "description") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 20) {
        errorMessage = "Description must be 20 words or fewer";
      } else if (wordCount <= 3) {
        errorMessage = "Description must be greater than 3 words";
      }
    }

    // Update state only if no error
    if (!errorMessage) {
      setTitleAndDesc((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Update errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // dispatch funciton to store for tilte update
  const titleUpdate = (e) => {
    e.preventDefault();
    // console.log(titleAndDesc);
    if (titleAndDesc.title) {
      dispatch(
        todoTitleUpdate({ id: selectedTaskId, title: titleAndDesc.title })
      );
      tilteClose();
      dispatch(getTodoList());
      toast.success(" Title  Updated Successfully");
    }
  };
  // dispatch funciton to store for description update

  const descriptionUpdate = (e) => {
    e.preventDefault();
    // console.log(titleAndDesc);
    if (titleAndDesc.description) {
      dispatch(
        todoDescUpdate({ id: selectedTaskId, desc: titleAndDesc.description })
      );
      descriptionClose();
      dispatch(getTodoList());
      toast.success("Todo Description Updated Successfully");
    }
  };
  // title update dialog box opern
  const titleDialogOpen = (id, value) => {
    setTitleAndDesc((prevState) => ({
      ...prevState,
      title: value,
    }));
    console.log(titleAndDesc, "form upate line 55", value, id);
    titleRef.current.showModal();
    setSelectedTaskId(id);
  };
  // descripton update dialog box opnen
  const descDialogOpen = (id, value) => {
    setTitleAndDesc((prevState) => ({
      ...prevState,
      description: value,
    }));
    console.log(titleAndDesc, "form upate line 55", value, id);
    descriptionRef.current.showModal();
    setSelectedTaskId(id);
  };
  // title update dailog close
  const tilteClose = () => {
    titleRef.current.close();
  };
  // description update dailog close
  const descriptionClose = () => {
    descriptionRef.current.close();
  };

  // for status
  const handleStatusChange = (e) => {
    // console.log("e",e.target.value )
    setSelectedStatus(e.target.value);
      };

  const openDialog = (id) => {
    setSelectedTaskId(id);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setSelectedTaskId(null);
    setSelectedStatus("");
  };

  const updateStatusFunction = (e) => {
    e.preventDefault();
    console.log(selectedTaskId, selectedStatus, "get 2");
    if (selectedTaskId && selectedStatus) {
      dispatch(
        todoStatusUpdate({ id: selectedTaskId, status: selectedStatus })
      );
      closeDialog();
      dispatch(getTodoList());
      toast.success("Status Updated Successfully");
    } else {
      toast.error("Please Add Information");
    }
  };

  const deleteTodoData = (id) => {
    dispatch(todoDelete(id));
    dispatch(getTodoList());
    toast.success("Todo Deleted Successfully");
  };

  return (
    <section className="md:w-[94%] md:mx-auto w-full font-mono">
      {todoList.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="bg-green-200 py-2 text-sm sm:text-lg">
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Delete</th>
              <th className="hidden md:table-cell ">Created At</th>
              <th className="hidden md:table-cell">Updated At</th>
            </tr>
          </thead>
          <tbody className="w-full text-center text-sm md:text-base">
            {todoList.map((task, index) => (
              <tr key={index} className="rounded-sm border-2 my-4">
                <td
                  title={task.title}
                  onClick={() => titleDialogOpen(task.id, task.title)}
                  className="md:mx-1"
                >
                  {task.title}
                </td>
                <td
                  title={task.description}
                  onClick={() => descDialogOpen(task.id, task.description)}
                  className="md:mx-1  w-auto "
                >
                  {task.description}
                </td>
                <td
                  title={task.status}
                  onClick={() => openDialog(task.id)}
                  className={`md:mx-1 flex items-center font-semibold ${
                    task.status === "Progress"
                      ? "text-pink-700"
                      : "text-[#da3705]"
                  } ${
                    task.status === "Completed"
                      ? "text-green-600"
                      : "text-[#da3705]"
                  }`}
                >
                  {task.status}
                  {task.status === "Pending" && (
                    <MdPendingActions className="md:mx-1 animate-bounce " />
                  )}
                  {task.status === "Progress" && (
                    <TbProgressX className="md:mx-1 animate-spin " />
                  )}
                  {task.status === "Completed" && (
                    <AiOutlineFileDone className="md:mx-1 animate-pulse " />
                  )}
                </td>
                <td
                  title={`Delete ${task.status}`}
                  onClick={() => deleteTodoData(task.id)}
                  className="mx-1 md:bg-blue-400 text-center w-auto"
                >
                  <RiDeleteBin2Line className="text-center mx-[40%] reverse-spin-delete " />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-2xl text-red-600 text-center">
          You don't have any tasks, please add some tasks.
        </p>
      )}

      <dialog className="w-full md:w-[40%] mx-auto px-5" ref={dialogRef}>
      <div className="w-full absolute  sm:right-10 right-5 flex top-1 justify-end mt-5 mb-0 ">
                <button onClick={()=>dialogRef.current.close()} type="button"><GrClose className='font-bold text-purple-600 text-xl' /></button>
                </div>
        <form className="h-auto py-5">
          <h1 className="sm:text-2xl text-lg flex items-center ">
            Select Status
            <div className="text-purple-700 animate-bounce flex items-center ">
              <MdPendingActions /> <TbProgressX className=" animate-spin " />
              <AiOutlineFileDone />
            </div>
          </h1>
          <select
            onChange={handleStatusChange}
            name="status"
            id="status"
            className="rounded-lg text-lg w-full border-2 py-2 px-1 my-3 font-mono"
          >
            <option  disabled className="bg-white text-purple-700" value="Status not selected" >
              Please Select
            </option>
            <option className="bg-white text-purple-700" value="Pending">
              Pending
            </option>
            <option className="bg-white text-purple-700" value="Progress">
              Progress
            </option>
            <option className="bg-white text-purple-700" value="Completed">
              Completed
            </option>
          </select>
          <div className="btn flex place-content-evenly">
            <button
              type="submit"
              onClick={updateStatusFunction}
              className="px-2 py-1 bg-purple-600 text-white hover:bg-purple-400 rounded-lg text-lg"
            >
              Update
            </button>
            <button
              type="button"
              onClick={closeDialog}
              className="px-2 py-1 rounded-lg border-2 hover:border-0 border-purple-600 hover:bg-purple-600 hover:text-white font-bold text-purple-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      <dialog className="w-full md:w-[40%] mx-auto px-5" ref={titleRef}>
      <div className="w-full absolute  right-10 flex justify-end mt-5 mb-0 ">
                <button onClick={()=>titleRef.current.close()} type="button"><GrClose className='font-bold text-purple-600 text-xl' /></button>
                </div>
        <form className="h-auto py-5">
          <h1 className="sm:text-2xl text-lg">Update Title </h1>
          <input
            type="text"
            placeholder="Enter your title "
            className="rounded-lg border-blue-700 text-xl hover:border-blue-700 outline-0 w-full border-b-2 py-2 px-1 my-3"
            name="title"
            value={titleAndDesc.title}
            id="title"
            onChange={setDataToStates}
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
          <div className="btn flex place-content-evenly">
            <button
              type="submit"
              onClick={titleUpdate}
              className="px-2 py-1 bg-purple-600 text-white hover:bg-purple-400 rounded-lg text-lg"
            >
              Update
            </button>
            <button
              type="button"
              onClick={tilteClose}
              className="px-2 py-1 rounded-lg border-2 hover:border-0 border-purple-600 hover:bg-purple-600 hover:text-white font-bold text-purple-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      <dialog className="w-full md:w-[40%] mx-auto px-5" ref={descriptionRef}>
      <div className="w-full absolute  right-10 flex justify-end mt-5 mb-0 ">
                <button onClick={()=>descriptionRef.current.close()} type="button"><GrClose className='font-bold text-purple-600 text-xl' /></button>
                </div>
        <form className="h-auto py-5">
          <h1 className="sm:text-2xl text-lg">Update Description</h1>
          <textarea
            placeholder="Enter description"
            className="rounded-lg border-blue-700 hover:border-blue-700 outline-0 text-lg border-b-2 w-full py-2 px-1 my-3 font-mono"
            name="description"
            value={titleAndDesc.description}
            onChange={setDataToStates}
            id="description"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}

          <div className="btn flex place-content-evenly">
            <button
              type="submit"
              onClick={descriptionUpdate}
              className="px-2 py-1 bg-purple-600 text-white hover:bg-purple-400 rounded-lg text-lg"
            >
              Update
            </button>
            <button
              type="button"
              onClick={descriptionClose}
              className="px-2 py-1 rounded-lg border-2 hover:border-0 border-purple-600 hover:bg-purple-600 hover:text-white font-bold text-purple-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
};

export default DatabaseUser;
