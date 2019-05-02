import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Spin, Icon } from 'antd';




import { getAllEmployees } from '../../queries/employeeQuery';

class EmployeeList extends Component{

    displayEmployees(){
        var data = this.props.data;
        const antIcon = <Icon type="loading" style={{ fontSize: 36 }} spin />;

        if(data.loading){
            return(<Spin indicator={antIcon} />);
        } else {
            return data.employees.map(employee => {
                return (
                    <li key={employee.id}>{employee.name}</li>
                );
            })
        }
    } 

    render(){
        
        return(
            <div>
                <ul id="emp-list">
                {this.displayEmployees()}
                </ul>
            </div>
        )
    }
}

export default graphql(getAllEmployees)(EmployeeList);