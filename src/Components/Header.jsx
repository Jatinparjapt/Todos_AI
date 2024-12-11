import React, { useRef, useState } from 'react'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { RiTodoLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import toast from "react-hot-toast";
const Header = () => {
    const navigate = useNavigate()
    const getUserType = localStorage.getItem("userType")
    const [isDialogBoxOpen , setIsDialogBoxOpen] = useState(false)
    const [selected, setSelected] = useState('');
    const dialogRef = useRef(null)
    const showDialogBoxHangle = ()=>{
        setIsDialogBoxOpen(true)
        dialogRef.current.showModal();
        // console.log("dialog")
    }
    const closeDialogBoxHandle = (data)=>{
        console.log(data)
        if(data){
            setIsDialogBoxOpen(false)
            dialogRef.current.close()
        }
        if(data === "databaseUser"){
            let cookies = false
            if(!cookies){
                navigate("/login")
                toast.error("User Not Found ! 🥲🥲")
            }else{
                localStorage.setItem("userType",data)
                setSelected(data)
                navigate("/")
            }

        }else{
            localStorage.setItem("userType",data)

        }
    }
  return (
    <>
    <section className='w-full flex  bg-purple-600  sm:text-lg text-base  md:text-2xl  text-white' >
        <nav className='flex sm:flex-row  py-3  place-content-around w-full md:mx-auto ' >
            <Link className='flex items-center justify-center sm:justify-start animate-bounce ' to={"/"}>
                Let's Build Something New <RiTodoLine className='mx-2 bounce-left-to-right ' />
            </Link>
            <button  title='Select User According To Use Case' onClick={showDialogBoxHangle} className='bg-white flex w-auto items-center font-medium text-purple-600 px-2 py-1 rounded-lg  ' >
                {getUserType === "localUser" ?" Local User" :"Database User"} <MdOutlineAccountCircle className='mx-2' />
            </button>
        </nav>
        <dialog className='w-full md:w-[50%] px-5 ' ref={dialogRef} >
        <div className="w-full absolute  right-10 flex justify-end mt-5 mb-0 ">
                <button onClick={()=>dialogRef.current.close()} type="button"><GrClose className='font-bold text-purple-600' /></button>
                </div>
            <form className='h-auto py-5  ' action="">
                <h1>Select User According To Use</h1>
                <div className='flex justify-start items-center' >
                <input type="checkbox"  className='py-4  px-2 mx-2 text-8xl' name='localUser' id='localUser'
                 checked={selected === 'localUser'}
                  onChange={()=>closeDialogBoxHandle("localUser")} />
                <label htmlFor="localUser"> Local User (Less Secure 🥲 ) </label>
                </div>
                <div className='flex justify-start items-center ' >

                <input type="checkbox" className='py-2 px-2 mx-2 text-5xl' name="databaseUser" id="databaseUser"
                checked={selected === 'databaseUser'}
                 onChange={()=>closeDialogBoxHandle("databaseUser")} />
                <label htmlFor="databaseUser">Database User (High Security 😎 ) </label>
                </div>
                

            </form>
        </dialog>
        </section>
       
        
        </>
  )
}

export default Header