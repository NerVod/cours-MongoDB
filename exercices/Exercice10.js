// Aggrégation

// Importer dans une base le fichier website.json
mongoimport --file website.json --db websites --collection sites

use websites
// Quel est l'hébergeur qui héberge le plus de sites ?

db.sites.aggregate([
    {$match :{}}, // je travaille sur otus les documents
    {$group: {_id: "$hebergeur",nbSites: {$sum : 1} } },
    // je regroupe tous mes documents en fonction de l'hébergeur.
    //j'ajoute un champs collection temporaire nbSites qui 
    //va faire +1 à chaque fois qu'il va aggréger un document
    {$sort : {nbSites: -1}},  // tri ordre décroissant
    {$limit : 1}    // vérouille réponse au premier
])



// Pour l'hébergeur gandi, quel site a le plus de traffic
db.sites.find({hebergeur :"Gandi"}).sort({traffic :-1})

// Le tri n'est pas cohérent car le traffic est un string...
// On va modifier nos documents pour que le traffic soit un entier
// avec un update
db.sites.find().forEach(oneSite => {
    oneSite.traffic = parseInt(oneSite.traffic);
    db.sites.updateOne(
        {_id: oneSite._id},         //query
        {$set : {traffic : oneSite.traffic}}  //update
    )
});

// équivalent avec le save()


// Quel est le traffic cumulé pour chaque hébergeur ? Qui est le premier ?
db.sites.aggregate([
    {$match :{} },
    {$group : {_id :"$hebergeur", trafficTotal : { $sum : "$traffic"}}},
    {$sort : {trafficTotal : -1}},
    {limit :1}
])

//Quel est le traffic cumulé de tous les hébergeurs ?

db.sites.aggregate ([
    {$group: { _id : "unSuperIdUnique", trafficTotal : { $sum : "$traffic"} } },
])

// Quelle est la moyenne des likes par hébergeur ?
// Voir les opérateurs d'aggregation : 
https://docs.mongodb.com/manual/reference/operator/aggregation/


// les likes sont aussi en string, on les passe en int

// possibilité 1 : on modifie le document pouer les changer en int
db.sites.find().forEach(oneSite => {
    oneSite.likes = parseInt(oneSite.likes);
    db.sites.updateOne(
        {_id: oneSite._id},         //query
        {$set : {likes : oneSite.likes}}  //update
    )
});

//possibilité 2 :  on utilise l'opérateur $toInt dans l'aggrégation 
db.sites.aggregate([
    {$group : {_id : "$hebergeur", avgLikes : {$avg : {$toInt : "likes"}}} }
])

//  avec la méthode save()

// On peut maintenant calculer la moyenne
//avec la possibilité 1 :
db.sites.aggregate([
    {$group : {_id : "$hebergeur", avgLikes : {$avg : "$likes"}} }
])

// Augmenter de 50 likes les sites de Gandi 
db.sites.updateMany(
    {hebergeur : "Gandi"},   // query
    { $inc : { likes :50}}   // umdate
)


// exporter dans un fichier newwebsite.json le contenu de notre collection
// Se placer dans un terminal du système hôte (PAS le shell mongo)

mongoexport --help // pour accéder à la documentation


mongoexport --out 20211220_export_websites.json --db websites --collection sites
// Cela permet de faire des sauvegardes ...



