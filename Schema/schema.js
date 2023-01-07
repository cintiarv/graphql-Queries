import graphql, {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from "graphql";

const courses = [
  { id: "1", name: "JS", language: "javascript", date: 2022, professorId: "2" },
  {
    id: "2",
    name: "CSS & SCSS",
    language: "CSS",
    date: 2022,
    professorId: "2",
  },
  {
    id: "3",
    name: "ReactJS",
    language: "javascript",
    date: 2021,
    professorId: "1",
  },
  {
    id: "4",
    name: "nodeJS",
    language: "javascript",
    date: 2020,
    professorId: "3",
  },
];

const professors = [
  { id: "1", name: "Alberto", age: "30", active: true },
  { id: "2", name: "Ernesto", age: "28", active: true },
  { id: "3", name: "Susy", age: "25", active: false },
  { id: "4", name: "Cin", age: "35", active: true },
];

const users = [
  { id: "1", name: "Beto", email: "beto@gmail.com", password: "abc123" },
  { id: "2", name: "Lucy", email: "lucy@gmail.com", password: "abc123" },
  { id: "3", name: "Ana", email: "ana@gmail.com", password: "abc123" },
  { id: "4", name: "Ema", email: "ema@gmail.com", password: "abc123" },
];

const CourseType = new GraphQLObjectType({
  //nos permite las relaciones entre los diferentes tipos
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    language: { type: GraphQLString },
    date: { type: GraphQLString },
    professor: {
      //relación 1 a 1, un curso puede tener solo 1 profesor
      type: ProfessorType,
      resolve(parent, args) {
        return professors.find(
          (professor) => professor.id === parent.professorId
        );
      },
    },
  }),
});

const ProfessorType = new GraphQLObjectType({
  name: "Professor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    active: { type: GraphQLBoolean },
    course: {
      //relación 1 a muchos, un profesor puede tener varios cursos
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return courses.filter((course) => course.professorId === parent.id);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    course: {
      type: CourseType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        //parent, cuando haya relaciones entre los tipos argument, lo que nos llega de la solicitud
        return courses.find((curso) => curso.id === args.id);
      },
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return courses;
      },
    },
    professor: {
      //parametro tal cual nos llega en la query
      type: ProfessorType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        //parent, cuando haya relaciones entre los tipos argument, lo que nos llega de la solicitud
        return professors.find((professor) => professor.name === args.name);
      },
    },
    professors: {
      type: new GraphQLList(ProfessorType),
      resolve(parent, args) {
        return professors;
      },
    },
    user: {
      //parametro tal cual nos llega en la query
      type: UserType,
      args: {
        email: { type: GraphQLString },
      },
      resolve(user, args) {
        //parent, cuando haya relaciones entre los tipos argument, lo que nos llega de la solicitud
        return users.find((user) => user.email === args.email);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});
export { schema };
