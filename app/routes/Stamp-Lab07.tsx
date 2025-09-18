/*
  MyTermProject_commented.jsx
  เวอร์ชัน: คอมเมนต์ละเอียดสำหรับผู้เริ่มต้น (ภาษาไทย)
  - โค้ดต้นฉบับของคุณถูกคงไว้ แต่ผมเพิ่มคอมเมนต์อย่างละเอียดทุกส่วน
  - อ่านคอมเมนต์ทีละบรรทัดเพื่อเข้าใจการทำงานของ React, useState และ useEffect
  - หมายเหตุ/ข้อเสนอแนะจะอยู่ในคอมเมนต์ (ไม่เปลี่ยนพฤติกรรมของโค้ดเดิม)
*/

// ====================== นำเข้าโมดูล / components ======================
import Hearder from "./components/็Header"; // นำเข้า Header component (ชื่อไฟล์มีตัวสะกดพิเศษตามต้นฉบับ)
import Footer from "./components/Footer";    // นำเข้า Footer component
import { useEffect, useState } from "react"; // นำเข้า React Hooks สองตัว: useState และ useEffect
import handleRequest from "~/entry.server";  // นำเข้าจาก server (ในโค้ดนี้ยังไม่ได้ใช้งาน แต่เก็บไว้ตามต้นฉบับ)
import Index from "./_index";                // นำเข้า Index (ยังไม่ได้ใช้งาน)

