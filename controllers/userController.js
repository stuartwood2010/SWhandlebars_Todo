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
            const usersData = await User.findAll({});
            const users = usersData.map(user => user.get({ plain: true }));
            res.render('allUsers', {
                users,
                favoriteFood: 'Ice cream sandwich'
            });
        } catch (error) {
            res.json(error);
        }
    },

    getUserById: async (req, res) => {
        try {
            const userData = await User.findByPk(req.params.userId);
            const user = userData.get({ plain: true });
            res.render('singleUser', {
                user
            });
        } catch (error) {
            res.json(error);
        }
    }
}