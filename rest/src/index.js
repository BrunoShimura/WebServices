const express = require("express");
// FAKE DATABASE
let alunos = [];
// CRIAR O APP
const app = express();

app.use(express.json());

app.post("/alunos", (req, res) => {
  const { ra, nome, curso, semestre, cpf, cidade } = req.body;
  const aluno = { ra, nome, curso, semestre, cpf, cidade };
  alunos.push(aluno);
  return res.status(201).json(aluno);
});

app.get("/alunos", (req, res) => {
  const allAlunos = alunos;
  return res.status(200).json(allAlunos);
});

app.get("/alunos/:aluno_ra", (req, res) => {
  const { aluno_ra } = req.params;
  const aluno = alunos.find((aluno) => aluno.ra === aluno_ra);
  if (!aluno) res.status(404).json("not found");
  return res.status(200).json(aluno);
});

app.delete("/alunos/:aluno_ra", (req, res) => {
  const { aluno_ra } = req.params;
  const filteredAlunos = alunos.filter((aluno) => aluno.ra !== aluno_ra);
  alunos = filteredAlunos;
  return res.status(204).json("deleted");
});

app.patch("/alunos/:aluno_ra", (req, res) => {
  const { nome, curso, semestre, cpf, cidade } = req.body;
  const { aluno_ra } = req.params;
  const aluno = alunos.find((aluno) => aluno.ra === aluno_ra);
  aluno.ra = aluno.ra;
  aluno.nome = nome ? nome : aluno.nome;
  aluno.curso = curso ? curso : aluno.curso;
  aluno.semestre = semestre ? semestre : aluno.semestre;
  aluno.cpf = cpf ? cpf : aluno.cpf;
  aluno.cidade = cidade ? cidade : aluno.cidade;
  return res.status(200).json(aluno);
});

// MANDAR O SERVIDOR RODAR
app.listen(3333, () => console.log("Server is running"));