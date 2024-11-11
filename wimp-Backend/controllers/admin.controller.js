const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
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

module.exports = {
    login
}

