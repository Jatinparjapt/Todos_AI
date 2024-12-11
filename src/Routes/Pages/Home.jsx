import React from 'react'
import Form from '../FormAndListComp/Form'
import ToDoList from '../FormAndListComp/ToDoList'
import image1 from "../../images/image2.png"

const Home = () => {
  return (
    <>
    <main className='md:flex w-full mx-auto justify-center h-full my-5 ' >
    <Form/>
    <ToDoList/>
    </main>
    </>
  )
}

export default Home