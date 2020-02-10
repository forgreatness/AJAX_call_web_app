import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import queryString from 'query-string';

import Search from './pages/Search';
import Post from './pages/Post';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400&display=swap');
  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 300;
  }
`;

function useQueryString() {
  return queryString.parse(useLocation().search);
}

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <Switch>
        <Route path="/search">
          <Search query={useQueryString().q} />
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
