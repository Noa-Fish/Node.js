const {findOne, insertOne, } = require('../services/db/crud')


async function createItem(req, res, next) {
    try {
        if (await findOne('item',req.body)==null)
        {
            let test = await insertOne('item', req.body)
            return res.send(test)
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
        let test = await findOne('item', {title : 'titanic'})
        return res.send(test)
        
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findItem`);
        console.log(e);
        throw e;
    }
}


  
module.exports = {
      createItem,
      findItem
};

