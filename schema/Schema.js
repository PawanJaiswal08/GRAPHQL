const { GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql')

const Author = require("./../models/Author")
const Book = require("./../models/Book")

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represents a book written by an author",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: async (author) => {
                const book = await Book.find({authorId: author.id})
                return book
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents list of books",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLString) },
        author: { 
            type: AuthorType,
            resolve: async (book) => {
                const author = await Author.findById(book.authorId)
                return author
            }
        }

    })
})

module.exports = {
    AuthorType: AuthorType,
    BookType: BookType
}