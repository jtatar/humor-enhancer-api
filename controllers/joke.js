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



module.exports = {
    handleJokeGet: handleJokeGet
}