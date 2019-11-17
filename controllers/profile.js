const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user=>{
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).json('Not found');
        }
    })
    .catch(err => res.status(400).json('Error getting user'));
}

const handleProfileDelete = (req, res, db) => {
    const { userid, jokeid } = req.body;
    db.transaction(trx => {
       select('*')
       .from('favourites')
       .where('userid', userid)
       .andWhere('jokeid', jokeid)
       .del()
       .then(trx.commit)
       .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to delete favourite joke'))
}

module.exports = {
    handleProfileGet: handleProfileGet,
    handleProfileDelete: handleProfileDelete
}