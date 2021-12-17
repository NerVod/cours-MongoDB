// Afficher la liste des bdds
show dbs
show databases

// Pour sélectionner une bdd
use videoclub

// UNe bdd de mongo est constituée de collections.
// Les collections contiennent des documents;

// Pour afficher la liste des collections
show collections

// Quand on fait un use xxxxxxx, ca nous instancie un objet db
db

// Sur une base de données, il y a 4 types d'opération : les opérations CRUD
C reate     : pour insérer des documents            - méthode insert()
R ead       : pour lire des documents               - méthode find()
U pdate     : pour mettre à jour des documents      - méthode update()      
D elete     : pour supprimer des documents          - méthode remove()


// Pour insérer un document dans la collection films de la bdd videoclub, on utilise la méthode insert
db.films.insert({
    titre : "Retour vers le futur",
    duree : 127
})

// Pour trouver tous les films
db.films.find()

// Pour faire des insertions multiples => tableau d'objets à notre méthode find()
db.films.insert([
    {
        titre : "Madmax",
        duree : 124
    },
    {
        titre : "Matrix",
        duree : 200
    }
])

// Le client mongo est une console js
let TodayDate = new Date();
db.films.insert(
   {
       titre : "Nouveau titre",
       creation : TodayDate
   } 
)

// On a une méthode qui présente correctment les documents
db.films.findOne()

// Notion de sous-document embarqué (embedded document)
La vache et le prisonnier
119
acteurs
    Fernandel
    René Havard
realisateurs
   Henri Verneuil 
1959

db.films.insert({
    titre : "La vache et le prisonnier",
    duree : 119,
    acteurs : [
        { prenom : "Fernandel" },
        { prenom : "René" , nom : "Havard"}
    ],
     realisateurs : [{ prenom : "Henri" , nom : "Verneuil"}],
     annee_sortie: 1959
})

// La commande cls (clear screen) permet de vider la console
