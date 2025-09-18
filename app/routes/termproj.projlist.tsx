import { Link } from "@remix-run/react";
import { MyTermProj } from "./data/Termproject";
export default function Projlist() {
    return (
       <>
            <h1 className="m-5 text-3xl text-white text-center rounded-lg shadow-lg py-4 px-6 max-w-md mx-auto rounded-full text-white text-sm tracking-wider font-medium border-0 outline-0 outline-none bg-[#333] hover:bg-[#222] active:-[#333]">
                Book List</h1>

                {MyTermProj.map((tpObj, index) => (
                    <div key={index} className="text-white mx-auto text-center m-3 p-3 border-2 border-gray-600 rounded-2xl w-1/2 hover:bg-gray-800 text-font-bold">
                         โปรเจควิชา {tpObj.tpSubject} 
                         <Link to={`/termproj/proj/${tpObj.tpId}`} className="text-yellow-400 hover:underline"> View </Link>
                    </div>
                ))}
            </>
    );
}


                
        



