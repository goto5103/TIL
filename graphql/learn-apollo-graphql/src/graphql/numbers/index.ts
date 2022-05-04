import { gql } from "apollo-server";
import { Resolvers } from "../types/generated/graphql";

export const typeDefs = gql`
  extend type Query {
    numberOne: Int!
    numberTwo: Int!
    numberToString(num: Int!): String
  }
`;

export const resolvers: Resolvers = {
  Query: {
    numberOne: () => 1,
    numberTwo: () => 2,
    numberToString: (num: String) => num.toString(),
  },
};

// クエリ例
// query {
//   numberOne
// }
// query {
//   numberToString(num:1)
// }
