const { GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql')
const { AuthorType, BookType} = require("./Schema")

const Author = require("./../models/Author")
const Book = require("./../models/Book")

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        
        author: {
            type: AuthorType,
            description: 'Author',
            args:{
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
               const author = await Author.findById(args.id)
               return author
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: async () => {
                const authors = await Author.find()
                return authors
            }
        },

        book: {
            type: BookType,
            description: 'Book',
            args:{
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                const book = await Book.findById(args.id)
                return book
            }
        },

        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: async () => {
                const books = await Book.find()
                return books
            }
        }
    })
})

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: { type:  GraphQLNonNull(GraphQLString) },
                age: { type:  GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent,args) => {
                
                const body = {
                    name: args.name,
                    age: args.age
                }
                
                const author = new Author(body)

                const authorCreated = await author.save();

                return authorCreated
            }
        },

        updateAuthor: {
            type: AuthorType,
            description: 'Update an author',
            args: {
                id: { type:  GraphQLNonNull(GraphQLString) }, 
                name: { type:  GraphQLNonNull(GraphQLString) },
                age: { type:  GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent,args) => {
                
                const author = await Author.findById(args.id)

                author.name = args.name
                author.age = args.age

                const authorUpdated = await author.save();

                return authorUpdated
            }
        },

        addBook: {
            type: BookType,
            description: 'Add a Book',
            args: {
                name: { type:  GraphQLNonNull(GraphQLString) },
                authorId: { type:  GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent,args) => {

                const body = {
                    name: args.name,
                    authorId: args.authorId
                }
                
                const book = new Book(body)

                const bookCreated = await book.save();

                return bookCreated
            }
        },

        updateBook: {
            type: BookType,
            description: 'Update a Book',
            args: {
                id: { type:  GraphQLNonNull(GraphQLString) }, 
                name: { type:  GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent,args) => {
                
                const book = await Book.findById(args.id)

                book.name = args.name

                const bookUpdated = await book.save();

                return bookUpdated
            }
        },

    })
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = schema