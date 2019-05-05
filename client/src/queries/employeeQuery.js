import { gql } from 'apollo-boost';

const getAllEmployees = gql `
    {
        employees{
            _id
            employeeId
            name
            managerId
        }
    }
`

const getEmployeeById = gql `
   query($id:ID){
        employee(_id: $id){
            _id
            employeeId
            name
            managerId
        }
    }
`

const addEmployee = gql`
mutation($employeeId:Int!, $name:String!, $managerId:Int){
    addEmployee(employeeId:$employeeId name:$name managerId: $managerId) {
        _id
        name
        employeeId
    }
}
`

export {
    getAllEmployees, getEmployeeById, addEmployee
};
