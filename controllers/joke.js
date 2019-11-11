const fetch = require('node-fetch');

const handleJokeGet = (req, res, db) => {
    fetch('https://sv443.net/jokeapi/category/Any')
    .then(resp => resp.json())
    .then(data => {
        res.json(data);
        saveJoke(data, db);
    })
}

const saveJoke = (data, db) => {
    db.transaction(trx => {
        if(data.type==='single'){
            trx.insert({
                id: data.id,
                type: data.type,
                joke: data.joke,
                category: data.category
            })
            .into('jokes')
            .then(trx.commit)
            .catch(trx.rollback)
        } else if(data.type==='twopart') {
            trx.insert({
                id:data.id,
                type: data.type,
                category: data.category,
                setup: data.setup,
                delivery: data.delivery
            })
            .into('jokes')
            .then(trx.commit)
            .catch(trx.rollback)
        }
    })
    .catch(err => console.log(`Joke already exists, error: ${err}`));
}

const handleJokePost = (req, res, db) => {
    const { jokeid, userid } = req.body;
    db.transaction(trx => {
        db.select('*')
        .from('favourites')
        .where('userid', userid).andWhere('jokeid', jokeid)
        .then(el => {
            if(el.length === 0){
                trx.insert({
                    jokeid: jokeid,
                    userid: userid
                })
                .into('favourites')
                .then(trx.commit)
                .catch(trx.rollback)
            }
        })
    })
    .catch(err => res.status(400).json(`Couldn't set joke to favourites`));
}



module.exports = {
    handleJokeGet: handleJokeGet,
    handleJokePost: handleJokePost
}