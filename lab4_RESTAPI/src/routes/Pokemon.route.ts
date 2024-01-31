import { Router } from "express";
import PokemonModel from '../collections/Pokemon.collection';
import Hability from '../collections/Hability.collection';
import authenticate from '../collections/Authentication.collection';

const router = Router();

router.use(authenticate);

router.get('/', async (req, res) => {
    const pokemons = await PokemonModel.find({}).lean().exec();
    res.status(200).json(pokemons);
});

// Es un servicio web que me trae a UN usuario por su id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const pokemon = await PokemonModel.find({ id }).lean().exec();

    if (pokemon.length === 0) {
        res.status(404).json({ message: `No hay pokemons con pokedex ${id}` });
    }
    else {
        res.status(200).json(pokemon[0]);
    }
});


router.post('/', async (req, res) => {
    try {
        const abilities = await Hability.find({ name: { $in: req.body.abilities } });

        if (abilities.length !== req.body.abilities.length) {
            const missingAbilities = req.body.abilities.filter(ability => !abilities.some(a => a.name === ability)); //Chequear si existe la habilidad
            return res.status(400).json({ error: `No se encontraron las habilidades: ${missingAbilities.join(', ')}` });
        }

        const pokemon = await PokemonModel.create({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            abilities: abilities.map(ability => ability._id),
            type: req.body.type,
            secondType: req.body.secondType,
        });

        res.status(201).json(pokemon);
    } catch (error) {
        console.error('Error creando Pokemon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Es un servicio web que crea o actualiza un Pokemon por su id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const abilities = await Hability.find({ name: { $in: req.body.abilities } });

        if (abilities.length !== req.body.abilities.length) {
            const missingAbilities = req.body.abilities.filter(ability => !abilities.some(a => a.name === ability));
            return res.status(400).json({ error: `No se encontraron las habilidades: ${missingAbilities.join(', ')}` });
        }

        const updatedPokemon = {
            name: req.body.name,
            description: req.body.description,
            abilities: abilities.map(ability => ability._id),
            type: req.body.type,
            secondType: req.body.secondType,
        };

        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const pokemon = await PokemonModel.findOneAndUpdate({ id }, updatedPokemon, options).lean().exec();

        res.status(200).json(pokemon);
    } catch (error) {
        console.error('Error actualizando Pokemon:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Es un servicio para borrar un Pokemon
router.delete('/:id', async (req, res) => {
    await PokemonModel.deleteOne({ id: req.params.id });
    res.status(202).json({ message: 'El pokemon se eliminó con éxito!' });
})


export default router;
