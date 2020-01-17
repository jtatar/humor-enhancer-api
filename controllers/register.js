const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);

const createSession = (user) => {
    const { email, id } = user;
    const token = signToken(email);
    return setToken(token, id)
        .then(() => {
            console.log(`Creating session for: ${email}`);
            return {success: 'true', userId: id, token}
        })
        .catch("create session error")
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign({jwtPayload},process.env.REACT_APP_JWT_SECRET);
}

const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value));
}

const handleRegister = (req, res, db, bcrypt) => {
    const { name, surname, email, age, password } = req.body;
    if(!email || !name || !surname || !age || !password){
        return res.status(400).json('Incorect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name: name,
                surname: surname,
                joined: new Date(),
                age: age
            })
            .then(user => {
                return createSession(user[0]);
            })
            .then(session => res.json(session))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(`Unable to register ${err}`))
}

module.exports = {
    handleRegister: handleRegister
};