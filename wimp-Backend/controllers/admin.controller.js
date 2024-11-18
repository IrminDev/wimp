import Admin from '../model/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const pwdCheck = await bcrypt.compare(password, admin.password);

        if (!pwdCheck) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const adminForToken = {
            email: admin.email,
            id: admin._id,
        };

        const token = jwt.sign(adminForToken, process.env.SECRET, { expiresIn: '1h' });

        res.status(200).send({ token, email: admin.email, name: admin.name });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
};

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const admin = new Admin({
            email,
            password: passwordHash,
            name,
        });

        const savedAdmin = await admin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
};

export const verifyToken = (req, res) => {
    try {
        const token = req.token;
        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Token invalid' });
        }

        res.status(200).json(decodedToken);
    } catch (error) {
        console.error('Error verifying token:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }

        res.status(500).json({ error: 'An error occurred during token verification' });
    }
};
