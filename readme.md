# What is GraphQL?
GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

With **GraphQL**, the user is able to make a single call to fetch the required information rather than to construct several REST requests to fetch the same.

GraphQL is  **a syntax that describes how to ask for data**, and is generally used to load data from a server to a client. GraphQL has three main characteristics:
	>   It lets the client specify exactly what data it needs.
	>  It makes it easier to aggregate data from multiple sources.
	>  It uses a type system to describe data.


**Defines a data shape:** The first thing you’ll notice is that GraphQL queries mirror their response. This makes it easy to predict the shape of the data returned from a query, as well as to write a query if you know the data your app needs. More important, this makes GraphQL really easy to learn and use. GraphQL is unapologetically driven by the data requirements of products and of the designers and developers who build them.

**Hierarchical:** Another important aspect of GraphQL is its hierarchical nature. GraphQL naturally follows relationships between objects, where a RESTful service may require multiple round-trips (resource-intensive on mobile networks) or a complex join statement in SQL. This data hierarchy pairs well with graph-structured data stores and ultimately with the hierarchical user interfaces it’s used within.

**Strongly typed:** Each level of a GraphQL query corresponds to a particular type, and each type describes a set of available fields. Similar to SQL, this allows GraphQL to provide descriptive error messages before executing a query.

**Protocol, not storage:** Each GraphQL field on the server is backed by any arbitrary function. GraphQL had to leverage all this existing work to be useful, and so does not dictate or provide any backing storage. Instead, GraphQL takes advantage of your existing code.

**Introspective:** A GraphQL server can be queried for the types it supports. This creates a powerful platform for tools and client software to build atop this information like code generation in statically typed languages, Relay, or IDEs like **GraphiQL** . GraphiQL helps developers learn and explore an API quickly without grepping the codebase or wrangling with cURL.

**Version free:** The shape of the returned data is determined entirely by the client’s query, so servers become simpler and easy to generalize. When you’re adding new product features, additional fields can be added to the server, leaving existing clients unaffected. When you’re sunsetting older features, the corresponding server fields can be deprecated but continue to function. This gradual, backward-compatible process removes the need for an incrementing version number.


# Difference between GraphQL and Rest
## Data Fetching
With a REST API, you would typically gather the data by accessing multiple endpoints. In the example, these could be `/users/<id>` endpoint to fetch the initial user data. Secondly, there’s likely to be a `/users/<id>/posts` endpoint that returns all the posts for a user. The third endpoint will then be the `/users/<id>/followers` that returns a list of followers per user.
In GraphQL on the other hand, you’d simply send a single query to the GraphQL server that includes the concrete data requirements. The server then responds with a JSON object where these requirements are fulfilled.
## No more Over- and Underfetching
One of the most common problems with REST is that of over- and underfetching. This happens because the only way for a client to download data is by hitting endpoints that return _fixed_ data structures. It’s very difficult to design the API in a way that it’s able to provide clients with their exact data needs.
**Overfetching: Downloading superfluous data:** _Overfetching_ means that a client downloads more information than is actually required in the app. Imagine for example a screen that needs to display a list of users only with their names. In a REST API, this app would usually hit the `/users` endpoint and receive a JSON array with user data. This response however might contain more info about the users that are returned, e.g. their birthdays or addresses - information that is useless for the client because it only needs to display the users’ names.
**Underfetching and the n+1 problem:** Another issue is _underfetching_ and the _n+1_-requests problem. Underfetching generally means that a specific endpoint doesn’t provide enough of the required information. The client will have to make additional requests to fetch everything it needs. This can escalate to a situation where a client needs to first download a list of elements, but then needs to make one additional request per element to fetch the required data.

As an example, consider the same app would also need to display the last three followers per user. The API provides the additional endpoint `/users/<user-id>/followers`. In order to be able to display the required information, the app will have to make one request to the `/users` endpoint and then hit the `/users/<user-id>/followers` endpoint for _each_ user.
## Rapid Product Iterations on the Frontend
A common pattern with REST APIs is to structure the endpoints according to the views that you have inside your app. This is handy since it allows for the client to get all required information for a particular view by simply accessing the corresponding endpoint.

The major drawback of this approach is that it doesn’t allow for rapid iterations on the frontend. With every change that is made to the UI, there is a high risk that now there is more (or less) data required than before. Consequently, the backend needs to be adjusted as well to account for the new data needs. This kills productivity and notably slows down the ability to incorporate user feedback into a product.

With GraphQL, this problem is solved. Thanks to the flexible nature of GraphQL, changes on the client-side can be made without any extra work on the server. Since clients can specify their exact data requirements, no backend engineer needs to make adjustments when the design and data needs on the frontend change.
## Insightful Analytics on the Backend

GraphQL allows you to have fine-grained insights about the data that’s requested on the backend. As each client specifies exactly what information it’s interested in, it is possible to gain a deep understanding of how the available data is being used. This can for example help in evolving an API and deprecating specific fields that are not requested by any clients any more.

