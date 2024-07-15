import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import sequelize from './db/db.js';
import router from './routes/index.js';
import ErrorMiddleware from './middlewares/ErrorMiddleware.js';


const PORT= process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(ErrorMiddleware);


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start()