const handleLikesGet = (req, res, db) => {
    const {jokeid} = req.params;
    db('favourites').count('jokeid').where('jokeid',jokeid)
    .then( result =>{
        res.json(result)
    })
    .catch(err => res.status(400).json('error getting likes'))
}

module.exports = {
    handleLikesGet: handleLikesGet
}