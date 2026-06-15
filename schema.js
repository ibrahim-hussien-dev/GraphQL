const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const products = require('./data');

const Product = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        categoryId: { type: GraphQLInt },
    },
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        products: {
            type: new GraphQLList(Product),
            resolve: function () {
                return products;
            },
        },

        product: {
            type: Product,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: function (parent, args) {
                return products.find(function (product) {
                    return product.id === args.id;
                });
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createProduct: {
            type: Product,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                categoryId: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: function (parent, args) {
                const product = {
                    id: String(products.length + 1),
                    name: args.name,
                    price: args.price,
                    categoryId: args.categoryId,
                };

                products.push(product);
                return product;
            },
        },

        editProduct: {
            type: Product,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                price: { type: GraphQLInt },
                categoryId: { type: GraphQLInt },
            },
            resolve: function (parent, args) {
                const product = products.find(function (item) {
                    return item.id === args.id;
                });

                if (!product) {
                    return null;
                }

                if (args.name !== undefined) {
                    product.name = args.name;
                }

                if (args.price !== undefined) {
                    product.price = args.price;
                }

                if (args.categoryId !== undefined) {
                    product.categoryId = args.categoryId;
                }

                return product;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
