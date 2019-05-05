import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Spin, Icon, Alert } from 'antd';
import { stratify, hierarchy  } from 'd3';
import Tree from 'react-tree-graph';
import { getAllEmployees } from '../../queries/employeeQuery';

class EmployeeList extends Component{

    createTree = data => {
        // convert the flat data into a hierarchy
        var tree = stratify()
        .id(function(d) { return d.employeeId; })
        .parentId(function(v) { return v.managerId; })
        
        var treeData = tree(data);
 
        // assign the name to each node
        treeData.each(function(d) {
            d.name = d.data.name;
        });

        var root = hierarchy(treeData, function(d){
            return d.children;
        })
        return root;
    }    

    displayEmployees = () => {
        var data = this.props.data;
        const antIcon = <Icon type="loading" style={{ fontSize: 36 }} spin />;

        if(data.loading){
            return(<Spin indicator={antIcon} />)
        } else {
            if(data.employees !== null || data.employees !== undefined){
                var treeData = this.createTree(data.employees);
                return (
                    <Tree
                        data={treeData.data}
                        height={500}
                        width={800}
                        animated={true}
                        nodeRadius={10}
                        nodeOffset={5}
                        svgProps={{
                            className: 'custom'
                        }}
                        />
                    );
                }
            else{
                return(<Alert
                    showIcon
                    message='Error'
                    description='Something went wrong while fetching the data'
                    type='error'
                  />);
            }
            
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