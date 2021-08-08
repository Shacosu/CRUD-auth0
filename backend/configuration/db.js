import mongoose from 'mongoose';

const myConnection = async() => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/crudtest', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`Base de datos conectada! - ${conn.connection.host}`);
    } catch (error) {
        console.log("Error en la conexion a la db:", error);
        process.exit(1);
    }
}

export default myConnection;