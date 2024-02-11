// app.js
import React, { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/quotes')
      .then(response => response.json())
      .then(data => setQuotes(data));
  }, []);

  return (
    <div>
      {quotes.map((quote, index) => (
        <p key={index}>{quote.text} - {quote.author}</p>
      ))}
    </div>
  );
}

export default App;