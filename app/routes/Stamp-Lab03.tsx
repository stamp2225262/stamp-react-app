import Profile from "./components/Profile";
import Contact from "./components/Contact";

export default function MyProflie() {
    return(
        <>
        <Profile />
        <h2 className="text-xl text-center text-white rounded-3xl m-5 font-bold ">Contact</h2>
             <div className="flex items-center m-5 w-1/2 mx-auto">
            <div className="grid grid-cols-3 gap-3 mx-auto">
        <Contact 
        label="TAMX" 
        link="https://www.facebook.com/people/%E0%B8%AD%E0%B8%A3%E0%B8%A3%E0%B8%96%E0%B8%9E%E0%B8%A3-%E0%B8%AA%E0%B8%B3%E0%B8%AD%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B8%B4/pfbid02bEiKPqWeWYxjo2mqKiqvtauDV5NWHy3fvsbrWegyjMcdLQVWvFhgmHDtUosb5cjPl/"
        icon="./images/facebook.png"/>

         <Contact 
        label="TAMX" 
        link="https://www.facebook.com/people/%E0%B8%AD%E0%B8%A3%E0%B8%A3%E0%B8%96%E0%B8%9E%E0%B8%A3-%E0%B8%AA%E0%B8%B3%E0%B8%AD%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B8%B4/pfbid02bEiKPqWeWYxjo2mqKiqvtauDV5NWHy3fvsbrWegyjMcdLQVWvFhgmHDtUosb5cjPl/"
        icon="./images/instagram.png"/>

         <Contact 
        label="TAMX" 
        link="https://www.facebook.com/people/%E0%B8%AD%E0%B8%A3%E0%B8%A3%E0%B8%96%E0%B8%9E%E0%B8%A3-%E0%B8%AA%E0%B8%B3%E0%B8%AD%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B8%B4/pfbid02bEiKPqWeWYxjo2mqKiqvtauDV5NWHy3fvsbrWegyjMcdLQVWvFhgmHDtUosb5cjPl/"
        icon="./images/twitch.png"/>
             </div>
            </div>
        <div className = "ps-5 m-5 pe-5 pt-3 pb-3 bg-blue-300 rounded-2xl text-center w-20 mx-auto px-6 py-2.5 rounded-full cursor-pointer text-white text-sm tracking-wider font-medium border-0 outline-0 outline-none bg-[#333] hover:bg-[#222] active:-[#333]">
            <a href ="http://localhost:5173/">Back </a>
        </div>
        </>
    
    )
}