// ====================== Component หลัก ======================
export default function MyTermProject () {
  // ---------- useState ----------
  // useState คือวิธีประกาศตัวแปรที่ React จะติดตาม เมื่อเราเปลี่ยนค่าด้วย setXXX React จะ re-render ใหม่
  // เราเก็บข้อมูล "book" เป็น object ที่แทนค่าฟอร์ม (หนังสือที่กำลังกรอกอยู่)
  const [book , setBook] = useState({
      bookTitle: "Webprogramming",    // ค่าเริ่มต้น: ชื่อหนังสือ
      bookDesc: "React & Tailwind CSS", // ค่าเริ่มต้น: รายละเอียด
      bookPrice: 199,                   // ค่าเริ่มต้น: ราคา (ตัวอย่างเป็นตัวเลข)
      bookAuthor: "TAMX",             // ค่าเริ่มต้น: ผู้แต่ง
      bookCover: "/images/cover.jpg"   // ค่าเริ่มต้น: ลิงก์รูปปก
  });

  // nextId ใช้เป็นตัวนับเพื่อกำหนด id ให้แต่ละหนังสือที่เพิ่มเข้ามา
  const [nextId, setNextId] = useState(1); // เริ่มที่ 1 (ถ้าต้องการเริ่มที่ 0 ให้เปลี่ยนตรงนี้)

  // books คือ array ของหนังสือทั้งหมดที่เพิ่มเข้ามา
  const [books, setBooks] = useState([]); // เริ่มเป็น array ว่าง

  // bookId เก็บ id ของหนังสือที่กำลังแก้ไข (ถ้าเป็น 0 หมายถึงยังไม่อยู่ในโหมดแก้ไข)
  const [bookId , setBookId] = useState(0);

  // count เก็บจำนวนหนังสือ (สะดวกสำหรับแสดงบน Dashboard)
  const [count , setCount] = useState(0);

  // ---------- useEffect ----------
  // useEffect ใช้ทำงาน "ข้างเคียง" (side effect) เช่น อัพเดทค่า, ดึงข้อมูลจาก server, ลง log ฯลฯ
  // ในที่นี้เราต้องการให้นับจำนวนหนังสือทุกครั้งที่ length ของ books เปลี่ยน
  useEffect(() => {
      // เมื่อ books.length เปลี่ยน ให้ตั้งค่า count ใหม่ตามจำนวน element ของ books
      setCount(books.length);
  },[books.length]);
  // หมายเหตุ: ใช้ [books.length] เป็น dependency เพื่อให้ effect รันเมื่อจำนวนเปลี่ยน
  // ถ้าใส่ [books] ก็จะทริกเกอร์เมื่อออบเจกต์ array เปลี่ยน (มักเพียงพอทั้งคู่)


  // -------------------- ข้อมูลนักศึกษา (แสดงเฉยๆ) --------------------
  const myPage = "TAMX Term Project";
  const myName = "Atthapron Samangyad";
  const myStudID = "026730491003-2";

  // -------------------- ฟังก์ชันลบหนังสือ --------------------
  // bookId ที่ส่งเข้ามาคือ id ของหนังสือที่ต้องการลบ
  const deleteBook = (bookId) => {
    // filter จะวนดูทุก element ใน books และคืน array ใหม่ที่ไม่ประกอบด้วย element ที่ id ตรงกับ bookId
    setBooks(
      books.filter((bTmp,Index) =>
        bTmp.id !== bookId
     )
    );
    // หมายเหตุ: setBooks จะเปลี่ยน state และทำให้ component render ใหม่อัตโนมัติ
  }

  // -------------------- ฟังก์ชันแก้ไข (โหลดข้อมูลลงฟอร์ม) --------------------
  const editBook = (bookId) => {
    // หา element ที่ id ตรงกับ bookId (filter คืน array ดังนั้นต้องเรียก [0] เพื่อเอา object แรก)
    const bookTmp = books.filter(bTmp => 
      bTmp.id === bookId
    )

    // ถ้าเจอหนังสือ จะนำ object นั้นไปใส่ใน state book เพื่อให้ข้อมูลแสดงในฟอร์ม
    // (ข้อควรระวัง: ถ้าไม่เจอ จะได้ undefined ดังนั้นควรเช็คความถูกต้องก่อนใช้งานจริง)
    setBook(bookTmp[0]);
    // เก็บ id ที่กำลังแก้ไขไว้ใน bookId เพื่อให้รู้ว่าเมื่อกดอัพเดท ควรจับกับ id ไหน
    setBookId(bookId);

    // NOTE: ตอนที่แสดงในฟอร์ม ค่าที่แสดงจะเป็นค่าจาก state book ที่เรา set ไว้ข้างบน
  }

  // -------------------- ฟังก์ชันจัดการการเปลี่ยนค่าในฟอร์ม --------------------
  // ทุก ๆ input ในฟอร์มจะเรียกฟังก์ชันเหล่านี้ผ่าน onChange เพื่ออัพเดท state book
  const handleTitleChange = (e) => {
      // e.target.value คือค่าที่ผู้ใช้พิมพ์เข้ามา (string)
      setBook({
          ...book,                 // ...book = spread operator คัดลอกค่าฟิลด์เดิมทั้งหมดไว้
          bookTitle: e.target.value // แล้วเขียนทับเฉพาะฟิลด์ bookTitle
      });
  }

  const handleDescChange = (e) => {
      setBook({
          ...book,
          bookDesc: e.target.value
      });
  }

  const handlePriceChange = (e) => {
      // ข้อสังเกตสำคัญ: ค่า e.target.value จะเป็น string เสมอ แม้ input เป็นตัวเลข
      // ถ้าต้องการเก็บเป็น Number ให้ใช้ Number(e.target.value) หรือ parseInt
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

  // -------------------- รีเซ็ตฟอร์ม --------------------
  const resetForm = () => {
      // ตั้งค่ากลับเป็นค่าเริ่มต้นที่ว่างเปล่า (เหมาะใช้ตอนต้องการ clear ฟอร์ม)
      setBook({
          bookTitle: "",
          bookDesc: "",
          bookPrice: 0,
          bookAuthor: "",
          bookCover: ""
      });
  }

  // -------------------- เพิ่มหนังสือ --------------------
  const addBook = (e) => {
      // สร้าง array ใหม่ที่ประกอบด้วยข้อมูลเดิม (spread ...books) แล้วต่อด้วย object ใหม่
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

      // เพิ่มค่า nextId ทีหลัง เพื่อให้เล่มถัดไปมี id ที่ต่างกัน
      setNextId(nextId + 1);

      // หมายเหตุ: setBooks เป็น asynchronous — ถ้าต้องการใช้ค่าที่อัพเดททันที ให้อ้างอิงใน useEffect หรือ callback
  }

  // -------------------- สร้าง JSX สำหรับแสดงรายการหนังสือ (map) --------------------
  // map() จะวนแต่ละ element ใน books และคืน JSX element สำหรับแต่ละหนังสือ
  const bookItems = books.map((bObj, index) => 
    (
      // ใส่ key เพื่อให้ React แยกรายการแต่ละตัวได้ถูกต้อง (ช่วย performance และป้องกัน warning)
      <div key={bObj.id} className="max-w-sm bg-white border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          {/* รูปปก */}
          <a href="#">
              <img className="rounded-t-lg" src={bObj.bookCover} title={bObj.bookTitle} />
          </a>

          <div className="p-5">
              {/* ชื่อหนังสือ */}
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bObj.bookTitle}</h5>
              </a>

              {/* คำอธิบาย */}
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{bObj.bookDesc}</p>

              {/* ราคา */}
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ราคา: {bObj.bookPrice} บาท</p>

              {/* ผู้แต่ง */}
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ผู้แต่ง: {bObj.bookAuthor}</p>

              {/* ปุ่ม Delete: เรียกฟังก์ชัน deleteBook ส่ง id ไปเพื่อจะ filter ออก */}
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-1"
                onClick={(e) => {
                  e.preventDefault(); // ป้องกันลิงก์ # ทำให้หน้าเลื่อนไปบนสุด
                  deleteBook(bObj.id);
                }}>
                [D] Delete
              </a>

              {/* ปุ่ม Edit: จะโหลดข้อมูลขึ้นฟอร์มโดยเรียก editBook */}
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  editBook(bObj.id);
                }}>
                [E] Edit
              </a>
          </div>
        </div>
    )
  );

  // -------------------- อัพเดทหนังสือ --------------------
  const updateBook = () => {
      // แจ้งเตือนว่า update id ไหน (สำหรับการ debug/ทดสอบ)
      alert("Update: " + bookId);

      // map จะวนทุกเล่ม แล้วถ้าเจอเล่มที่ id === bookId ให้แทนที่ข้อมูลด้วยค่าจาก state book
      const bookTmp = books.map(bTmp => 
        bTmp.id === bookId ?
        {
          ...bTmp,
          // ข้อสังเกตสำคัญ: โค้ดต้นฉบับใส่ id: nextId ซึ่งจะเปลี่ยน id ของหนังสือเมื่ออัพเดท
          // ในการใช้งานจริงมักจะไม่เปลี่ยน id ของ object แต่ควรเก็บ id เดิมไว้ (เช่น id: bTmp.id)
          // ผมคงรูปแบบโค้ดต้นฉบับไว้ แต่แนะนำว่าให้เปลี่ยนเป็น id: bTmp.id ถ้าต้องการรักษา id เดิม
          id: nextId,
          bookTitle: book.bookTitle,
          bookDesc: book.bookDesc,
          bookPrice: book.bookPrice,
          bookAuthor: book.bookAuthor,
          bookCover: book.bookCover
        }
        : bTmp
      )

      // อัพเดท state books ด้วย array ใหม่
      setBooks(bookTmp);

      // ล้างฟอร์ม หลังอัพเดทเสร็จ
      resetForm();

      // ออกจากโหมดแก้ไข (ตั้ง bookId กลับเป็น 0)
      setBookId(0);
  }

  // -------------------- Component ย่อย: Dashboard --------------------
  function BookDashboard(){
    // Component นี้คืน JSX ที่แสดงข้อมูลสั้น ๆ เช่น จำนวนหนังสือ
    return (
      <div className="lg:w-1/4 md:w-1/2 sm:w-full grid grid-cols-1 m-4">
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-4 grid grid-cols-2 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800">
          <div>
            {/* ไอคอน */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>

          <div>
            <span className="sr-only">Info</span>
            <div className="text-center">
              {/* แสดงจำนวนหนังสือ (มาจาก state count) */}
              <span className="text-7xl">{count}</span>
            </div>
            <div className="text-center">Number of books</div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------- JSX ที่ถูก Render (UI หลัก) --------------------
  return (
    <>
      {/* Header component — รับ prop messenger เพื่อแสดงข้อความ */}
      <Hearder messenger={myPage}/>

      {/* ข้อมูลนักศึกษา แสดงชื่อและรหัส */}
      <p className="text-xl m-3 text-center">
        Name: {myName} <br /> Student ID: {myStudID}
      </p>

      {/* แสดง Dashboard ตรงกลาง */}
      <div className="mx-auto flex justify-center">
        <BookDashboard/>
      </div>

      {/* ส่วนฟอร์มและ preview: แบ่ง 2 คอลัมน์ (ฟอร์มทางซ้าย, preview ทางขวา) */}
      <div className="w-1/2 grid mx-auto h-100 overflow-hide rounded-2xl border border-gray-300 m-2 flex justify-center grid grid-cols-2 gap-2">

        {/* ==================== ฟอร์ม ==================== */}
        <form className="m-5 pr-20 max-w-sm mx-auto flex-none">
          <a>
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">เพิ่มหนังสือใหม่</h6>
          </a>

          {/* Input: Title */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อหนังสือ (Title)</label>
            <input
              value= {book.bookTitle}
              onChange={handleTitleChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* หมายเหตุ: value มาจาก state book.bookTitle — เป็น binding แบบ controlled component */}
          </div>

          {/* Input: Description */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายละเอียดหนังสือ (Description)</label>
            <input
              value= {book.bookDesc}
              onChange={handleDescChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Input: Price */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ราคาหนังสือ (Price)</label>
            <input
              value= {book.bookPrice}
              onChange={handlePriceChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* ข้อควรระวัง: input ทุกชนิดส่งค่าผ่าน e.target.value เป็น string เสมอ
                ถ้าต้องการเก็บเป็นตัวเลข ให้ทำ Number(e.target.value) หรือ parseInt */}
          </div>

          {/* Input: Author */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อผู้แต่ง (Author)</label>
            <input
              value= {book.bookAuthor}
              onChange={handleAuthorChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Input: Cover (URL หรือ path ของรูป) */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หน้าปกหนังสือ (Cover)</label>
            <input
              value= {book.bookCover}
              onChange={handleCoverChange}
              className="bg-gray-50 border border-gray-300 mx-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* สามารถใส่เป็น path ในโปรเจกต์ เช่น /images/cover.jpg หรือ URL ภายนอก */}
          </div>

          {/* ปุ่มรีเซ็ต: เรียก resetForm เพื่อเคลียร์ฟอร์ม */}
          <button type="button" className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick = {resetForm}>
              รีเซ็ตหนังสือ
          </button>

          {/* ถ้า bookId != 0 แปลว่าอยู่ในโหมดแก้ไข ให้แสดงปุ่มอัพเดท มิฉะนั้นแสดงปุ่มเพิ่ม */}
          {
            bookId !== 0 ?
            <button type="button" className="text-white bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick = {updateBook}>
                อัพเดทหนังสือ
            </button>
            :
            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick = {addBook}>
                เพิ่มหนังสือ
            </button>
          }

        </form>

        {/* ==================== Preview หนังสือ (แสดงค่าที่กำลังพิมพ์) ==================== */}
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
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>

          </div>
        </div>

      </div>

      {/* ส่วนหัวข้อรายการหนังสือ */}
      <div className="bg-red-300 w-100 mx-auto h-100">รายการหนังสือใหม่</div>

      {/* แสดงรายการหนังสือทั้งหมด (grid) */}
      <div className="mx-auto grid overflow-flex border rounded-lg w-1/2">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 flex ">
          {bookItems}
        </div>
      </div>

      {/* Footer */}
      <Footer messenger={"© 2025 TAMX — สวัสดีครับ ชาวโลก 😜"}/>
    </>
  );
}
