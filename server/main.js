const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');
const {mongoURL} = require('./config/keys')

const app = express();

//allow cross-origin request
app.use(cors());

//setup express-graphql middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

var PORT = process.env.port || 8081;
//connect to mongodb database using mongoose
mongoose.connect(mongoURL)
        .then(
            app.listen(PORT, () => {
                console.log(`App running on port${PORT}`);
            })
        )
        .catch(err => {
            console.log(err);
        });

