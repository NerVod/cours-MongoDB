
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


// Utilisation de regex dans mongo
// Trouver un film dont le nom contient 'vache' (en utilisant une expression régulière)

// équivalent


// Afficher uniquement le prenom des acteurs de ce film

// Trouver les films dont un acteur s'appelle René
