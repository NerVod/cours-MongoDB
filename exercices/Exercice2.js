/*Les piscines de Paris */

// Importer nos documents dans une base de données paris, dans une collections, depius le fichier piscines_paris.json

mongoimport --db nom_de_la_base --collection nom_de_la_collection --file chemin/vers/le/fichier/a/importer

Dans mon cas : 
mongoimport --db paris --collection piscines --file "C:\Users\virtuoworks\Desktop\Mongo\DIWJS14\Données\piscines_paris.json"

// Sur PC : il est dans C:\Program Files\MongoDB\Server\4.4\bin
// Sur mac : il est dans /usr/local/opt/mongodb-database-tools/bin/
show dbs 
use paris
show collections


// Pour compter les éléments
db.piscines.find().count()
// ou
db.piscines.count()

// On va s'inétresser à la méthode find()
// https://docs.mongodb.com/manual/reference/method/db.collection.find/ 

// db.collection.find(query, projection)


// Pour les piscines du 11ème
db.piscines.find({ zipCode : 75011 })
// Pour les piscines du 11ème, n'affichez que les champs nom et code postal
// Je dois utiliser le deuxième argument de la méthode find : la projection
db.piscines.find(
    { zipCode : 75011 },        // query
    { zipCode : 1, name : 1 }   // projection (limiter les champs affichés)
)

// Par défaut, le champ _id est présent. Il faut l'exclure explicitement
db.piscines.find(
    { zipCode : 75011 },        // query
    { zipCode : 1, name : 1, _id : 0 }   // projection (limiter les champs affichés)
)

// La projection à 0 exclut les champs de l'affichage - les autres sont affichés
db.piscines.find(
    { zipCode : 75011 },        // query
    { zipCode : 0, name : 0, _id : 0 }   // projection (limiter les champs affichés)
)

// Pour limiter le nombre de résultats, on utilise
db.piscines.find().limit(4)
// Pour trier par nom
db.piscines.find().sort({ name : 1 })
// 1 représente le tri croissant
// -1 représente le tri décroissant 

// Pour "sauter" des résultats, on utilise
db.piscines.find().limit(4).skip(3)
db.piscines.find().skip(3).limit(4)

// L'opérateur $eq 
db.piscines.find({ zipCode : 75011 })
// est en fait la requête 
db.piscines.find({ zipCode : { $eq : 75011 }})








