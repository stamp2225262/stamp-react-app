import { useState } from "react";
export default function AddBook(){
    const [inputTitle, setInputTitle] = useState("");
    const [inputAuthor, setInputAuthor] = useState("");

    const handleSubmit = (e) => {
       alert(`Book added: ${inputTitle} by ${inputAuthor}`);
    };

    return(
        <div>
            <h1>Add a New Book</h1>
            <form onSubmit={handleSubmit}>
                <p>Title:</p>
                <input type="text" placeholder="Title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
                <p>Author:</p>
                <input type="text" placeholder="Author" value={inputAuthor} onChange={(e) => setInputAuthor(e.target.value)} />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}