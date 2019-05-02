import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';


//css from antd library
import 'antd/dist/antd.css';


//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <div className="left-container">
          <EmployeeList />
          <AddEmployee />
        </div>
        <div className="right-container">
          <h1>Space to display</h1>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
