import express from "express"
import { graphqlHTTP } from 'express-graphql';
import {schema} from './Schema/schema.js'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
})) //middleware for graphql 

app.listen(3131, () => {
    console.log('listening from port: 3131',  'http://localhost:3131/graphql');
})