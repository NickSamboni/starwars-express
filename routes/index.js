var express = require('express');
var router = express.Router();

var xml = require('object-to-xml');

require('../models/personaje'); 
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
Personaje = mongoose.model('Personaje');

/*var personajes = [
{
  Nombre: 'Darth vader',
  Fuerza: 100,
  Faccion: 'Imperio'
},
{
  Nombre: 'Luke',
  Fuerza: 2,
  Faccion: 'Rebelde'
}
];
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Starwars page', personajes });
  Personaje.find(function (err, personajes) {
    if (err) return next(err);
    res.render('index', { title: 'Starwars page', personajes });
  });
});

router.post('/', function(req, res, next) {

  /*var nuevoPersonaje = {
    Nombre: req.body.nombre,
    Fuerza: req.body.fuerza,
    Faccion: req.body.faccion
  }
  personajes.push(nuevoPersonaje);
  res.redirect('/');*/
  var nuevoPersonaje = new Personaje({ "Nombre": req.body.nombre, "Fuerza": req.body.fuerza, "Faccion": req.body.faccion });
    nuevoPersonaje.save(function(err) {
        if (err) console.log(err);
        res.redirect('/'); 
    });    
});

router.get('/personaje/:ID', function(req, res, next) {	
  var characterID = req.params.ID;
  if (characterID<=personajes.length && characterID>0){
    res.render('personaje', { title: 'Character page', personaje: personajes[characterID-1] });
  }
  else {
    // render the error page
    var err = new Error('Character Not Found');
    err.status = 404;
    next(err);
  }
  }); 

router.post('/personaje/:ID', function(req, res, next) {	
  var characterID = req.params.ID;
  if (characterID<=personajes.length && characterID>0){
	  personajes.splice(characterID-1,1);
	  res.redirect('/');		
  }
  else {
	  // render the error page
    var err = new Error('Character Not Found');
    err.status = 404;
    next(err);
  }
});






router.get('/json', function(req, res, next){
  res.json(personajes);
});

router.get('/xml', function(req, res, next) {
	res.set('Content-Type', 'text/xml');
  res.send(xml({'?xml version="1.0" encoding="utf-8"?' : null, personajes: {"personaje": personajes}}));
});



module.exports = router;
