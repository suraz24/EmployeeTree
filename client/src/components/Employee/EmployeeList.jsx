import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Spin, Icon } from 'antd';
import _ from 'underscore';
import { json, tree, nest, key, entries } from 'd3';
import Tree from 'react-tree-graph';
import { getAllEmployees } from '../../queries/employeeQuery';

class EmployeeList extends Component{

    displayEmployees = () => {
        var data = this.props.data;
        const antIcon = <Icon type="loading" style={{ fontSize: 36 }} spin />;

        if(data.loading){
            return(<Spin indicator={antIcon} />)
        } else {
            console.log(JSON.stringify(data.employees));
            // json(data.employees, function(emp){
            //     var nodes = tree.nodes(emp);
            //     var links = tree.links(nodes);
            //     console.log(links);  
            // });
            var groupedData = nest()
                .key(function(d) { return d.managerId; })
                 .entries(data.employees);

            console.log(JSON.stringify(groupedData));
            return data.employees.map(employee => {
                return (
                    <li key={employee._id}>{employee.name}</li>
                );
            })
        }
    } 

    render(){
        let data = {
            name: 'Parent',
            children: [{
                name: 'Child One'
            }, {
                name: 'Child Two'
            }]
        };

        return(
            <div>
                <Tree
                    data={data}
                    height={400}
                    width={400}
                    animated={true}
                    nodeRadius={10}
                    nodeOffset={5}
                    />;

                <ul id="emp-list">
                {this.displayEmployees()}
                </ul>
            </div>
        )
    }
}

export default graphql(getAllEmployees)(EmployeeList);