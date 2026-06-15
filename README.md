# GraphQL Products API

Simple GraphQL API for managing a small in-memory product catalog.

## What It Includes

- Express server on port `3000`
- GraphQL endpoint at `/graphql`
- Ruru GraphQL explorer at `/`
- In-memory sample product data

## Requirements

- Node.js 18 or newer recommended
- npm

## Install

```bash
npm install
```

## Run

```bash
npm start
```

The server will start at:

```text
http://localhost:3000
```

Open the root URL in a browser to use the Ruru explorer, or send GraphQL requests to `/graphql`.

## Schema

### Product Type

- `id: ID`
- `name: String`
- `price: Int`
- `categoryId: Int`

### Queries

- `products`: returns all products
- `product(id: ID!)`: returns a single product by ID

### Mutations

- `createProduct(name: String!, price: Int!, categoryId: Int!)`: adds a product
- `editProduct(id: ID!, name: String, price: Int, categoryId: Int)`: updates an existing product

## Example Queries

```graphql
query {
  products {
    id
    name
    price
    categoryId
  }
}
```

```graphql
query {
  product(id: "1") {
    id
    name
    price
    categoryId
  }
}
```

## Example Mutations

```graphql
mutation {
  createProduct(name: "Mouse", price: 45, categoryId: 2) {
    id
    name
    price
    categoryId
  }
}
```

```graphql
mutation {
  editProduct(id: "1", price: 1100) {
    id
    name
    price
    categoryId
  }
}
```

## Project Structure

- `index.js` starts the Express server and mounts GraphQL
- `schema.js` defines the GraphQL schema, queries, and mutations
- `data.js` holds the in-memory product list
