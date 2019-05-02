const graphql = require('graphql');
const Employee = require("../models/employee");
const { EmployeeType } = require("./types");

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                employeeId: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                managerId: { type: GraphQLInt },
            },
            resolve(parentValue, args ){
                    let employee = new Employee({
                        employeeId: args.employeeId,
                        name: args.name,
                        managerId: args.managerId
                    });
                    return employee.save()
                                    .then(result => {
                                        console.log(result);
                                        return { ...result._doc, _id: result._doc._id.toString()};
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        throw err;
                                    });
                
            }
        },
        deleteEmployee: {
            type: GraphQLString,
            args: {
               _id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parentValue, args ){
                return Employee.findByIdAndDelete(args._id)
                                .then(res => `Successfully deleted the user with id ${args._id} and name ${res._doc.name}`)
                                .catch(err => {
                                    console.log(err);
                                    throw err;
                                });
            }
        },
        editEmployee: {
            type: EmployeeType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                managerId: { type: GraphQLInt },
            },
            resolve(parentValue, args ){
                let employee = new Employee({
                    name: args.name,
                    managerId: args.managerId
                });
                return Employee.findByIdAndUpdate(args._id, {$set:{name: args.name, managerId: args.managerId}},{new: true, runValidatos: true})
                                .then(res => {
                                    console.log(res);
                                    return res._doc;
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