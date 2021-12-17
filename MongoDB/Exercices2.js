// Importer le fichier piscine_paris.json 
// dans une base de données paris et dans une collection piscine_paris

// Pour cela, on a l'utilitaire mongoimport

// Voir doc : https://docs.mongodb.com/database-tools/mongoimport/

Synopsis : mongoimport --db <databasename> --collection <collectionName> --file <pathToFile>

Dans mon cas : 
mongoimport --db paris --collection piscines --file "C:\Users\Prof\Downloads\piscines_paris.json"


// La méthode find()

https://docs.mongodb.com/manual/reference/method/db.collection.find/

db.collection.find(query, projection)

// Mon argument query va me servir à limiter les résultats à ceux qui m'intéressent

// Je souhaite avoir les piscines du 11ème arrondissement :
db.piscines.find({ zipCode : 75011 })

// La méthode count() permet de compter nos résultats
db.piscines.find({ zipCode : 75011 }).count()
// équivalent à 
db.piscines.count({ zipCode : 75011 })

// Je souhaite avoir uniquement les champs name et ezipCode poru les piscines du 11ème
// C'est là qu'intervient la projection
// La projection à limiter les champs qui nous sont renvoyés par la requête
db.piscines.find(
    { zipCode : 75011 },                    // query
    { name: 1, zipCode : 1}                 // projection :  1 veut dire true - 0 false
)

// Le champ _id est malgré tout renvoyé.
// Si on veut vraiment l'exlure, il faut le passer à 0
db.piscines.find(
    { zipCode : 75011 },                 // query
    { _id: 0, name: 1, zipCode : 1}      // projection :  1 veut dire true - 0 false
)

// On peut limiter le nombre de résultats renvoyés par une requête
db.piscines.find().limit(5)

// On peut trier les résultats avec la mtéthode sort()
db.piscines.find(
    { },                 // query
    { _id: 0, name: 1, zipCode : 1}      // projection :  1 veut dire true - 0 false
).sort({zipCode: 1})
// Dans un tri, 1 = croissant | -1 = décroissant

// On peut avoir plusieurs tris sur la même requpte : 
// on va trier par nom en cas d'égalité sur le zipCode :
db.piscines.find(
    { },                 // query
    { _id: 0, name: 1, zipCode : 1}      // projection :  1 veut dire true - 0 false
).sort({zipCode: 1, name: 1})

// L'opérateur $eq 

db.piscines.find({ zipCode : { $eq: 75011 } })
// est la version longue de 
db.piscines.find({ zipCode : 75011 })
