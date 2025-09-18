// ------------------------------
// Import Libraries & Components
// ------------------------------

// import Header component จากไฟล์ components (แต่สะกดผิดเป็น Hearder) 
// Header ใช้แสดงข้อความด้านบนของหน้า
import Hearder from "./components/็Header";

// import Footer component จากไฟล์ components
// Footer ใช้แสดงข้อความด้านล่างของหน้า
import Footer from "./components/Footer";

// import useState Hook จาก React
// useState เป็น Hook ที่ใช้สำหรับสร้าง state ภายใน functional component
import { useState } from "react";

// import handleRequest จาก entry.server (ยังไม่ได้ใช้ในโค้ดนี้)
// โดยปกติ handleRequest จะใช้กับ server-side request ใน Remix
import handleRequest from "~/entry.server";

// ------------------------------
// Component หลัก
// ------------------------------

// ประกาศ functional component MyTermProject
// เป็น default export ของไฟล์นี้
export default function MyTermProject () {

    // ------------------------------
    // State สำหรับเก็บข้อมูลหนังสือที่กรอกในฟอร์ม
    // ------------------------------
    // useState คืนค่าเป็น array 2 ค่า:
    // [stateObject, setStateFunction]
    const [book , setBook] = useState({
        bookTitle: "Webprogramming",    // ค่าเริ่มต้นของชื่อหนังสือ
        bookDesc: "React & Tailwind CSS", // ค่าเริ่มต้นของรายละเอียดหนังสือ
        bookPrice: 199,                   // ค่าเริ่มต้นของราคา
        bookAuthor: "TAMX",               // ค่าเริ่มต้นของผู้แต่ง
        bookCover: "/images/cover.jpg"    // path รูปหน้าปกเริ่มต้น
    });

    // ------------------------------
    // State สำหรับเก็บ id ถัดไปของหนังสือ
    // ------------------------------
    // nextId จะใช้เป็น primary key ของแต่ละหนังสือ
    // setNextId ใช้เพิ่มค่า nextId ทุกครั้งที่เพิ่มหนังสือใหม่
    const [nextId, setNextId] = useState(0);

    // ------------------------------
    // State สำหรับเก็บ array ของหนังสือทั้งหมด
    // ------------------------------
    // books เป็น array ที่เก็บ object ของแต่ละหนังสือ
    // setBooks ใช้เพิ่ม ลบ หรือแก้ไข array ของหนังสือ
    const [books, setBooks] = useState([]);
    
    // ------------------------------
    // ข้อมูลนักศึกษา (static text)
    // ------------------------------
    const myPage = "TAMX Term Project";           // ข้อความที่จะส่งไปที่ Header
    const myName = "Atthapron Samangyad";         // ชื่อของนักศึกษา
    const myStudID = "026730491003-2";            // รหัสนักศึกษา
    
    // ------------------------------
    // ฟังก์ชันสำหรับ handle input change
    // ------------------------------
    // ทุกฟังก์ชันนี้จะรับ event e จาก input element
    // แล้วอัพเดทค่า state book โดยใช้ spread operator เพื่อคงค่าที่เหลือ

    const handleTitleChange = (e) => {
        setBook({
            ...book,                // spread เพื่อเก็บค่า field อื่น ๆ ไว้
            bookTitle: e.target.value // อัพเดทเฉพาะค่า bookTitle
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

    // ------------------------------
    // ฟังก์ชัน resetForm
    // ------------------------------
    // รีเซ็ตค่าของ book กลับเป็นค่าที่ว่าง หรือ 0
    const resetForm = () => {
        setBook({
            bookTitle: "",
            bookDesc: "",
            bookPrice: 0,
            bookAuthor: "",
            bookCover: ""
        });
    }

    // ------------------------------
    // ฟังก์ชัน addBook
    // ------------------------------
    // เพิ่มหนังสือใหม่เข้าไปใน books array
    // โดย copy ของเก่าและเพิ่ม object ใหม่
    const addBook = (e) => {
        setBooks([
            ...books, // copy array ของหนังสือเดิม
            {
                id: nextId,             // ใช้ nextId เป็น primary key
                bookTitle: book.bookTitle, // ค่าที่กรอกในฟอร์ม
                bookDesc: book.bookDesc,
                bookPrice: book.bookPrice,
                bookAuthor: book.bookAuthor,
                bookCover: book.bookCover
            }
        ]);
        setNextId(nextId + 1); // เพิ่มค่า nextId สำหรับหนังสือถัดไป
    }

    // ------------------------------
    // สร้าง JSX card สำหรับแต่ละหนังสือใน books
    // ------------------------------
    const bookItems = books.map((bObj, index) => 
        <div 
          key={bObj.id} // key สำคัญสำหรับ React ในการ render list
          className="max-w-sm bg-white border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            
            {/* แสดงรูปปกหนังสือ */}
            <a href="#">
                <img 
                  className="rounded-t-lg"    // Tailwind: ขอบบนโค้งมน
                  src={bObj.bookCover}        // path ของรูปหน้าปก
                  title={bObj.bookTitle}      // tooltip แสดงชื่อหนังสือ
                />
            </a>

            <div className="p-5"> {/* padding รอบ card */}

                {/* แสดงชื่อหนังสือ */}
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {bObj.bookTitle} {/* แสดงชื่อหนังสือ */}
                  </h5>
                </a>

                {/* แสดงรายละเอียด */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{bObj.bookDesc}</p>

                {/* แสดงราคา */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ราคา: {bObj.bookPrice} บาท</p>

                {/* แสดงผู้แต่ง */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ผู้แต่ง: {bObj.bookAuthor}</p>
                
                {/* ปุ่ม Delete (ยังไม่ได้ implement ฟังก์ชันลบ) */}
                <a href="#" 
                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  [D] Delete
                </a>
            </div>
          </div>
    );

    // ------------------------------
    // JSX render ของ component
    // ------------------------------
    return (
        <>
         {/* Header component */}
         <Hearder messenger={myPage}/>
         
         {/* ข้อมูลนักศึกษา */}
         <p className="text-xl m-3 text-center">
            Name: {myName} <br /> Student ID: {myStudID}
         </p>
    
        {/* Layout ฟอร์ม + preview */}
        <div className="w-1/2 grid mx-auto h-100 overflow-hide rounded-2xl border border-gray-300 m-2 flex justify-center grid grid-cols-2 gap-2">

            {/* ฟอร์มกรอกข้อมูลหนังสือ */}
            <form className="m-5 pr-20 max-w-sm mx-auto flex-none">

              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                เพิ่มหนังสือใหม่
              </h6>
              
              {/* Input: Title */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ชื่อหนังสือ (Title)
                </label>
                <input
                  value={book.bookTitle}         // binding กับ state bookTitle
                  onChange={handleTitleChange}   // call function เมื่อค่าเปลี่ยน
                  className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Input: Description */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  รายละเอียดหนังสือ (Description)
                </label>
                <input
                  value={book.bookDesc}
                  onChange={handleDescChange}
                  className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Input: Price */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ราคาหนังสือ (Price)
                </label>
                <input
                  value={book.bookPrice}
                  onChange={handlePriceChange}
                  className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Input: Author */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ชื่อผู้แต่ง (Author)
                </label>
                <input
                  value={book.bookAuthor}
                  onChange={handleAuthorChange}
                  className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Input: Cover */}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  หน้าปกหนังสือ (Cover)
                </label>
                <input
                  value={book.bookCover}
                  onChange={handleCoverChange}
                  className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* ปุ่มเพิ่มหนังสือ */}
              <button type="button"
                onClick={addBook} // เรียกใช้ addBook function
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                เพิ่มหนังสือ
              </button>

              {/* ปุ่มรีเซ็ต */}
              <button type="button"
                onClick={resetForm} // เรียกใช้ resetForm function
                className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                รีเซ็ตหนังสือ
              </button>

            </form>

            {/* Preview card ของหนังสือที่กำลังกรอก */}
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
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </a>
              </div>
            </div>

        </div>

        {/* แสดงรายการหนังสือทั้งหมด */}
        <div className="mx-auto grid overflow-flex border rounded-lg w-1/2">
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 flex ">
            {bookItems} {/* render card ของหนังสือทั้งหมด */}
          </div>
        </div>
     
        {/* Footer component */}
        <Footer messenger={"© 2025 TAMX — สวัสดีครับ ชาวโลก 😜"}/>
        </>
    );

}
