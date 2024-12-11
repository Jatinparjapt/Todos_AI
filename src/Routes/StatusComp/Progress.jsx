import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { TbProgressX } from "react-icons/tb";
import { getDataLocalStorage} from "../../Redux_Toolkit/getDataSlice";
import { todoDelete } from '../../Redux_Toolkit/mainpulateTodoData';

const Progress = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.setDataLocal.localStorageData); // Make sure to match the state key
  useEffect(() => {
    dispatch(getDataLocalStorage());
  }, [dispatch]);

  if (!todoList) {
    return <div>loading</div>;
  } else {
    const filterData = todoList.filter((item) => item.status === "Progress");
    const deleteTodoData = (id) => {
      dispatch(todoDelete(id));
      dispatch(getDataLocalStorage());
    };
    // console.log(filterData , "filet progress")
    return (
      <>
        <section className="w-[94%] mx-auto font-sans ">
          {filterData.length > 0 ? (
            <table className="w-full ">
              <thead className="">
                <tr className=" bg-green-200 py-2 text-sm sm:text-lg ">
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="w-full text-center text-sm md:text-base ">
                <>
                  {filterData.map((task, index) => (
                    <tr key={index} className="rounded-sm border-2 my-4">
                      <td title={task.title} className="mx-1">
                        {task.title}
                      </td>
                      <td title={task.description} className="mx-1">
                        {task.description}
                      </td>
                      <td
                        title={task.status}
                        className="text-pink-700 flex items-center font-semibold justify-center "
                      >
                        {task.status} <TbProgressX className="mx-1" />{" "}
                      </td>
                      <td
                        title={` Delete ${task.status}`}
                        onClick={() => deleteTodoData(task.id)}
                        className="mx-1 md:bg-blue-400 text-center w-auto "
                      >
                        <MdDelete className="text-center mx-[40%] " />
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          ) : (
            <p className="text-2xl text-red-600 text-center  ">
              No task is under progress
            </p>
          )}
        </section>
      </>
    );
  }
};

export default Progress;
