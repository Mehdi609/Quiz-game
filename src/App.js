import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Quiz from './components/quiz'



export default function App() {
  return (
   

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/quiz' element={<Quiz/>} />
      </Routes>
    </BrowserRouter>
  )
}

