const {
    User
} = require('../models');

module.exports = {
    
    createUser: async (req, res) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'You must provide a username, email, and password'})
        }

        try {
            const user = await User.create({
                username,
                email,
                password,
            });
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({});
            res.json(users);
        } catch (error) {
            res.json(error);
        }
    },
}