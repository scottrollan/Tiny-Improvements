const Kudos = require('../models/Kudos');
const Users = require('../models/User')

module.exports = function (app) {
    app.get('/api/kudos', function(req, res) {
        Kudos.find({}).then(function (data) {
            res.json(data);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.post('/api/kudos', function (req, res) {
        Kudos.create(req.body).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.put('/api/kudos/:id', function(req,res){
        Kudos.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
        .then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json(err)
        })
    });    
    
    app.delete('/api/kudos/:id', function(req,res){
        Kudos.deleteOne({_id: req.params.id})
        .then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json(err)
        })
    });

    app.get('/api/users', function(req, res) {
        Users.find({}).then(function (data) {
            res.json(data);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.get('/api/users/:id', function(req, res) {
        Users.findOne({_id: req.params.id}).then(function (data) {
            res.json(data);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.post('/api/users', function (req, res) {
        Users.create(req.body).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
    });
    app.delete('/api/users/:id', function(req,res){
        Users.deleteOne({_id: req.params.id})
        .then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json(err)
        });
    });
}