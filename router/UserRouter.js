const express = require('express');
const userBl = require('../module/UserBl');
const {body, validationResult} = require('express-validator')
const router = express.Router();

router.route('/')
    .post(body('email', 'your email is wrong please try again').isEmail()
        , body('email', 'please enter an email').notEmpty()
        , body('password', 'please enter a password').notEmpty(), async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).send(errors);
            } else {
                const body = req.body;
                try {
                    let newUser = await userBl.register(body);
                    return res.json(newUser)
                } catch (e) {
                    console.error(e);
                }
            }

        })

router.route('/login')
    .post(body('email', 'your email is wrong please try again').isEmail()
        , body('email', 'please enter an email').notEmpty()
        , body('password', 'please enter a password').notEmpty(), async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).send(errors);
            } else {
                let email = req.query.email;
                let password = req.query.password;
                try {
                    let userData = await userBl.login(email, password);
                    return res.json(userData);
                } catch (e) {
                    console.error(e);
                }
            }

        })

module.exports = router;
