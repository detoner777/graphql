const graphql = require("graphql");

// // Don't forget to update after creation
// const directorsJson = [
//   { name: "Quentin Tarantino", age: 55 }, //5ee5eb83ddab90179ff7663f
//   { name: "Michael Radford", age: 72 }, //5ee5edd0ddab90179ff76644
//   { name: "James McTeigue", age: 51 }, //5ee5eef9ddab90179ff76649
//   { name: "Guy Ritchie", age: 50 }, //5ee5ee73ddab90179ff76646
// ];
// // directorId - it is ID from the directors collection
// const moviesJson = [
//   {
//     name: "Pulp Fiction",
//     genre: "Crime",
//     directorId: "5ee5eb83ddab90179ff7663f",
//   },
//   { name: "1984", genre: "Sci-Fi", directorId: "5ee5edd0ddab90179ff76644" },
//   {
//     name: "V for vendetta",
//     genre: "Sci-Fi-Triller",
//     directorId: "5ee5eef9ddab90179ff76649",
//   },
//   {
//     name: "Snatch",
//     genre: "Crime-Comedy",
//     directorId: "5ee5ee73ddab90179ff76646",
//   },
//   {
//     name: "Reservoir Dogs",
//     genre: "Crime",
//     directorId: "5ee5eb83ddab90179ff7663f",
//   },
//   {
//     name: "The Hateful Eight",
//     genre: "Crime",
//     directorId: "5ee5eb83ddab90179ff7663f",
//   },
//   {
//     name: "Inglourious Basterds",
//     genre: "Crime",
//     directorId: "5ee5eb83ddab90179ff7663f",
//   },
//   {
//     name: "Lock, Stock and Two Smoking Barrels",
//     genre: "Crime-Comedy",
//     directorId: "5ee5ee73ddab90179ff76646",
//   },
// ];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const Directors = require("../models/director");
const Movies = require("../models/movie");

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find(director => director.id === parent.id);
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter(movie => movie.directorId === parent.id);
        return Movies.find({ directorId: parent.id });
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find(movie => movie.id === args.id);
        return Movies.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find(director => director.id === args.id);
        return Directors.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movies.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Directors.find({});
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: Query,
});
