import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setbooks] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios
      .get("https://csufynr8ol.execute-api.us-east-1.amazonaws.com/DEV/books")
      .then((response) => {
        setbooks(response.data.books);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  }, []);

  return (

    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md mx-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md mx-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
      

              return <>  
                <tr key={book["Book-Id"]} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center mx-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 mx-md:hidden rounded-md text-center">
                  {book.publishedYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center *:">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book["Book-id"]}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>

                    <Link to={`/books/update/${book["Book-id"]}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>

                    <Link to={`/books/delete/${book["Book-id"]}`}>
                      <MdOutlineDelete className="text-2xl text-green-800" />
                    </Link>
                  </div>
                </td>
              </tr>
              </>
              
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
