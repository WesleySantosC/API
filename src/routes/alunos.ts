import { Router, Request, Response } from "express";
import { redis } from "../database/cache";
import { Aluno } from "../models/Aluno";
import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
    try {
        const usuarioCache = await redis.get("nome");

        const usuario = await Aluno.find({}, { nome: 1, _id: 0 });

        if (usuarioCache) {
            return res.status(200).json({ msg: `Usuários do cache: ${usuarioCache}` });
        }

        await redis.set("nome", JSON.stringify(usuario), "EX", 30);

        return res.status(200).json({success: true, msg: `Usuários do mongo: ${usuario}` });

    } catch (error) {
        return res.status(400).json({success: false, msg: `Ocorreu um erro`, error })
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { nome, idade, curso } = req.body;

        if (!nome || !idade || !curso) {
            return res.status(400).json({ msg: "Revise os campos enviados. Por gentileza!" });
        }

        await redis.set("nome", nome);

        await prisma.aluno.create({
            data: {
                nome: nome,
                idade: idade,
                curso: curso
            }
        });

        const novoUsuario = new Aluno({ nome, idade, curso });
        await novoUsuario.save();

        return res.status(201).json({ success: true, msg: `O novo usuário já está cadastrado!` });

    } catch (error) {
        return res.status(400).json({ success: false, msg: `Ocorreu um erro ao adicionar um novo usuário`, error })
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (id) {

            if(mongoose.Types.ObjectId.isValid(id)) {
                await Aluno.findByIdAndDelete(id);
            }
            
            if(!isNaN(Number(id))) {
                await prisma.aluno.delete({
                    where: {
                        id: Number(id)
                    }
                });
            }

            await redis.del("alunos:nome");
            return res.status(200).json({ success: true, msg: `O ${id} foi deletado!` });
        }
    } catch (error) {
        return res.status(400).json({ success: false, msg: `Ocorreu um erro ao deletar`, error })
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome, idade, curso } = req.body;

        if (mongoose.Types.ObjectId.isValid(id)) {
            await Aluno.findByIdAndUpdate(id, { nome, idade, curso });
        }

        if (!isNaN(Number(id))) {
            await prisma.aluno.update({
                where: { id: Number(id) },
                data: { nome, idade, curso },
            });


            await redis.del("alunos:nome");
            return res.status(200).json({ success: true, msg: `O ${id} foi atualizado!` });
        }
    } catch (error) {
        return res.status(400).json({ success: false, msg: `Ocorreu um erro ao atualizar`, error })
    }
});

export default router;