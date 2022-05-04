# GraphQL Apolloの個人学習用


[GraphQL公式ページ](https://graphql.org/)  
[Apollo公式ページ](https://www.apollographql.com/)  

その他参考  
https://medium.com/paypal-tech/graphql-resolvers-best-practices-cd36fdbcef55

## Usage
1. パッケージインストール  
   `npm i`
1. Apploサーバー実行  
   `npm run start`

## 学習ノート
### **GraphQL**
>*GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.*

訳
>GraphQLは、APIのためのクエリ言語であり、既存のデータを使ってそのクエリを実行するためのランタイムです。GraphQLは、API内のデータを完全かつ理解しやすい形で提供し、クライアントが必要なものだけを要求する力を与え、時間をかけてAPIを進化させることを容易にし、強力な開発ツールを実現します。

GraphQLはFacebookが2015年に発表したAPIのクエリ言語。  
データ用に定義した型システムを使用し、クエリを実行するためのサーバー側ランタイム。  
特定のデータベースやストレージエンジンに関連付けられていない。

#### 特徴
- 単一のエンドポイント
- 型がある
- 一度のリクエストで必要な情報が得られる（複数のクエリでも）
#### REST APIとの違い
- エンドポイントを複数用意する必要がない
- 必要なデータだけを指定して取得することができる（過剰だったり、過少でリクエストが増えることがない）
- エンドポイントにバージョンが存在しない

### 用語
#### **Schema** 
GraphQLスキーマは、クライアントがデータグラフに対して読み書きできるデータの種類を定義する。  

スキーマ定義例
```
type Book {
    id: ID!
    name: String
    pageCount: Int
    author: Author
}
type Author {
    id: ID!
    firstName: String
    lastName: String
}
```



#### **Type System**
スカラー型、列挙型、オブジェクト型がある。  
- スカラー型  （scalar types）  
具体的なデータを示す。末端。用意された型以外にカスタムスカラータイプを定義することも可能。  


  - String：UTF-8 文字シーケンス
  - Int：符号付き32ビット整数
  - Float：符号付き倍精度浮動小数点値
  - Boolean：論理値
  - ID：一意の識別子 (一意なString)

- 列挙型（Enumeration types）  
  許容された特定の値セットのみに制限されたスカラー型。  
  許可された値であることが検証可能になる。

  例
  ```
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }
  ```


- オブジェクト型（Object types）  
1つ以上のスキーマで定義されているフィールドの集合。

  例
  ```
  type Character {
    name: String!
    appearsIn: [Episode!]!
  }
  ```
  "[Episode!]!"はEpisodeオブジェクトの配列。
  配列がnull許容ではないため、appearsInには常に配列をできる。
  Episodeもnull許容ではないため、配列の項目すべてがEpisodeオブジェクトであることが期待できる。

- 修飾子
  - 配列
    []で囲うと、そのフィールドはその型のリストになる。

  - 非Null  
    !付きのフィールドはnull許容でないことを表す。  
    null値が取得された場合、GraphQLサーバーはエラーをクライアントに返す。  
    フィールドの引数を定義する場合にも使用可能。
    
    例
    ```
    query DroidById($id: ID!) {
      droid(id: $id) {
        name
      }
    }
    ```

    リストにも機能する。  
    下記の例の場合、リスト自体はNullが許容されるが、中身にNullを含むことは許容できないことを表す。
    
    例
    ```
    myField ：[String!] 

    ```

- 引数  
  GraphQLオブジェクト型の全てのフィールドには、0個以上の引数を含めることができる。  
  GraphQLの引数はすべて名前が付けられる。  
  引数がオプションの場合、デフォルト値を定義できる。

  例
  ```
  type Starship {
    id: ID!
    name: String!
    length(unit: LengthUnit = METER): Float
  }
  ```
#### **クエリ**
GraphQLサーバーに対してリクエストをする。
GraphQLではルート型と呼ばれる、データソースに対する操作を表現する型で始まる。  
QueryとMutationの2つの特別な型を使用する。

|操作|ルート型|SQL|
|-|-|-|
|取得|Query|SELECT|
|登録|Mutation|INSERT|
|更新|Mutation|UPDATE|
|削除|Mutation|DELETE|
|更新の監視|Subscription|-|

- Query  
  下記の例では3つのクエリを定義している。
  1. launchesは、Launchの全ての配列を返す。
  1. launchは、引数のidに合致するLaunchを返す。
  1. meは、ユーザーの詳細を返す。
  
  ```
  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    me: User
  }
  ```
- Mutation  
  下記の例では3つのクエリを定義している。
  1. bookTripsにより、ログインユーザーは1つ以上のlaunchIdsを提供する。
  1. cancelTripにより、ログインしたユーザーは予約済みの旅行をキャンセルできる。
  1. loginにより、メールアドレスを提供する。
  ```
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User
  }
  ```
#### **Resolver**
スキーマ内のタイプまたはフィールドの値を解決する関数。   
文字列、数値、真偽値、オブジェクトなどのオブジェクト、スカラーを返すことができる。  
GraphQLサーバーにはデフォルトのリゾルバが組み込まれており、特定のフィールドにリゾルバーを定義しない場合、デフォルトのリゾルバが使用される。

例
```
# ルートクエリタイプの2つのフィールドにリゾルバを定義して数値を返すようにする
type Query {
  numberSix: Int! 
  numberSeven: Int! 
}

const resolvers = {
  Query: {
    numberSix() {
      return 6;
    },
    numberSeven() {
      return 7;
    }
  }
};
```

### Apollo
>Apollo is the industry-standard GraphQL implementation, providing the data graph layer that connects modern apps to the cloud.

訳
>Apolloは業界標準のGraphQL実装であり、最新のアプリをクラウドに接続するデータグラフレイヤーを提供します。

---
読む
https://graphql.org/learn/introspection/
https://lightbulbcat.hatenablog.com/entry/2018/02/17/174623
https://uncle-javascript.com/graphql-codegen-japan-user-group
https://www.graphql-code-generator.com/docs/getting-started/codegen-config

疑問
extend typeとは