
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);

const handleSignout = (req, res) => {
    const { token } = req.body;
    if(!token){
        return Promise.reject('No token')
    }
    return redisClient.del(token, (err,reply) => {
        if(err || !reply){
            console.log(reply);
            return res.status(400).json('Cant delete');
        }
        return res.json({reply:reply});
    })
}

module.exports = {
    handleSignout: handleSignout
}