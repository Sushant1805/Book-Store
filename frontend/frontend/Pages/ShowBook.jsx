import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
const ShowBook = () => {
  const [book, setbook] = useState([])
  const {id} = useParams();
  console.log(id)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setbook(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, [id]);
  return (
      <>
      <div className='p-10 w-screen h-screen flex flex-col gap-5 justify-center items-center'>
          <h1 className='text-4xl font-semibold'>Book Details</h1>
          <div className='w-8/10 p-5 flex rounded-xl flex-col gap-5 bg-emerald-100 justify-center items-center'>
            <h1 className='text-2xl font-semibold'>Book Name: {book.title}</h1>
            <h1 className='text-2xl font-semibold'>Author: {book.author}</h1>
            <h1 className='text-2xl font-semibold'>Publish Year: {book.publishedYear}</h1>
          </div>
      </div>
        
      </>
  )
}

export default ShowBook
