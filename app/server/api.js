import express from 'express';

const app = express();
const port = 3001;

let books = [
  { id: '1', title: '1984 Destroyer', author: 'TAMXza007' },
  { id: '2', title: 'How To Kill Chicken', author: 'TAMXeatDog' },
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: String(books.length + 1), title, author };
    books.push(newBook);
    res.status(201).json(newBook);


    console.log(`Received book: ${title} by ${author}`);
  res.json({ message: 'Data received successfully' });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});