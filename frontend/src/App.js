// app.js
import React, { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/quotes')
      .then(response => response.json())
      .then(data => setQuotes(data));
  }, []);

  const filteredQuotes = quotes.filter(quote => 
    quote.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', color: 'white', height: '100vh', width: '100vw' }}>
      <input 
        type="text" 
        placeholder="Search by author" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        style={{ marginBottom: '20px' }}
      />
      {filteredQuotes.map((quote, index) => (
        <p key={index} style={{ textAlign: 'center' }}>
          <strong>{index + 1}. {quote.text}</strong> - <span style={{ fontWeight: 'bold' }}>{quote.author}</span>
        </p>
      ))}
    </div>
  );
}

export default App;