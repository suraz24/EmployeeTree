const graphql = require('graphql');
const Employee = require("../models/employee");
const { EmployeeType } = require("./types");

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull
} = graphql;


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                managerId: { type: GraphQLInt },
            },
            resolve(parentValue, args ){
                let emp = Employee.findOne({id: args.id});
                console.log(emp);
                if(emp != null){
                    let employee = new Employee({
                        id: args.id,
                        name: args.name,
                    managerId: args.managerId
                    });
                    return employee.save({new: true});
                }else{
                    return `A record with id: ${args.id} already exists`;
                }
            }
        },
        deleteEmployee: {
            type: GraphQLString,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue, args ){
                return Employee.deleteOne({id: args.id})
                                .then(res => `Successfully deleted the user with id ${args.id}`)
                                .catch(err => {
                                    console.log(err);
                                    throw err;
                                });
            }
        },
        editEmployee: {
            type: EmployeeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLString },
                managerId: { type: GraphQLInt },
            },
            resolve(parentValue, args ){
                let employee = new Employee({
                    name: args.name,
                    managerId: args.managerId
                });
                return Employee.findOneAndUpdate({id: args.id}, {$set:{name: args.name, managerId: args.managerId}},{new: true, runValidatos: true})
                                .then(res => {
                                    console.log(res);
                                    return res;
                                })
                                .catch(err => {
                                    console.log(err);
                                    return err;
                                });
            }
        }
    }
});

module.exports =  Mutation;