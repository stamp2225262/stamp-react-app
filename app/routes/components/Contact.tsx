export default function Contact({label,link,icon} : {label:any,link:any,icon:any}){
    return(
        
        <div className="w-16">
        <a href={link}> 
        <img src={icon} className="w-full" 
                         title={label}/>
        </a>
        </div>
    );
}
 