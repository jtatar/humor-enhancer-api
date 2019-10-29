const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);
const jwt = require('jsonwebtoken');

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers
    return redisClient.get(authorization, (err, reply => {
        if(err || !reply){
            return res.status(400).json('Unauthorized');
        }
        return res.json({id:reply});
    }))
}

const signInAuthentication = (db, bcrypt, req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return Promise.reject('Incorrect form submission');
    }
    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid){
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => Promise.reject('Unable to get user'))
            } else {
                Promise.reject('Wrong credentials')
            }
        })
        .catch(err => Promise.reject('Wrong credentials'))
}

const createSessions = (data) => {
    const {email, id} = data;
    const token = signToken(email);
    return setToken(token, id)
        .then(() => {
            return { success: 'true', userId: id, token }
        })
        .catch("Create session error")
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign({jwtPayload}, process.env.REACT_APP_JWT_SECRET);
}

const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value))
}

const handleSignin = (req, res, db, bcrypt) => {
    const { authorization } = req.headers;
    return authorization ?
        getAuthTokenId(req, res) :
        signInAuthentication(db, bcrypt, req, res)
        .then (data => {
            return data.id && data.email ? createSessions(data) : Promise.reject(data)
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
}

module.exports = {
    handleSignin: handleSignin
}