// Mise à jour -> update

// Dans la liste des restaurants
use newyork

// Modifier les restaurants dont la cuisine est Hamburgers pour leur ajouter un champ healthy_food égal à 2
db.restaurants.updateMany(
    {cuisine: "Hamburgers"},
    {$set : {healthy_food : 2}}
)
db.restaurants.count({cuisine : "Hamburgers"})

// Pour les végétariens, leur mettre le champ healthy food à 9. ( Vegetarian )
db.restaurants.count({cuisine : "Vegetarian"})
db.restaurants.updateMany(
    {cuisine: "Vegetarian"},
    {$set : {healthy_food : 9}}
)

// Vérifier ques tous les restaurants ont un tableau grades
db.restaurants.find(
    {grades : { $exists : false}}
).count()
db.restaurants.find({grades : {$type:"array"}}).count()

// Supprimer le champ building des restaurants situés dans le Bronx et ajouter un booléen
db.restaurants.findOne({borough : "Bronx"})
db.restaurants.updateMany(
    {borough: "Bronx"},
    {
    $unset : { "address.building":""},
    $set : {corporate_buildings: true}
},
)
// équivalent avec Update  // déprécié par MongoDb => plus d'intérêt

// Vérifier

// Ajouter un champ rating à 5 à tous les restaurants
db.restaurants.updateMany(
    {},
    { $set : {rating : 5}}
)

// Multiplier le champ rating par 2 pour les restaurants situés dans le Queens
db.restaurants.updateMany(
    {borough: "Queens"},
    { $mul : {rating : 2}}
)
db.restaurants.find({borough: "Queens"})
// Trouver les restaurants de Brooklyn
db.restaurants.find({borough: "Brooklyn"})

// Limiter les résultats à 100
db.restaurants.find({borough: "Brooklyn"}).limit(100)
// Puis Appliquer d'abord un count()
db.restaurants.find({borough: "Brooklyn"}).limit(100).count()
// Puis à la place appliquer un size()
db.restaurants.find({borough: "Brooklyn"}).limit(100).size()

// Quelle est la différence ?
        // les 2 prennent en compte la limite

// Ajouter une entrée au tableau grades pour le restaurant "Tu-Lu'S Gluten-Free Bakery"
db.restaurants.findOne({name: "Tu-Lu'S Gluten-Free Bakery"})
db.restaurants.updateOne(
    {name: "Tu-Lu'S Gluten-Free Bakery"},
        {$push: {
                grades :
                    {
                        date: new Date(),
                        grade: 'A',
                        score: 20
                    }
                }
        }

);

// Pour vérifier

// Modifier le champ rating pour tous les documents pour qu'il soit égal à la moyenne réelle des grades
// Créer un curseur et le manipuler avec un forEach
var allRestos = db.restaurants.find();
// je parcours chaque restaurant
allRestos.forEach(oneResto => {
    let avgGrade = 0;
    // print(oneResto.name);
    // je parcours chaque 'grade' de ce restaurant
    oneResto.grades.forEach(oneGrade => {
        //print(oneGrade.score);
        // on additionne les différents scores
        avgGrade += parseInt(oneGrade.score);
    })
    // print('Total : ' + avgGrade);
    // On divise par le nombre de notes pour avoir la moyenne
    avgGrade = avgGrade / oneResto.grades.length;
    // print('Moyenne : ' + avgGrade)
    //Mettre à jour ce restaurant avec la bonne valeur de rating
    db.restaurants.updateOne(
        { _id : oneResto._id},
        { $set: { rating : avgGrade }}
    )
});

// Pour vérifier
db.restaurants.findOne({name : "Wild Asia"})



// Quel est le restaurant qui a la meilleure moyenne
db.restaurants.find().sort({rating : -1}).limit(1)

