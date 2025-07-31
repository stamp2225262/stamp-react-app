export default function Hearder({messenger} : {messenger:any}){
    return(
        
    <h1 className="m-5 text-3xl text-white text-center rounded-lg shadow-lg py-4 px-6 max-w-md mx-auto rounded-full text-white text-sm tracking-wider font-medium border-0 outline-0 outline-none bg-[#333] hover:bg-[#222] active:-[#333]">
        {messenger}</h1>
    
     
    );
}