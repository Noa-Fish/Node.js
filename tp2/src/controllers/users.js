const {findOne, insertOne,find,updateOne} = require('../services/db/crud')


async function createUser(req, res, next) {
    try {
        if (await findOne('user',req.body)==null)
        {
            const user = {
                "name": req.body.name,
                "tab_watchlist": req.body.tab_watchlist,
              }
            await insertOne('user', user)
            return res.send("user created")
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

async function findUser(req, res, next) {
    try {
        let name = req.params.name;
        let test = await findOne('user', {"name" : name})
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findUser`);
        console.log(e);
        throw e;
    }
}

async function getAllUsers(req, res, next) {
    try {
        let name = req.params.name;
        let test = await find('user')
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction getAllUsers`);
        console.log(e);
        throw e;
    }
}


async function getAllWatchlist(req, res, next) {
    try {
        let name = req.params.name;
        let test = await findOne('user', {"name" : name})
        return res.send(test.tab_watchlist)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction getAllUsers`);
        console.log(e);
        throw e;
    }
}

async function updateUser(req, res, next) {
    try {
        let name = req.params.name;
        await updateOne('user', {"name" : name}, {$set: {'name': req.body.name}});
        return res.send("user updated")
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction updateUser`);
        console.log(e);
        throw e;
    }
}



  
module.exports = {
      createUser,
      findUser,
      getAllUsers,
      getAllWatchlist,
      updateUser
};

