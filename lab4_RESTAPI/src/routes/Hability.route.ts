import { Hability } from './../models/Hability.interface';
import { Router } from "express";
import HabiliyModel from '../collections/Hability.collection';
import authenticate from '../collections/Authentication.collection';

const router = Router();

router.use(authenticate);

// Es un servicio que me trae a todos los usuarios.
router.get('/', async (req, res) => {
    const habilities = await HabiliyModel.find({}).lean().exec();
    res.status(200).json(habilities);
});

// Es un servicio para crear un usuario
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body);
    
    const hability = await HabiliyModel.create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
    });
    res.status(201).json(hability);
});

export default router;
