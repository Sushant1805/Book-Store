import React from 'react'
import {RouterProvider , createBrowserRouter} from 'react-router-dom'
import Home from '../Pages/Home'
import ShowBook from '../Pages/ShowBook'
import CreateBook from '../Pages/CreateBook'
import DeleteBook from '../Pages/DeleteBook'
import EditBook from '../Pages/EditBook'

const App = () => {
  const Router =createBrowserRouter([
    {
      path : '/',
      element: <Home/>
    },
    {
      path : '/books/create',
      element: <CreateBook/>
    },
    {
      path : '/books/delete/:id',
      element: <DeleteBook/>
    },
    {
      path : '/books/update/:id',
      element: <EditBook/>
    },
    {
      path : '/books/details/:id',
      element: <ShowBook/>
    },
  ])
 
  return (
    <>
    <RouterProvider router = {Router} />
    
    </>
    
    
  )
}

export default App
