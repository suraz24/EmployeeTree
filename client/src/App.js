import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';


//css from antd library
import 'antd/dist/antd.css';
//css for tree
import 'react-tree-graph/dist/style.css'


//apollo client setup
const client = new ApolloClient({
  uri:process.env.REACT_APP_SERVER_URL,
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <div className="upper-container">
          <EmployeeList />
        </div>
        <div className="lower-container">
          <AddEmployee />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
