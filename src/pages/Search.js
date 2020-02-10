import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Input, Button } from '../components/FormComponents';

function Search({ query }) {
  const [ inputQuery, setInputQuery ] = useState(query || "");
  const history = useHistory();

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        history.push(`?q=${inputQuery}`);
      }}>
        <Input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
        <Button type="submit">Search</Button>
      </form>
      <h2>Search query: {query}</h2>
    </div>
  );
}

export default Search;
