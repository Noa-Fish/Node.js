const {findOne, insertOne, updateOne, } = require('../services/db/crud')
var ObjectId = require ('mongodb').ObjectId

async function createWatchlist(req, res, next) {
    try {
        //si la watchlist n'existe pas
        if (await findOne('watchlist',req.body)==null)
        {
            //alors on la cree
            await insertOne('watchlist', req.body)
            //pour chaque user qui sont dans le tableau tab_users de la watchlist 
            for (let i = 0; i < req.body.tab_users.length; i++) {
                //on ajoute l'id de la watchlist dans le tableau tab_watchlist de l'user
                console.log(req.body.tab_users[i])
                await updateOne('user',{'_id' :new ObjectId(req.body.tab_users[i])}, {$push: {'tab_watchlist': req.body._id}});
            }
            for (let i = 0; i < req.body.tab_items.length; i++) {
                //on ajoute l'id de la watchlist dans le tableau tab_items de l'user
                await updateOne('item',{'_id' :new ObjectId(req.body.tab_items[i])}, {$push: {'tab_watchlist': req.body._id}});
            }
            return res.send("watchlist created")
        }
        else{
            return res.status(409).send("watchlist already exist")
        }
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction createWatchlist`);
        console.log(e);
        throw e;   
    }
}

async function findWatchlist(req, res, next) {
    try {
        let test = await findOne('watchlist', {tab_items : [ObjectId('63dd190b5b24704cd6fb4ce8')]})
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findWatchlist`);
        console.log(e);
        throw e;
    }
}


  
module.exports = {
      createWatchlist,
      findWatchlist
};

