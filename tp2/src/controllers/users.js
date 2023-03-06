const {findOne, insertOne, } = require('../services/db/crud')


async function createUser(req, res, next) {
    try {
        if (await findOne('user',req.body)==null)
        {
            const user = {
                "name": req.body.name,
                "tab_watchlist": []
              }
            let test = await insertOne('user', user)
            return res.send(test)
        }
        else{
            return res.status(409).send("user already exist")
        }
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction createUser`);
        console.log(e);
        throw e;
        
    }
}

async function findUserWithName(req, res, next) {
    try {
        let test = await findOne('user', {"name" : req.body.name})
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findUser`);
        console.log(e);
        throw e;
    }
}


async function findUserWithId(req, res, next) {
    try {
        let test = await findOne('user', {"_id" : req.body.id})
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findUser`);
        console.log(e);
        throw e;
    }
}


  
module.exports = {
      createUser,
      findUserWithName,
      findUserWithId
};

