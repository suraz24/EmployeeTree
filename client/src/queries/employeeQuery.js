import { gql } from 'apollo-boost';

const getAllEmployees = gql `
    {
        employees{
            id
            name
            manager{
                id
                name
                employees{
                    id
                    name
                }
            }
        }
    }
`

const addEmployee = gql`
mutation($id:Int!, $name:String!){
    addEmployee(id:$id name:$name) {
        name
        id
    }
}
`

export {
    getAllEmployees, addEmployee
};
