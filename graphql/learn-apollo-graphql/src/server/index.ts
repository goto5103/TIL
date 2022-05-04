// 公式チュートリアル https://apollographql-jp.com/tutorial/introduction/
// getting start https://www.apollographql.com/docs/apollo-server/getting-started/

import { ApolloServer, gql } from "apollo-server";
import { schema } from "../graphql/schema";
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
});

// The `listen` method launches a web server.
// サーバーが起動される。デフォルトはhttp://localhost:4000/
// ここでクエリを実行できる。
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
