import React, { useEffect, useState } from 'react'
import Links from '../../Components/Links'
import All from '../StatusComp/All'
import Pending from '../StatusComp/Pending'
import Progress from '../StatusComp/Progress'
import Completed from '../StatusComp/Completed'
import { useSelector } from 'react-redux'
import DatabaseUser from '../StatusComp/DatabaseUser'
const ToDoList = () => {
  const getComp = useSelector((state)=>state.setDataLocal.comp)
  const getUserType = localStorage.getItem("userType")
  const token = true
  return (
    <>
    <section className='xl:w-[60%] xl:mx-auto w-full ' >
    <Links/>
    
    {getUserType === "databaseUser" && token ? <DatabaseUser/>:
    <>
    <All />
    {/* {getComp === "pending" && <Pending />}
    {getComp === "progress" && <Progress />}
    {getComp === "completed" && <Completed />} */}
    </> 
    }

    
    </section>
    </>
  )
}

export default ToDoList