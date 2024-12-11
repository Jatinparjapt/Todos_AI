import React from 'react'
import { MdPendingActions } from "react-icons/md";
import { TbProgressX } from "react-icons/tb";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaList } from "react-icons/fa6";
import { setComp } from '../Redux_Toolkit/getDataSlice';
import { useDispatch, useSelector } from 'react-redux';
const Links = () => {
  const dispatch = useDispatch()
  const getComp = useSelector((state)=>state.setDataLocal.comp)
  console.log(getComp, "get real update")
  const changeComponent = (data)=>{
    dispatch(setComp(data))
  }
  return (
    <nav className='w-full flex mt-3 '  >
        <ul className='flex w-full md:mx-4 place-content-around sm:text-xl text-base font-semibold cursor-pointer text-purple-700  border-b-4 bg-slate-200 rounded-md border-green-500 py-4 my-2 ' >
            <li className={`border-b-0 flex items-center  border-purple-400 ${getComp ==="all"?"border-b-4":"hover:border-b-4"} `} onClick={()=>changeComponent("all")} >All <FaList className='ml-2 bounce-left-to-right ' /> </li>

            <li className={`border-b-0 flex items-center  border-purple-400 ${getComp ==="Pending"?"border-b-4":"hover:border-b-4"} `} onClick={()=>changeComponent("Pending")} >Pending <MdPendingActions className='ml-1 bounce-left-to-right ' /> </li>

            <li className={`border-b-0 flex items-center  border-purple-400 ${getComp ==="Progress"?"border-b-4":"hover:border-b-4"} `} onClick={()=>changeComponent("Progress")} >Progress <TbProgressX className='ml-1 reverse-spin ' /> </li>

            <li className={`border-b-0 flex items-center  border-purple-400 ${getComp ==="Completed"?"border-b-4":"hover:border-b-4"} `} onClick={()=>changeComponent("Completed")} >Completed <AiOutlineFileDone className='ml-1 bounce-left-to-right ' /> </li>
        </ul>
    </nav>
  )
}

export default Links