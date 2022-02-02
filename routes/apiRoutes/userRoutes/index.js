const router = require('express').Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    login,
} = require('../../../controllers/userController');

router.route('/')
.get(getAllUsers)
.post(createUser);

router.route('/:userId')
.get(getUserById);

router.route('/login')
.post(login);
module.exports = router;