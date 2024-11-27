import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<HomePage />}>
        <Route index element={<HomePage />} />
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Route>
    )
  )

  return <RouterProvider router={router}/>
}

export default App