With GraphQL, you can also do low-level performance monitoring of the requests that are processed by your server. GraphQL uses the concept of _resolver functions_ to collect the data that’s requested by a client. Instrumenting and measuring performance of these resolvers provides crucial insights about bottlenecks in your system.
## Benefits of a Schema & Type System

GraphQL uses a strong type system to define the capabilities of an API. All the types that are exposed in an API are written down in a _schema_ using the GraphQL Schema Definition Language (SDL). This schema serves as the contract between the client and the server to define how a client can access the data.

Once the schema is defined, the teams working on frontend and backends can do their work without further communication since they both are aware of the definite structure of the data that’s sent over the network.

Frontend teams can easily test their applications by mocking the required data structures. Once the server is ready, the switch can be flipped for the client apps to load the data from the actual API.


# Schema and Resolvers
## Schema
Your GraphQL server uses a **schema** to describe the shape of your data graph. This schema defines a hierarchy of **types** with fields that are populated from your back-end data stores. The schema also specifies exactly which **queries** and **mutations** are available for clients to execute against your data graph.
### The schema definition language
The GraphQL specification includes a human-readable **schema definition language** (or **SDL**) that you use to define your schema and store it as a string.
Here's a short example schema that defines two object types:  `Book`  and  `Author`:
```graphql
type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}
```
A schema defines a collection of types and the relationships _between_ those types. In the example schema above, every `Book` has an `author`, and every `Author` has a list of `books`. By defining these type relationships in a unified schema, we enable client developers to see exactly what data is available and request a specific subset of that data with a single optimized query.
### Supported types
Every type definition in a GraphQL schema belongs to one of the following categories:
-   Scalar types
-   Object types
-   The  `Query`  type
-   The  `Mutation`  type
-   Input types

**Scalar types:** Scalar types are similar to primitive types in your favorite programming language. They always resolve to concrete data.
GraphQL's default scalar types are:
-   `Int`: A signed 32‐bit integer
-   `Float`: A signed double-precision floating-point value
-   `String`: A UTF‐8 character sequence
-   `Boolean`:  `true`  or  `false`
-   `ID`  (serialized as a  `String`): A unique identifier.

**Object types:** Most of the types you define in a GraphQL schema are object types. An object type contains a collection of fields, each of which can be either a scalar type or  _another_  object type.
```graphql
type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}
```
**The  Query  type:** The  `Query`  type defines all of the top-level  **entry points**  for queries that clients execute against your data graph. It resembles an object type
Each field of the  `Query`  type defines the name and return type of a different entry point. The  `Query`  type for our example schema might resemble the following:
```graphql
type Query {
  books: [Book]
  authors: [Author]
}
```

***The  Mutation  type:** The  `Mutation`  type is similar in structure and purpose to the `Query`  type. Whereas the  `Query`  type defines entry points for  _read_  operations, the  `Mutation`  type defines entry points for  _write_  operations.

Each field of the  `Mutation`  type defines the signature and return type of a different entry point. The  `Mutation`  type for our example schema might resemble the following:
```graphql
type Mutation {
  addBook(title: String, author: String): Book
}
```
**Input types:** Input types are special object types that allow you to pass objects as arguments to queries and mutations (as opposed to passing only scalar types). Input types help keep operation signatures clean, much like how accepting a single  `options`  object in a JavaScript function can be cleaner than repeatedly adding arguments to the function's signature.
```graphql
type Mutation {
  createPost(title: String, body: String, mediaUrls: [String]): Post

```
## Resolvers
When using  `graphql-tools`, you define your field resolvers separately from the schema. Since the schema already describes all of the fields, arguments, and result types, the only thing left is a collection of functions that are called to actually execute these fields.

Keep in mind that GraphQL resolvers can return  _promises_. In fact, most resolvers that do real work - for example fetching data from a database or a REST API - will return a promise.
### Resolver map
In order to respond to queries, a schema needs to have resolvers for all fields. Resolvers are per field functions that are given a parent object, arguments, and the execution context, and are responsible for returning a result for that field. Resolvers cannot be included in the GraphQL schema language, so they must be added separately. The collection of resolvers is called the "resolver map".

The  `resolverMap`  object (`IResolvers`) should have a map of resolvers for each relevant GraphQL Object Type.
### Resolver function signature
```js
fieldName(obj, args, context, info) { result }
```
1.  `obj`: The object that contains the result returned from the resolver on the parent field, or, in the case of a top-level  `Query`  field, the  `rootValue`  passed from the server configuration. This argument enables the nested nature of GraphQL queries.
2.  `args`: An object with the arguments passed into the field in the query. For example, if the field was called with  `author(name: "Ada")`, the  `args`  object would be:  `{ "name": "Ada" }`.
3.  `context`: This is an object shared by all resolvers in a particular query, and is used to contain per-request state, including authentication information, dataloader instances, and anything else that should be taken into account when resolving the query.
4.  `info`: This argument should only be used in advanced cases, but it contains information about the execution state of the query, including the field name, path to the field from the root, and more.