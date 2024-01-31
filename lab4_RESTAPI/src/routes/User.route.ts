import { Router } from "express";
import UserModel from '../collections/User.collection';

const router = Router();

// Es un servicio que me trae a todos los usuarios.
router.get('/', async (req, res) => {
    const allPeople = await UserModel.find({}).lean().exec();
    res.status(200).json(allPeople);
});

// Es un servicio para crear un usuario
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body);
    
    const person = await UserModel.create({
        username: req.body.username,
        password: req.body.password,
    });
    res.status(201).json(person);
});

// Es un servicio para modificar un usuario
router.put('/:username', async (req, res) => {
    await UserModel.updateOne({ username: req.params.username }, { $set: { password: req.body.password } });
    res.status(202).json({ message: 'El usuario se modificó con éxito!' });
});

// Es un servicio para borrar un usuario
router.delete('/:username', async (req, res) => {
    await UserModel.deleteOne({ username: req.params.username });
    res.status(202).json({ message: 'El usuario se eliminó con éxito!' });
})

export default router;
