const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/obtener', function (req, res) {
	let usuario = req.query.usuario;
	req.app.locals.db
		.collection('campeon')
		.find({ usuario: usuario })
		.toArray(function (err, data) {
			if (data && data.length > 0) {
				res.send({
					existe: true,
					campeon: data[0],
				});
			} else {
				res.send({ existe: false });
			}
		});
});

router.post('/crear', function (req, res) {
	let clase = req.body.clase;
	let experiencia = req.body.experiencia;
	let usuario = req.body.usuario;
	req.app.locals.db.collection('campeon').insertOne({ usuario: usuario, clase: clase, experiencia: experiencia });
	res.send({ mensaje: 'Campeón creado' });
});

router.put('/actualizar', function (req, res) {
	let experiencia = req.body.experiencia;
	let usuario = req.body.usuario;

	req.app.locals.db.collection('campeon').updateOne({ usuario: usuario }, { $set: { experiencia: experiencia } });
	res.send({ mensaje: 'Campeón actualizado' });
});
