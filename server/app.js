const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const {mongoURL} = require('./config/keys')
const app = express();


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

mongoose.connect(mongoURL)
        .then(
            app.listen(4000, () => {
                console.log('App running on port 4000');
            })
        )
        .catch(err => {
            console.log(err);
        });

