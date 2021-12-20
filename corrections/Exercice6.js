
// Revenez sur la base "videoclub"

use videoclub

db.films.insert({
    titre : "La vache et le prisonnier",
    duree : 119,
    acteurs : [
        { prenom: "Fernandel"},
        { prenom : "René", nom : "Havard" }
    ],
    realisateur : { prenom : "Henri", nom : " Verneuil"},
    annee_sortie : 1959
})

db.films.insert({ titre : "Titanic"})
db.films.insert([{ titre : "MadMax"}, { titre : "Matrix"}])

// expressions régulières
// En vanilla js
const paragraph = "La vache et le prisonnier. vache";
const regex = /vache/;
const found = paragraph.match(regex);
found

// Utilisation de regex dans mongo
// Trouver un film dont le nom contient 'vache' (en utilisant une expression régulière)
use videoclub
db.films.find({ title : { $regex : /vache/}})
// équivalent (avec l'opérateur $regex sous-entendu)
db.films.find({ title : /VaCHe/i}) // i est le flag insensitive pour faire une recherche non sensible à la casse

// Afficher uniquement le prenom des acteurs de ce film
db.films.find(
    { title : /VaCHe/i},        // query
    { "actors.firstname" : 1 }  // projection
)

// Trouver les films dont un acteur s'appelle René
db.films.find(
    { "actors.firstname" : /rené/i },
)