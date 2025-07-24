export default function Profile() {
    return (
        <div>
            <h1 className="m-5 text-3xl text-white text-center rounded-lg shadow-lg py-4 px-6 max-w-md mx-auto rounded-full text-white text-sm tracking-wider font-medium border-0 outline-0 outline-none bg-[#333] hover:bg-[#222] active:-[#333]">Profile</h1>
        <div className="p-10 bg-zinc-700 rounded-5xl m-10 border-2 border-grey-800">
                <img src="/images/Dragonball_Proflie.jpg" className="rounded-full w-1/6 mx-auto border-4 border-purple-800"/> 
                <h2 className="text-xl text-center text-white rounded-3xl m-5 font-bold ">About Me</h2>
                <p className="font-regular text-xl text-white"> Name : Atthapron Samangyat <br />
                                                     Age : 20 years  <br />
                                                     Nickname : Stamp <br />
                                                     Address : 84/2 Moo 9, Samut Prakan, Thailand <br />
                                                     Hobbies : Playing games and listening to music</p>
        </div>
       
        </div>
    );
}

