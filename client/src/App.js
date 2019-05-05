import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';


//css from antd library
import 'antd/dist/antd.css';


//apollo client setup
const client = new ApolloClient({
  uri:process.env.REACT_APP_SERVER_URL,
});


function App() {
  console.log(process.env.SERVER_URL);
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <div className="upper-container">
          <EmployeeList />
          <h1>Space to display</h1>
        </div>
        <div className="lower-container">
          <AddEmployee />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
