// Suppression de documents

// db.collection.deleteOne(query, options)
db.seas.deleteManu({})
// db.collection.deleteMany(query, options)

// Importer le fichier seas.json
mongoimport --db mondial --collection seas --file seas.json
// Suppression de tous les enregistrements (= tous les documents)
use mondial

// Réimporter !! ;-)

// Supprimer l'océan Atlantique
db.seas.find({name : /atlanti/i})
db.seas.deleteOne({name : /atlanti/i})

// Supprimer les mers bordant l'océan atlantique
db.seas.find({bordering : /atlanti/i})
db.seas.deleteMany({bordering : /atlanti/i})

// Quelle est la mer la plus profonde ?
db.seas.find().sort({depth: -1}).limit(1)

// Ajouter la mer 'Océan Atlantique'
db.seas.insertOne({
    secureName: 'sea-Atlantic',
    country: 'F E GBZ IS IRL GB P AG BS BDS CDN USA C WD DOM RH WG KN WL WV TT RA BR RCH ROU FGU GUY SME YV RIM MA WSA ANG RCB NAM ZRE BEN WAN RT RSA CI GH CAM GQ G CV RG LB WAG SN GNB WAL NLSM SMAR SBAR STP PR AXA GUAD MART BVIR MNTS VIRG HELX FALK SPMI BERM TUCA SVAX GROX FARX',
    bordering: 'sea-Mittelmeer sea-Channel sea-Irische_See sea-Nordsee sea-NorwegianSea sea-Greenlandsea sea-LabradorSea sea-Golf_von_Mexiko sea-Caribbean sea-Indic',
    name: 'Atlantic Ocean',
    depth: 9219
  })

// Ajouter un tableau à toutes les mers  
db.seas.updateMany(
    {},  //query
    {$set : {myArray: [] }}
) 

// Quelle est la profondeur cumulée de toutes les mers ?
db.seas.aggregate([
    {$group : {_id : "Allseas", totalDepth : {$sum: "$depth"}}}
])




