import Hearder from "./components/็Header";
import Footer from "./components/Footer";
import { MyTermProj } from "./data/Termproject";
import { useState } from "react";

export default function MyTermProject () {

    const [isTeam , setIsTeam] = useState(null);

    const handleTeam = (isTeam : any) => {
        setIsTeam(isTeam);
    
    }
         
    const myPage = "TAMX Term Project";
    const myName = "Atthapron Samangyad";
    const myStudID = "026730491003-2";
    
     const tpSingle = MyTermProj.filter(tpTmp => { 
        if (isTeam === null)
            return tpTmp.tpTeam === true || tpTmp.tpTeam === false
        else
            return tpTmp.tpTeam === isTeam
    }
    );

     
    // function handleClick () {
    //     alert("คุณเลือกสำเร็จ")
    // }
    


    const handleClick_b = (tpId: any ,ind: any) => {
        
        let myOut = "";
        let myObj = MyTermProj[ind]
        
        myOut += "[ข้อมูลโปรเจค] \n" ;
        myOut += "[รหัต (ID) : ]" + myObj.tpId + "\n";
        myOut += "[รายวิชา (Subject) : ] " + myObj.tpSubject + "\n";
        myOut += "[คำอธิบาย (Desc) : ] " + myObj.tpDesc + "\n";
        myOut += "[หน้าปก (Cover) : ] " + myObj.tpCover + "\n";
        myOut += "[ลิ้งค์ (Url) : ] " + myObj.tpUrl + "\n";
        myOut += "[งานกี่คน (Team) : ] " + myObj.tpTeam + "\n";
        
        myOut += "-- Thank you --"
        alert("คุณเลือกสำเร็จ : "+ myOut + "!")
    }

    const TermProj = tpSingle.map((tpObj , index) =>
        <div className="grid grid-cols-5 mx-auto border-gray-300" key = {index}>
            <div className="w-32 p-1">
        <img src={tpObj.tpCover} className="w-full rounded-full" title={tpObj.tpDesc + "ID : " + tpObj.tpId} />
            </div>
        <div className="p-4 col-span-3 mb-auto">
        <h2 className="text-lg font-semibold text-white-800">{tpObj.tpSubject}</h2>
        <p className="text-gray-600 text-sm mt-2">{tpObj.tpDesc}</p>
        <ItemTeam isTeam = {tpObj.tpTeam}/>
            </div>
        <div className="p-4 mb-auto">
        <a href="#" className="bg-indigo-600 text-white rounded-sm hover:bg-indigo-700 px-10 py-2" onClick={() => handleClick_b(tpObj.tpId,index)}>Preview</a>
        </div>
        </div>

    );

    return (
        <>
         <Hearder messenger={myPage}/>
         <p className="text-xl m-3 text-center">
            Name: {myName} Student ID: {myStudID}
         </p>
    
            <div className="w-1/2 grid mx-auto h-100 overflow-auto rounded-2xl border border-gray-300 m-5 flex justify-center grid grid-cols-3 gap-2">

        <button type="button" className=" text-white bg-gradient-to-rdf from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
         onClick = {() => handleTeam(null)}>
            [A] All 
            </button>
    
        <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick = {() => handleTeam(true)}>
            [T] Team
        </button>
  
        <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick = {() => handleTeam(false)}>
            [S] Single
            </button>

            </div>
     <div className="w-1/2 grid mx-auto h-100 overflow-auto rounded-2xl border border-gray-300 m-5 justify-center">
     {TermProj}
    </div>
    <h3 className="w-1/2 mx-auto rounded-2xl flex justify-center">
        โปรเจคมีจำนวน : {MyTermProj.length} รายการ
    </h3>
        <Footer messenger={"© 2025 TAMX — สวัสดีครับ ชาวโลก 😜"}/>
        </>
    );

}

function ItemTeam ({isTeam}) {
    if(isTeam)
        return <p>
            Group
        </p>;
        return <p>
           UnGroup
        </p>;
}