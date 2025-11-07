import mongoose, {Schema} from "mongoose";

const alunoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    curso: {
        type: String,
        required: true
    }
});

export const Aluno = mongoose.model("Aluno", alunoSchema);