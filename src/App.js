import React from 'react';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
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

// function useQueryString() {
//   return queryString.parse(useLocation().search);
// }

// function App() {
//   return (
//     <div>
//       <Global styles={globalStyles} />
//       <Switch>
//         <Route path="/search">
//           <Search query={useQueryString().q} />
//         </Route>
//         <Route path="/post">
//           <Post />
//         </Route>
//         <Route exact path="/">
//           <Redirect to="/search" />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ignore = false;
    this.controller = new AbortController();
    this.state = {
      searchQuery: "",
      repos: [],
      loading: false,
      error: false
    };
  }

  componentWillUnmount() {
    this.controller.abort();
    this.ignore = true;
  }

  handleSubmitSearchQuery = async (e) => {
    e.preventDefault();

    let responseBody = {};
      this.setState({
        loading: true
      });
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${this.state.searchQuery}&sort=stars`,
          { signal: this.controller.signal }
        );
        responseBody = await response.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request aborted");
        } else {
          this.setState({
            error: true
          });
          console.log(e);
        }
      }

      if (!this.ignore) {
        this.setState({
          error: false,
          loading: false,
          repos: responseBody.items
        });
      } else {
        console.log("== ignoring results");
      }
  }

  handleChangeSearchQuery = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    this.setState({
      searchQuery: value
    });
  }
  
  render(props) {
    return (
      <div>
        <Global styles={globalStyles} />
        <Switch>
          <Route path="/search">
            <Search
              error={this.state.error}
              loading={this.state.loading}
              repos={this.state.repos}
              searchQuery={this.state.searchQuery}
              changeSearchQuery={this.handleChangeSearchQuery} 
              submitSearchQuery={this.handleSubmitSearchQuery}/>
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
}

export default App;
