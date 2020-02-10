import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';

import { Input, Button } from '../components/FormComponents';
import Spinner from '../components/Spinner';

function Search({ query }) {
  const [ inputQuery, setInputQuery ] = useState(query || "");
  const [ repos, setRepos ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (query) {
      let ignore = false;
      const controller = new AbortController();

      async function fetchSearchResults() {
        let responseBody = {};
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.github.com/search/repositories?q=${query}&sort=stars`,
            { signal: controller.signal }
          );
          responseBody = await response.json();
        } catch (e) {
          if (e instanceof DOMException) {
            console.log("== HTTP request aborted");
          } else {
            throw e;
          }
        }

        if (!ignore) {
          setLoading(false);
          setRepos(responseBody.items);
        } else {
          console.log("== ignoring results");
        }
        // console.log("== response body:", responseBody);
      }

      fetchSearchResults();
      return () => {
        controller.abort();
        ignore = true;
      };
    }
  }, [ query ]);

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        history.push(`?q=${inputQuery}`);
      }}>
        <Input
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      {loading ? (
        <Spinner />
      ) :
        <ul>
          {repos.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url}>{repo.full_name}</a>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default Search;
