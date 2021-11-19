const { gql, ApolloServer } = require("apollo-server");
//CREATE FAKE DATABASE
let alunos = [];
//DEFINE TYPES
const typeDefs = gql`
  type Aluno {
    ra: Int!
    nome: String
    curso: String
    semestre: Int
    cpf: Int
    cidade: String
  }
  type Query {
    alunos: [Aluno]
    aluno(ra: Int!): Aluno
  }
  type Mutation {
    create(ra: Int!, nome: String!, curso: String!, semestre: Int!, cpf: Int!, cidade: String!): Aluno
    delete(ra: Int!): Boolean
    update(ra: Int!, nome: String, curso: String, semestre: Int, cpf: Int, cidade: String): Aluno
  }
`;
//DEFINE RESOLVERS
const resolvers = {
  Query: {
    alunos: () => {
      return alunos;
    },
    aluno: (_, { ra }) => {
      return alunos.find((aluno) => aluno.ra === ra);
    },
  },
  Mutation: {
    create: (_, { ra, nome, curso, semestre, cpf, cidade }) => {
      const aluno = { ra, nome, curso, semestre, cpf, cidade };
      alunos.push(aluno);
      return aluno;
    },
    delete: (_, { ra }) => {
      const filteredAlunos = alunos.filter((aluno) => aluno.ra !== ra);
      alunos = filteredAlunos;
      return true;
    },
    update: (_, { ra, nome, curso, semestre, cpf, cidade }) => {
      const aluno = alunos.find((aluno) => aluno.ra === ra);
      aluno.ra = aluno.ra;
      aluno.nome = nome ? nome : aluno.nome;
      aluno.curso = curso ? curso : aluno.curso;
      aluno.semestre = semestre ? semestre : aluno.semestre;
      aluno.cpf = cpf ? cpf : aluno.cpf;
      aluno.cidade = cidade ? cidade : aluno.cidade;
      return aluno;
    },
  },
};

//CREATE SERVER
const app = new ApolloServer({ typeDefs, resolvers });
//RUN SERVER
app.listen().then(({ url }) => console.log(`Server running on ${url}`));