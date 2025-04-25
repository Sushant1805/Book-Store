import axios from 'axios';
import React from 'react'
import { MdDragHandle } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const {id} = useParams()
  const navigate = useNavigate();
   

    function handleclick(){
        navigate('/');
    }

    function deleteHandler(){
        axios
        .delete(`https://csufynr8ol.execute-api.us-east-1.amazonaws.com/DEV/books/${id}`)
        .then(()=>{
            console.log("Book Deleted Successfully!")
            navigate('/');
        }).catch((error)=>{
          console.log(error)
        }).finally(()=>{
          navigate('/');
        })
    }


  return (
    <>
    <div className='flex flex-col gap-10 justify-center items-center h-screen'>
      <h1 className='text-4xl'>Are you Sure You Want to Delete Book?</h1>
     <div className="flex w-8/10 justify-center gap-5">
          <button onClick={deleteHandler} className='bg-red-600 rounded-md px-2 py-2 w-1/10 hover:bg-red-800 cursor-pointer'>Yes</button>
          <button onClick={handleclick}className='bg-green-600 rounded-md px-2 py-2 w-1/10 hover:bg-green-800 cursor-pointer'>No</button>

     </div>
    </div>
    </>
  )
}

export default DeleteBook
