import { gql } from "apollo-server";
import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from "../types/generated/graphql";

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    firstName: String
    lastName: String
  }
  extend type Query {
    users: [User]
    user(id: String!): User
  }
  extend type Mutation {
    createUser(email: String, firstName: String, lastName: String): User
    updateUser(input: UpdateUserInput): User
  }
  input UpdateUserInput {
    email: String!
  }
`;

/**
 * ユーザークエリのためのリゾルバ
 */
const Query: QueryResolvers = {
  users: async () => [
    {
      id: "A1",
      email: "hoge@example.com",
      firstName: "hoge",
      lastName: "fuga",
    },
  ],
  user: async (_, __, { id }) => {
    console.log(id);
    return {
      id: "B1",
      email: "hoge@example.com",
      firstName: "hoge",
      lastName: "fuga",
    };
  },
};

/**
 * ユーザーミューテーションのためのリゾルバ
 */
const Mutation: MutationResolvers = {
  createUser: async (
    _parent,
    { email, firstName, lastName }, //ここに受け取った値が入ってくる
    _context,
    _info
  ) => {
    console.log(_parent);
    console.log(`email${email}`);
    console.log(`firstName${firstName}`);
    console.log(`lastName${lastName}`);
    console.log(_context);
    console.log(_info);
    return {
      id: "A1",
      email,
      firstName,
      lastName,
    };
  },
  updateUser: async (_parent, { input }, _context) => {
    return {
      id: "A1",
      email: input.email,
    };
  },
};
// ユーザーの最終的なリゾルバ
export const resolvers: Resolvers = {
  Query,
  Mutation,
};

// クエリ例
// query {
//   user(id:"a"){
//     id
//   }
// }
// mutation{
//   createUser(email:"aa"){
//     id,email
//   }
// }
