// Retrouver les 5 premières piscines par ordre alphabétique ( et dont le champ zipCode existe)
db.piscines.find(
    { zipCode: { $exists: 1} },
    { name: 1 , zipCode: 1, _id :0 }    
).sort({name : 1 }).limit(5)
// Ajoutez 2 piscines avec un champ nom au lieu de name
db.piscines.insert([
    { nom : "L'amarre aux canards"},
    { nom : "La patte aux geoires"}
])

// Si je compte mes piscines, j'en ai donc 33
db.piscines.count()
// Compter uniquement les piscines dont le champ name est présent
db.piscines.count({ name : { $exists: true}})
// équivalent à
db.piscines.find({ name : { $exists: true}}.count()
// Renvoie toutes les piscines ayant effectivement le champ name
db.piscines.find({ name : { $exists: true}})
// Limite à 5 résultats
db.piscines.find({ name : { $exists: true}}).limit(5)
// En plus en limitant les champs retournés au nom
db.piscines.find({ name : { $exists: true}}, {name:1, _id:0})
// En les triant par ordre alphabétique (case sensitive)
db.piscines.find({ name : { $exists: true}}, {name:1, _id:0}).sort({ name :1 })