import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditBook = () => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [publishedYear, setpublishedYear] = useState('')
  const { id } = useParams()

  function submitHandler(e){
        e.preventDefault();
        console.log(title, author, publishedYear)

        if(title != '' && author != '' && publishedYear != ''){
          axios
          .put(
            `http://localhost:5555/books/${id}`,{
              "title" : title,
              "author" : author,
              "publishedYear" : publishedYear,
          }).then((response)=>{
            console.log("Book Updated Successfully")
          })
          .catch((error)=>{
            console.log(error);
          }).finally(()=>{
            setauthor('');
            settitle('');
            setpublishedYear('');
          })
        }else{
          console.log("Enter")
        }
        
  }


  return (
    <div className='p-10 flex flex-col gap-5'>
      <h1 className='text-4xl'>Edit Book</h1>
      <form className='mt-10 flex flex-col gap-2 justify-center items-center'>
        <label>Book Title</label>
        <input value={title} onChange={(e)=>{
          settitle(e.target.value)
        }} type="text" className='w-3/10 h-8 px-5 border-1 border-slate-400 rounded-md'/>

        <label>Author Name</label>
        <input value={author} onChange={(e)=>{
          setauthor(e.target.value)
        }} type="text" className='w-3/10 h-8 px-5  border-1 border-slate-400 rounded-md'/>

        <label>Published Year</label>
        <input value={publishedYear} onChange={(e)=>{
          setpublishedYear(e.target.value)
        }} type="text" className='w-3/10 h-8 px-5  border-1 border-slate-400 rounded-md'/>

        <button onClick={submitHandler} className='w-2/10 bg-sky-400 px-2 py-2 rounded-2xl mt-5' >Update Book</button>
      </form>
    </div>
  )
}

export default EditBook
