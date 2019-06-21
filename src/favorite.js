// const getdb = require('./mongodb').getDb;


// class Favorite {
//   constructor(name, id, link, created) {
//     this.name = name;
//     this.id = id;
//     this.link = link;
//     this.created = created;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('favorites')
//     .insertOne(this)
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });

//   }
// }

// module.exports = Favorite;