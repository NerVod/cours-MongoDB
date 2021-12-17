// Mise à jour -> update

// Dans la liste des restaurants
use newyork

// Modifier les restaurants dont la cuisine est Hamburgers pour leur ajouter un champ healthy_food égal à 2
db.restaurants.updateMany(
    { cuisine: "Hamburgers"},           // query
    { $set : { healthy_food: 2}}
)
// Pour les végétariens, leur mettre le champ healthy food à 9. ( Vegetarian )
db.restaurants.updateMany(
    { cuisine: "Vegetarian"},           // query
    { $set : { healthy_food: 9}}
)
// Vérifier ques tous les restaurants ont un tableau grades
db.restaurants.countDocuments();

db.restaurants.find({grades : { $exists :  true }}).count();

db.restaurants.find({grades : { $type:"array" }}).count();

// Supprimer le champ building des restaurants situés dans le Bronx et ajouter un booléen
db.restaurants.updateMany(
    { borough : "Bronx" },
    { 
        $unset : { "address.building" : true},
        $set : { myBool : true}
    }
)
// équivalent avec Update - update étant dépréciée cela n'a plus d'intérêt !

// Vérifier
db.restaurants.findOne({ borough : "Bronx" })

// Ajouter un champ rating à 5 à tous les restaurants
db.restaurants.updateMany(
    {},
    { $set : { rating : 5 }}
)
// Multiplier le champ rating par 2 pour les restaurants situés dans le Queens
db.restaurants.updateMany(
    { borough : "Queens"},
    { $mul : { rating : 2 }}
)
db.restaurants.findOne({ borough : "Queens"})
// Trouver les restaurants de Brooklyn
db.restaurants.find({ borough : "Brooklyn"})
// Limiter les résultats à 100
db.restaurants.find({ borough : "Brooklyn"}).limit(100)
// Puis Appliquer d'abord un count()
db.restaurants.find({ borough : "Brooklyn"}).limit(100).count()
// Puis à la place appliquer un size()
db.restaurants.find({ borough : "Brooklyn"}).limit(100).size()
// Quelle est la différence ?
Les deux méthodes count() et size() tiennent compte de la limite préalable
// Ajouter une entrée au tableau grades pour le restaurant "Tu-Lu'S Gluten-Free Bakery"
db.restaurants.findOne({ name : "Tu-Lu'S Gluten-Free Bakery" })
db.restaurants.updateOne(
    { name : "Tu-Lu'S Gluten-Free Bakery" },                // query 
    { $push : 
        { 
            grades :   
                {
                    date: new Date(),
                    grade: 'A',
                    score: 20
                }
        }
    }     // update
)
// Pour vérifier
db.restaurants.findOne({ name : "Tu-Lu'S Gluten-Free Bakery" })
// Modifier le champ rating pour tous les documents pour qu'il soit égal à la moyenne réelle des grades
// Créer un curseur et le manipuler avec un forEach
var allRestos = db.restaurants.find();
// Je parcours chaque restaurant
allRestos.forEach( oneResto => {
    let avgGrade = 0;
    //print(oneResto.name);
    // Je parcours chaque 'grade' de ce restaurant
    oneResto.grades.forEach( oneGrade => {
        // print(oneGrade.score);
        // On additionne les différents scores
        avgGrade += parseInt(oneGrade.score);
    })
    // print('Total : ' + avgGrade);
    // On divise par le nombre de notes pour avoir la moyenne
    if(oneResto.grades.length == 0){
        avgGrade = 0;
    }else{
       avgGrade = avgGrade / oneResto.grades.length;
    }
    // print('Moyenne : ' + avgGrade);
    // Mettre à jour ce restaurant avec la bonne valeur de rating
    db.restaurants.updateOne(
        { _id : oneResto._id }, 
        { $set : { rating :  avgGrade }}
    )
});

// Pour vérifier
db.restaurants.findOne({ name : "Wild Asia" })

// Quel est le restaurant qui a la meilleure moyenne
db.restaurants.find().sort({ rating : -1}).limit(1)

