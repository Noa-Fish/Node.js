const {findOne, insertOne,updateOne } = require('../services/db/crud')


async function createItem(req, res, next) {
    try {
        if (await findOne('item',req.body)==null)
        {
            const items = {
                "title": req.body.title,
                "tab_watchlist": req.body.tab_watchlist,
                "etat": req.body.etat, 
              }
            await insertOne('item', items)
            return res.send("item created")
        }
        else{
            return res.status(409).send("item already exist")
        }
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction createItem`);
        console.log(e);
        throw e;
    }
}

async function findItem(req, res, next) {
    try {
        let title = req.params.title;
        let test = await findOne('item', {"title" : title})
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findItem`);
        console.log(e);
        throw e;
    }
}

async function updateItem(req, res, next) {
    try {
        let title = req.params.title;
        await updateOne('item', {"title" : title}, {$set: {'etat': req.body.etat}});
        return res.send("item updated")
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction updateItem`);
        console.log(e);
        throw e;
    }
}
 
async function addWatchlist (req, res, next) {
    try {
        let name = req.params.name;
        let watchlist = await findOne('watchlist', {"name" : name})
        let item = await findOne('item', {"title" :  req.body.title})

        await updateOne('item', {"title" : item.title}, {$push: {'tab_watchlist': watchlist._id}});

        await updateOne('watchlist', {"name" : watchlist.name}, {$push: {'tab_items': item._id}});
        return res.send("item added")
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction addWatchlist`);
        console.log(e);
        throw e;
    }
}


module.exports = {
      createItem,
      findItem,
      updateItem,
      addWatchlist
};

