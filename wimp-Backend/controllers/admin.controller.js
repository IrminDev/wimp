import Admin from '../model/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({email})

    const pwdCheck = admin === null
        ? false
        : await bcrypt.compare(password, admin.password);

    if(!(admin && pwdCheck)) {
        return res.status(401).json({
            error: 'invalid email or password'
        })
    }

    const adminForToken = {
        email: admin.email,
        id: admin._id
    }

    const token = jwt.sign(adminForToken, process.env.SECRET);

    res.status(200).send({token, email: admin.email, name: admin.name});
}

export const register = async (req, res) => {
    const { email, password, name } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const admin = new Admin({
        email,
        password: passwordHash,
        name
    });

    const savedAdmin = await admin.save();

    res.json(savedAdmin);
}
