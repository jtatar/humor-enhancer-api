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

module.exports = {
    handleFavouriteGet: handleFavouriteGet
}