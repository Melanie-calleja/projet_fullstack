var MongoClient = require('mongodb').MongoClient;

var express = require('express');
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(cors())


var hostname = 'localhost';
var port = 3000;

MongoClient.connect('mongodb+srv://admin:rootroot@cluster0.vixc2.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err;
    else {
        var db = client.db('FullStack');
        var ObjectId = require('mongodb').ObjectId; 
        var collection = db.collection('Articles');
        console.log('connecté à la DB');

        app.route('/articles').get(function (req, res, next) {
            collection.find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result)
            })
        })

        app.route('/articles/:id').get(function (req, res, next) {
            collection.findOne({
                _id: new ObjectId(req.params.id)
            }, function (err, result) {
                if (err) throw err;
                res.json(result)
            })
        })

        app.route('/categorie/:categorie').get(function (req, res, next) {
            //var query = { Categorie: "PHP" };
            collection.find({ Categorie: req.params.categorie }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result)
            })
        })

        app.route('/articles').post(function (req, res, next) {
            var myObject = {
                titre: req.body.titre,
                contenu: req.body.contenu,
                Categorie: req.body.Categorie,
                //Date: req.body.Date,
                //Version: req.body.Version,
                //tag: req.body.tag
            }
            collection.insertOne(myObject, function (err, result) {
                if (err) throw err;
                res.json(result)
            })
        })

        app.route('/articles/:id').delete(function (req, res, next) {
            collection.deleteOne({
                _id: new ObjectId(req.params.id)
            }, function (err, result) {
                if (err) throw err;
                res.json(result)
            })
        })

        app.route('/articles/:id').put(function (req, res, next) {
            
            collection.updateOne(
                {"_id": new ObjectId(req.params.id)}, 
                {
                $set: {
                    "nom": req.body.nom,
                    "contenu": req.body.contenu,
                    "Categorie": req.body.Categorie,
                    "Date": req.body.Date,
                    "Version": req.body.Version,
                    "tag": req.body.tag
                },
            }, function (err, result) {
                if (err) throw err;
                res.json(result)
            })
        })

        app.listen(port, hostname, function () {
            console.log('Le serveur tourne sur l\'adresse : http://' + hostname + ':' + port);
        });
    }
})