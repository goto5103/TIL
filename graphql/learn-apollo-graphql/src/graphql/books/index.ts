import { gql } from "apollo-server";
import { Resolvers } from "../types/generated/graphql";

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  extend type Query {
    books: [Book]
  }
`;

export const resolvers: Resolvers = {
  Query: {
    books: () => books,
  },
};

/**
 * booksのデータ
 * テスト用なのでコード上に定義
 * データソースの指定は↓を参照
 * https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
export const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
// クエリ例
// query {
//   books{
//     title
//     author
//   }
// }
