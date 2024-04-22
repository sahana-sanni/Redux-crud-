import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Update from './Pages/Update'
import Pnf from './Pages/Pnf'
import Menu from './Component/Menu'
import { ToastContainer } from 'react-toastify'


function App() {
  return (

    <BrowserRouter>
       <Menu/>
          <ToastContainer/>
          <Routes>
               <Route path={`/`} element={<Home/>}/>

               <Route path={`/create`} element={<Create/>}/>
               <Route path={`/edit/:id`} element={<Update/>}/>
               <Route path={`/`} element={<Pnf/>}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App