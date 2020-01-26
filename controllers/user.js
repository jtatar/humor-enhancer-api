const handleUserSearch = (req, res, db) => {
    const {surname} = req.params;
    db.select('id', 'name', 'surname').from('users').where('surname','like','%'+surname+'%').limit(5)
    .then( user => {
        if(user.length){
            res.json(user)
        } else{
            res.status(400).json('Not found');
        }
    })
    .catch(err => res.status(400).json('Error getting user'));
}

module.exports = {
    handleUserSearch: handleUserSearch
}