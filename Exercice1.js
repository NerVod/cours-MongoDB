// afficher la liste des bdd présentes 
show databases;
// ou
show dbs;

// pour sélectionner une bdd
use videoclub

// pour savoir sur quelle bdd on travaille :
db

// pour lister les collections d'une bdd 
show collections;

// sur une base de données, il y a 4 types d'opérations :
// les CRUD :
C reate : pour insérer des documents - méthode Insert()
R ead : pour lire les documents - méthode find()
U pdate : pour mettre à jour les documents - méthode update()
D elete : pour supprimer des documents - méthode remove()

// Pour insérer un Film
db.films.insert({
    title : "Retour vers le futur",
    length : 127,
})

db.films.insertOne({
    title : "Retour vers le futur 2",
    length : 127,
})
db.films.insertMany([
    {
    title : "Retour vers le futur 3",
    length : 125,
    },
    {
    title : "Mad Max",
    length : 135,
    },
    {
    title : "Mad Max 2",
    length : 132,
    }
])
// autre insertion mais modif titre et durée au lieu title et length
db.films.insertOne({
    titre : "Avatar",
    Duree : 127,
})


// pour lister tous les documents :
db.films.find()

// le shell c'est une console js
let todayDate = new Date();

db.film.insert({
    title: "La vie est un long fleuve tranquille",
    length :111,
    created : todayDate
})

// Insérer un film avec des données plus complexes :
db.film.insertOne({
title :"La vache et le prisonnier",
length :119,
created : todayDate,
actors : [
    { firstname : "Fernandel"}, 
    {firstname: "René", lastname: "Havard"}
],
director : {firstname: "Henri", lastname: "Verneuil"},
releaseYear: 1959
})

// la commande cls permet de nettoyer le shell

//importer le fichier piscine_paris.json
// dans une base de données paris et dans une collection piscine_paris

// pour cela on utilise mongoimport

// doc: mogodb/database-tolls/mongoimport/

synopsis : mongoimport --db <databasename> -- collection <collectionName> --file<pathFile>

// dans le cas du jour à l'ifocop
mongoimport --db paris --collection piscines --file "C:\Users\Stagiaire\Documents\cours-MongoDB\piscines_paris.json"

db.collection.find(query, projection)

// mon argument query va me sercir à limiter les résultats à ceux qui m'intéressent :

// Je souhaite avoir les piscines du 11eme arrondissement :
db.piscines.find({zipCode : 75011})

// la méthode count() permet de compter les résultat
db.piscines.find({zipCode : 75011}).count()
//équivalent à :
db.piscines.count({zipCode : 75011})

// Je souhaite avoir uniquement les champs name 
//et zipCode pour les piscines du 11eme
// La projection limite les champs qui nous sont
//renvoyés par la requête

 
db.piscines.find(
    {zipCode : 75011},              // query
    { name : 1, zipCode : 1}      // projection 1 veut dire true - 0 false 
)
    //le champs _id est malgré tout envoyé
    //si veut l'exclure, ul faut le passer à 0


    //on peut limiter le nombre de résultats envoyés par une requête
    db.piscines.find().limit(5)

    //on peut trier les résultats avec la méthode sort()
    db.piscines.find(
        {},              
        {_id : 0,  name : 1, zipCode : 1}       
    ).sort({zipCode: 1})
    //Dans un tri, 1 = croissant | -1 = décroissant

    //On peut avoir plusieurs tri sur la même requête :
    //on va trier par nom en cas d'égalité sur le zipCode
    db.piscines.find(
        {},              
        {_id : 0,  name : 1, zipCode : 1}       
    ).sort({zipCode: 1, name : 1})

    //L'opérateur $eq
    db.piscines.find({zipCode : { $eq:75011} })
    //est la version longue de 
    db.piscines.count({zipCode : 75011})