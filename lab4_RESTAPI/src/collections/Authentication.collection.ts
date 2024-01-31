import UserModel from './User.collection';

const authenticate = async (req, res, next) => {
    try {
        const { username, password } = req.headers; // Se debe mandar en el header del request

        if (!username || !password) {
            return res.status(401).json({ message: 'Autenticacion fallida. Username and password son requeridos.' });
        }

        const user = await UserModel.findOne({ username, password }).lean().exec();

        if (!user) {
            return res.status(401).json({ message: 'Autenticacion fallida. Invalid username or password.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Autenticacion error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default authenticate;
