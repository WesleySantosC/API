import mongoose from "mongoose";

const conectaDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/escola";

    await mongoose.connect(mongoUri);
    console.log(`Conectado ao MongoDB em ${mongoUri}`);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

export default conectaDB;