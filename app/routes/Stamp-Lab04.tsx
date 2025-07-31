import Hearder from "./components/็Header";
import Footer from "./components/Footer";

export default function MyTermProject () {
    const myPage = "TAMX Term Project";
    const myName = "Atthapron Samangyad";
    const myStudID = "026730491003-2";
    const MyTermProj = [ // {} = Object
    
        {
            tpId: 1,
            tpSubject: "Web Technolgy พัฒนาเว็บไซต์ Project",
            tpDesc: "พัฒนาเว็บไซต์ Project",
            tpCover: "/images/projs/Cover_1.png",
            tpUrl: "http://busitlab.rmutto.ac.th/~026730491003-2/GameDokapong/",
            tpTeam: true
        },
        {
            tpId: 1,
            tpSubject: "Web Technolgy พัฒนาเว็บไซต์ PHP",
            tpDesc: "พัฒนาเว็บไซต์ PHP",
            tpCover: "/images/projs/Cover_2.png",
            tpUrl: "http://busitlab.rmutto.ac.th/~026730491003-2/week08_ch071/",
            tpTeam: false
        },
        {
            tpId: 1,
            tpSubject: "Web Technolgy พัฒนาเว็บไซต์ มธร.ตะวันออก",
            tpDesc: "พัฒนาเว็บไซต์ มหาวิทยาลัยราชมงคลตะวันออก",
            tpCover: "/images/projs/Cover_3.png",
            tpUrl: "http://busitlab.rmutto.ac.th/~026730491003-2/week05/ch03_1003_2.html",
            tpTeam: false
        },
    ];
    // const tpSingle = MyTermProj.filter(tpTmp => tpTmp.tpTeam === true);

    const TermProj = MyTermProj.map((tpObj , index) =>
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
        <a href={tpObj.tpUrl} className="bg-indigo-600 text-white rounded-sm hover:bg-indigo-700 px-10 py-2">Preview</a>
        </div>
        </div>

    );

    return (
        <>
         <Hearder messenger={myPage}/>
         <p className="text-xl m-3 text-center">
            Name: {myName} Student ID: {myStudID}
         </p>
        
    <div className="w-1/2 grid mx-auto h-100 overflow-auto rounded-2xl border border-gray-300 m-5">
     {TermProj}
    </div>
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