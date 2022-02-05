// dotenv
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const app = express();

// Database Connection
const DatabaseConnect = require('./assets/DbConnection');
DatabaseConnect();

const schema = require("./schema/RootQuery")

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
}))

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})