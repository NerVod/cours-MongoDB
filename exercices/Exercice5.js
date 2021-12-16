// Retrouver les 5 premières piscines par ordre alphabétique ( et dont le champ zipCode existe)
db.piscines
  .find({ zipCode: { $exists: true } })
  .limit(5)
  .sort({ name: 1 });

// Ajoutez 2 piscines avec un champ nom au lieu de name
db.piscines.insertMany([
  {
    id: 6666,
    nom: "PiscineDuTurfu",
    address: "16, rue Robert Tartempion",
    zipCode: 75000,
    lat: 43.8447257,
    lon: 2.6,
  },
  {
    id: 7777,
    nom: "PiscineDuRetourDuTurfu",
    address: "16, rue Robert Zemeckis",
    zipCode: 75002,
    lat: 45.8447257,
    lon: 2.69,
  },
]);

// Si je compte mes piscines, j'en ai donc 33
db.piscines.find().count();

// Compter uniquement les piscines dont le champ name est présent
db.piscines.find({ name: { $exists: true } });

// équivalent à

// Renvoie toutes les piscines ayant effectivement le champ name

// Limite à 5 résultats
db.piscines.find({ name: { $exists: true } }).limit(5);
// En plus en limitant les champs retournés au nom
db.piscines.find({ name: { $exists: true } }, { _id: 0, name: 1 }).limit(5);
// En les triant par ordre alphabétique (case sensitive)
db.piscines
  .find({ name: { $exists: true } }, { _id: 0, name: 1 })
  .limit(5)
  .sort({ name: 1 });
