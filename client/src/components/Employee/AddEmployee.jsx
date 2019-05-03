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
            managerName:"",
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getManagerNames = this.getManagerNames.bind(this);
    }

    handleSubmit = (e) => {
        this.setState({loading: true});
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              this.props.addEmployee({
                  variables: {
                      employeeId: parseInt(this.state.id),
                      name: this.state.name 
                    },
                    refetchQueries: [{ query: getAllEmployees }]
                })
                .then(employee => {
                    console.log(employee.data.addEmployee.name);
                })
                .catch(error => {
                    alert(error.graphQLErrors[0].message);
                });
                this.setState({loading: false});
            }
          else{          
            this.setState({loading: false});
          }
        });
      }

      getManagerNames(){
        const { getAllEmployees } = this.props;
        const { Option }  = Select;
        if(getAllEmployees.loading){
            console.log('loading...')
        }else{
            return getAllEmployees.employees.map(employee => {
                return <Option key= {employee._id} value={employee._id}>{employee.name}</Option>
            }); 
        }
    }

    handleSnackbar

      

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
                        afterClose={this.handleClose}
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
                            onChange = {e => this.setState({managerName: e})}
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



