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
        req.session.save(() => {
            if (req.session.visitCount) {
                req.session.visitCount++;
            } else {
                req.session.visitCount = 1;
            }
        })
        try {
            const usersData = await User.findAll({});
            const users = usersData.map(user => user.get({ plain: true }));
            res.render('allUsers', {
                users,
                favoriteFood: 'Ice cream sandwich',
                visitCount: req.session.visitCount,
				loggedInUser: req.session.user || null,
            });
        } catch (error) {
            res.json(error);
        }
    },

    getUserById: async (req, res) => {
        req.session.save(() => {
            if (req.session.visitCount) {
                req.session.visitCount++;
            } else {
                req.session.visitCount = 1;
            }
        })
        try {
            const userData = await User.findByPk(req.params.userId);
            const user = userData.get({ plain: true });
            res.render('singleUser', {
                user,
                visitCount: req.session.visitCount
            });
        } catch (error) {
            res.json(error);
        }
    },
    login: async (req, res) => {
        try {
            const userData = await User.findOne({email: req.body.email});
            const userFound = userData.get({ plain: true });

            if (userFound.password === req.body.password) {
                req.session.save(() => {
                    req.session.user = userFound;
                    res.json({ success: true });
                });
            }
        } catch (error) {
            res.json(error);
        }
    }
}