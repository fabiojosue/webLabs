import mongoose from 'mongoose';
import * as express from 'express';
import * as multer from 'multer';
import { Request, Response } from 'express';

// Routes
import UserRouter from './routes/User.route';
import HabilityRouter from './routes/Hability.route';
import PokemonRouter from './routes/Pokemon.route';


const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(upload.none()); // Use multer to parse none/form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRouter);
app.use('/habilities', HabilityRouter);
app.use('/pokemon', PokemonRouter);


const connectionString: string = 'mongodb://localhost:27017/pokemon';


const main = async () => {
    await mongoose.connect(connectionString);

    app.listen(port, () => {
        console.log(`La aplicación está escuchando en el puerto ${port}`);
    });
};

main();

