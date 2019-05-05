import React, { Component } from 'react';
import {
    Form, Input, Button, Select, Alert,
  } from 'antd';

import { graphql, compose } from 'react-apollo';
import {getAllEmployees, addEmployee} from '../../queries/employeeQuery';
  

class AddEmployee extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: "",
            name: "",
            managerId:0,
            loading: false,
            alertVisible: false,
            alertVariant: '',
            alertMessage: ''
        }
    }

    handleSubmit = (e) => {
        this.setState({loading: true});
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              this.props.addEmployee({
                  variables: {
                      employeeId: parseInt(this.state.id),
                      name: this.state.name ,
                      managerId: parseInt(this.state.managerId) !== 0 ? parseInt(this.state.managerId) : null,
                    },
                    refetchQueries: [{ query: getAllEmployees }]
                })
                .then(res => {
                    this.setState({
                        alertVisible: true,
                        alertVariant: 'success',
                        alertMessage: `Employee with employeeId: ${res.data.addEmployee.employeeId} and name: ${res.data.addEmployee.name} was successfully created!`
                    });
                })
                .catch(error => {
                    this.setState({
                        alertVisible: true,
                        alertVariant: 'error',
                        alertMessage: error.graphQLErrors[0].message
                    });
                });
                this.setState({loading: false});
            }
          else{          
            this.setState({loading: false});
          }
        });
      }

      getManagerNames = () => {
        const { getAllEmployees } = this.props;
        const { Option }  = Select;
        if(getAllEmployees.loading){
            console.log('loading...')
        }else{
            if(getAllEmployees.employees == null || getAllEmployees.employees == undefined){
                return null;
            }
            return getAllEmployees.employees.map(employee => {
                return <Option key= {employee.employeeId} value={employee.employeeId}>{employee.name}</Option>
            }); 
        }
    }

    handleAlertClose = () =>{
        this.setState({
            alertVisible: false,
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { Option }  = Select;
        return(
            <div>
                  {
                    this.state.alertVisible ? (
                      <Alert
                        message={this.state.alertMessage}
                        type={this.state.alertVariant}
                        closable
                        afterClose={this.handleAlertClose}
                      />
                    ) : null
                  }

                <Form onSubmit={this.handleSubmit} className="addEmployeeForm">
                    <Form.Item>
                    {getFieldDecorator('empId', {
                        rules: [{ required: true, message: 'Please input employee id' }],
                    })(
                        <Input style={{ width: 400 }} addonBefore="Employee ID" onChange = {e => this.setState({id: e.target.value})} />
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('empName', {
                        rules: [{ required: true, message: 'Please input employee name' }],
                    })(
                        <Input style={{ width: 400 }} addonBefore="Employee Name" onChange = {e => this.setState({name: e.target.value})} />
                    )}
                    </Form.Item>
                        <Select
                            showSearch
                            style={{ width: 400 }}
                            placeholder="Select a manager"
                            optionFilterProp="children"
                            loading = {this.state.selectLoading}
                            onChange = {e => {this.setState({managerId: e})}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >   
                            <Option key={0} value="No Manager">No Manager</Option>
                            {this.getManagerNames()}
                        </Select>
                    <Form.Item>

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}> 
                            Add Employee
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        );
    }

}


export default compose(
    graphql(getAllEmployees, {name: "getAllEmployees"}),
    graphql(addEmployee, {name: "addEmployee"}),
)(Form.create({name: 'add_employee'})(AddEmployee));



