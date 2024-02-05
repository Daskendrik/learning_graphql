const graphql = require('graphql');

const {
  GraphQLObjectType, //что то типо бк
  GraphQLString,
  GraphQLSchema,
  GraphQLID, //для айдишников
  GraphQLInt,
  GraphQLList, //список
} = graphql;

// const directorsJson = [
//   { "name": "Quentin Tarantino", "age": 55 }, // 65c08420fca67ad412e82286
//   { "name": "Michael Radford", "age": 72 }, // 65c08430fca67ad412e82643
//   { "name": "James McTeigue", "age": 51 }, // 65c08437fca67ad412e82806
//   { "name": "Guy Ritchie", "age": 50 }, // 65c08441fca67ad412e82aad
// ];

// // directorId - it is ID from the directors collection
// const moviesJson = [
//   { "name": "Pulp Fiction", "genre": "Crime", "directorId": "65c08420fca67ad412e82286" },
//   { "name": "1984", "genre": "Sci-Fi", "directorId": "65c08430fca67ad412e82643" },
//   { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "65c08437fca67ad412e82806" },
//   { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "65c08441fca67ad412e82aad" },
//   { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "65c08420fca67ad412e82286" },
//   { "name": "The Hateful Eight", "genre": "Crime", "directorId": "65c08420fca67ad412e82286" },
//   { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "65c08420fca67ad412e82286" },
//   { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "65c08441fca67ad412e82aad" },
// ];

// const movies = [
//   { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
//   { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2' },
//   { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3' },
//   { id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4' },
//   { id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
//   { id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
//   { id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '1' },
//   {
//     id: '7',
//     name: 'Lock, Stock and Two Smoking Barrels',
//     genre: 'Crime-Comedy',
//     directorId: '4',
//   },
// ];

// const directors = [
//   { id: '1', name: 'Quentin Tarantino', age: 55 },
//   { id: '2', name: 'Michael Radford', age: 72 },
//   { id: '3', name: 'James McTeigue', age: 51 },
//   { id: '4', name: 'Guy Ritchie', age: 50 },
// ];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID }, // типы данных, поддерживает String, Int, Float, Boolean, ID
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLID },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        //метод корневого запроса
        return directors.find((director) => director.id == parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID }, // типы данных, поддерживает String, Int, Float, Boolean, ID
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movie: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter((movie) => movie.directorId === parent.id);
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id == args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find((director) => director.id == args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      },
    },
    directors: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return directors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
