import { makeExecutableSchema, IResolvers } from "graphql-tools";
import * as books from "./books";
import * as numbers from "./numbers";
import { merge } from "lodash";
import * as users from "./users";
import { gql } from "apollo-server";

// 全てextend typeとするとエラーになるため、ダミー定義が必要
export const typeDefs = gql`
  type Query {
    _dummy: Boolean
  }
  type Mutation {
    _dummy: Boolean
  }
`;

export const schema = makeExecutableSchema({
  resolvers: merge(
    books.resolvers,
    numbers.resolvers,
    users.resolvers
  ) as IResolvers,
  typeDefs: [typeDefs, books.typeDefs, numbers.typeDefs, users.typeDefs],
});

console.log(merge({}, books.resolvers, numbers.resolvers));
console.log([books.typeDefs, numbers.typeDefs]);
