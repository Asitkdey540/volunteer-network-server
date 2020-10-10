const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r6p6q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;





const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db(process.env.DB_NAME).collection("all-data");
    const volunteercollection = client.db(process.env.DB_NAME).collection("regiter-data");



    // app.post("/addAllData", (req, res) => {
    //     const allData = req.body;
    //     console.log(allData)
    //     collection.insertMany(allData)
    //         .then(result => {
    //             console.log(result)
    //         })
    // })



    // app.get('/opportuniti/:key', (req, res) => {
    //     collection.find({ _id: ObjectId(req.params.key) })
    //         .toArray((err, documents) => {
    //             console.log(documents)
    //             res.send(documents[0])
    //         })
    // })

    app.delete('/cancleActivity/:id', (req, res) => {
        volunteercollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0)
            })
    })


    app.get('/registeredEvents', (req, res) => {
        volunteercollection.find({ email: req.query.email })
            .toArray((err, documents) => {
                // console.log(documents)
                res.send(documents)
            })
    })


    app.post('/addVolunteerEvent', (req, res) => {
        volunteercollection.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get("/getVolunteerData", (req, res) => {
        collection.find({})
            .toArray((err, documents) => {
                // console.log(err)
                res.send(documents)
            })
    })




    console.log("database connected successfully")
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(process.env.PORT || 3003)