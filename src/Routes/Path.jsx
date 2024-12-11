import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";

const Home = lazy(()=>import("./Pages/Home"))
const PageNotFound = lazy(()=>import("./Pages/PageNotFound"))
const Header = lazy(()=>import("../Components/Header"))
const Login = lazy(()=>import("./Pages/Login"))
const Signup = lazy(()=>import("./Pages/Signup"))


const Path = () => {
  return (
    <>
       <Suspense fallback={ <div>loading</div>}>
        <Header />
        <Routes>
          {/* Route definitions for different pages */}
          <Route path='' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />


          {/* Route for handling undefined paths */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>

      </Suspense>
    
    </>
  )
}

export default Path