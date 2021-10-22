const UserSchema = require('./UserSchema');
const jwt = require('jsonwebtoken');

const register = (user) => {
    return new Promise((resolve, reject) => {
        if (user.email !== null && user.password !== null) {
            const newUser = new UserSchema({
                email: user.email,
                password: user.password
            })

            newUser.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("created!")
                }
            })
        } else {
            resolve("you must to enter an email and password");
        }
    })
}

const login = (userEmail, userPassword) => {
    return new Promise((resolve, reject) => {
        UserSchema.find({email: userEmail, password: userPassword}
            , (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data[0] === undefined) {
                        resolve("your email or password incorrect")
                    } else {
                        const tokenData = jwt.sign({id: data[0]._id},
                            "USER_SECRETE_KEY",
                            {expiresIn: 7100});
                        resolve(tokenData);
                    }
                }
            });
    })
}

module.exports = {register, login}
