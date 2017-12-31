import {graphql, buildSchema} from 'graphql'

const schema = buildSchema(`
scalar Date
scalar URI
interface Node {
    id: ID!
}
interface File {
    name: String!
    createdAt: Date!
    modifiedAt: Date!
}
interface Actor {
    # avatarUrl(size: Int): URI!
    login: String!
    resourcePath: URI!
    url: URI!
}
# User {}
type Note implements Node, File {
    id: ID!
    name: String!
    createdAt: Date!
    modifiedAt: Date!
}
type Query {
    foo (n:Int!) : String
}
type Schema {
    query: Query
}
`);

const resolvers = {
    foo: ({n}) => (`hey: ${n}`),
};

const n = 10;
const query = `
query {
    foo (n:${n})
}`;


graphql(schema, query, resolvers)
    .then((result) => console.log(result))
    .catch((err) => console.warn(err));