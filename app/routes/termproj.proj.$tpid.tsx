import { MyTermProj } from "./data/Termproject";
import { useParams } from "@remix-run/react";

export default function ProjView() {
    const {tpid} = useParams();

    const tpTmp = MyTermProj.filter((item) => { return item.tpId === Number(tpid)}).map((tpObj , index) =>
        <>
        <p>รายละเอียดหนังสือ: {tpObj.tpId} </p>
        <p>รายละเอียดวิชา:    {tpObj.tpSubject} </p>
        <p>รายละเอียด:       {tpObj.tpDesc} </p>
        <p>ปกหนังสือ:        {tpObj.tpCover} </p>
        <p>ลิงค์:           {tpObj.tpUrl} </p>
        <p>กลุ่ม:            {tpObj.tpTeam} </p>

        </>
        );

        
        if(tpTmp.length === 0) {
            return <p>ไม่พบข้อมูลโปรเจคที่คุณเลือก</p>;
        }
        return (
            <>
            <div className="m-10 text-3xl text-white text-center shadow-lg mx-auto text-white text-sm tracking-wider font-medium border-0 outline-0 outline-none bg-[#333] hover:bg-[#222] active:-[#333]">
        <h1 className="text-3xl text-white"> คุณเลือกข้อมูลโปรเจค : {tpid}</h1>
        {tpTmp}
        
            <a href="/termproj/projlist" className="bg-indigo-600 text-white w-1/6 mx-auto rounded-sm hover:bg-indigo-700 px-5 py-2 m-10 bottom-0 absolute inset-x-0 bottom-0">Back to List</a>
        </div>
        </>
    );
}