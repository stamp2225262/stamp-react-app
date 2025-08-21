import Hearder from "./components/็Header";
import Footer from "./components/Footer";
import { useState } from "react";
import handleRequest from "~/entry.server";

export default function MyTermProject () {
    const [book , setBook] = useState({
        bookTitle: "Webprogramming",
        bookDesc: "React & Tailwind CSS",
        bookPrice: 199,
        bookAuthor: "TAMX",
        bookCover: "/images/cover.jpg"
    });
    const [nextId, setNextId] = useState(0);
    const [books, setBooks] = useState([]);
    

    // info Student
    const myPage = "TAMX Term Project";
    const myName = "Atthapron Samangyad";
    const myStudID = "026730491003-2";
    
     
    const handleTitleChange = (e) => {
        setBook({
            ...book,
            bookTitle: e.target.value
        });
    }

    const handleDescChange = (e) => {
        setBook({
            ...book,
            bookDesc: e.target.value
        });
    }

    const handlePriceChange = (e) => {
        setBook({
            ...book,
            bookPrice: e.target.value
        });
    }

    const handleAuthorChange = (e) => {
        setBook({
            ...book,
            bookAuthor: e.target.value
        });
    }

    const handleCoverChange = (e) => {
        setBook({
            ...book,
            bookCover: e.target.value
        });
    }
    const resetForm = () => {
        setBook({
            bookTitle: "",
            bookDesc: "",
            bookPrice: 0,
            bookAuthor: "",
            bookCover: ""
        });
    }

    const addBook = (e) => {
        setBooks([
            ...books,
            {
                id: nextId,
                bookTitle: book.bookTitle,
                bookDesc: book.bookDesc,
                bookPrice: book.bookPrice,
                bookAuthor: book.bookAuthor,
                bookCover: book.bookCover
            }
        ]);
        setNextId(nextId + 1);

    }


    const bookItems = books.map((bObj, index) => 
        <div className="max-w-sm bg-white border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={bObj.bookCover} title={bObj.bookTitle} />
            </a>
            <div className="p-5">
                <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bObj.bookTitle}</h5>
             </a>
             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{bObj.bookDesc}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ราคา: {bObj.bookPrice} บาท</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ผู้แต่ง: {bObj.bookAuthor}</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
              </a>
            </div>
          </div>

    );
    // function handleClick () {
    //     alert("คุณเลือกสำเร็จ")
    // }
    


    

    return (
        <>
         <Hearder messenger={myPage}/>
         <p className="text-xl m-3 text-center">
            Name: {myName} <br /> Student ID: {myStudID}
         </p>
    
            <div className="w-1/2 grid mx-auto h-100 overflow-hide rounded-2xl border border-gray-300 m-2 flex justify-center grid grid-cols-2 gap-2">
            
              <form className="m-5 pr-20 max-w-sm mx-auto flex-none">
                <a>
                 <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">เพิ่มหนังสือใหม่</h6>
             </a>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อหนังสือ (Title)</label>
            <input
              value= {book.bookTitle}
              onChange={handleTitleChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
           <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายละเอียดหนังสือ (Description)</label>
            <input
              value= {book.bookDesc}
              onChange={handleDescChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ราคาหนังสือ (Price)</label>
            <input
              value= {book.bookPrice}
              onChange={handlePriceChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อผู้แต่ง (Author)</label>
            <input
              value= {book.bookAuthor}
              onChange={handleAuthorChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หน้าปกหนังสือ (Cover)</label>
            <input
              value= {book.bookCover}
              onChange={handleCoverChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
           <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick = {addBook}>
            เพิ่มหนังสือ
        </button>
         <button type="button" className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick = {resetForm}>
            รีเซ็ตหนังสือ
        </button>
        </form>

          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
           <a href="#">
             <img className="rounded-t-lg" src={book.bookCover} title={book.bookTitle} />
           </a>
           <div className="p-5">
             <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.bookTitle}</h5>
             </a>
             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.bookDesc}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ราคา: {book.bookPrice} บาท</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ผู้แต่ง: {book.bookAuthor}</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              [D] Delete
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
              </a>
            </div>
          </div>
    
    </div>
     <div className="mx-auto grid overflow-flex border rounded-lg w-1/2">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 flex ">
          {bookItems}
        </div>
      </div>
     
        <Footer messenger={"© 2025 TAMX — สวัสดีครับ ชาวโลก 😜"}/>
        </>
    );

}

