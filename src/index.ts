import express from "express";
import aluno from "./routes/alunos";
import conectaDB from "./database/connection";

const app = express();
const PORT = 3000;

conectaDB();

app.use(express.json());
app.use("/alunos", aluno);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}/alunos`);
});