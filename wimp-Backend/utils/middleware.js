import Admin from '../model/Admin.js';
import jwt from 'jsonwebtoken';

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    } else {
        req.token = null;
    }
    next();
};

const userExtractor = async (req, res, next) => {
    try{
        const auth = req.get('authorization');
        if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
            return res.status(401).json({ error: 'token missing or invalid' });
        } else {
            const token = auth.substring(7);
            const decodedToken = jwt.verify(token, process.env.SECRET);
            if (!token || !decodedToken.id) {
                return res.status(401).json({ error: 'token missing or invalid' });
            }
            const user = await Admin.findById(decodedToken.id);
            req.user = user;
        }
    } catch (e) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    next();
}

export default { tokenExtractor, userExtractor };