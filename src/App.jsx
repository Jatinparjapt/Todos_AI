import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import './App.css'
import Path from './Routes/Path'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster position="top-right" toastOptions={{
    duration: 1000,
  }}/>
      <Path/>
  

    </>
  )
}

export default App
