import { gql } from 'apollo-boost';

const getAllEmployees = gql `
    {
        employees{
            _id
            employeeId
            name
            manager{
                employeeId
                name
                employees{
                    employeeId
                    name
                }
            }
        }
    }
`

const addEmployee = gql`
mutation($employeeId:Int!, $name:String!){
    addEmployee(employeeId:$employeeId name:$name) {
        _id
        name
        employeeId
    }
}
`

export {
    getAllEmployees, addEmployee
};
