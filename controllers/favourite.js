const handleFavouriteGet = (req, res ,db) =>{
    const { id } = req.params;
    db.select('jokeid').from('favourites').where('userid', id)
    .then( user => {
        if(user.length){
            let jokeId = user.map( (joke) => {return joke.jokeid})
            res.json(jokeId);
        } else {
            res.status(400).json('Not found');
        }
    })
    .catch(err => res.status(400).json('Error getting jokes from favourites'))
}

const handleFavouriteDelete = (req, res, db) => {
    const { userid, jokeid } = req.body;
    db.transaction(trx => {
       trx.delete()
       .from('favourites')
       .where('userid', userid)
       .andWhere('jokeid', jokeid)
       .then(trx.commit)
       .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to delete favourite joke'))
}

const handleFavourites = (req, res, db) => {
    const { favourites } = req.body;
    getJokes(favourites, db)
    .then(jokes => res.json({jokes:jokes})); 
}

const getJokes = (favourites, db) => {
    return db.select('*').from('jokes')
        .whereIn('id', favourites)
        .catch(err => console.log('Unable to get joke'))
}

module.exports = {
    handleFavouriteGet: handleFavouriteGet,
    handleFavourites: handleFavourites,
    handleFavouriteDelete: handleFavouriteDelete
}