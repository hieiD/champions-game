const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/registrarse', function (req, res) {
	let usuario = req.body.usuario;
	let password = req.body.password;
	let contraseinaCifrada = bcrypt.hashSync(password, 10);
	req.app.locals.db
		.collection('usuario')
		.find({ usuario: usuario })
		.toArray(function (err, data) {
			if (err) {
				console.log(err);
				res.send('Error al registrar el usuario');
			} else {
				if (data && data.length > 0) {
					res.send({ mensaje: 'El usuario ya existe' });
				} else {
					req.app.locals.db.collection('usuario').insertOne({ usuario: usuario, password: contraseinaCifrada }, function (err, result) {
						if (err !== undefined) {
							res.send({ mensaje: 'Error al registrar el usuario' });
						} else {
							res.send({ mensaje: 'Usuario registrado correctamente' });
						}
					});
				}
			}
		});
});

router.post('/login', function (req, res) {
	let usuario = req.body.usuario;
	let password = req.body.password;
	req.app.locals.db
		.collection('usuario')
		.find({ usuario: usuario })
		.toArray(function (err, arrayUsuario) {
			if (err !== undefined) {
				res.send({ mensaje: 'Ha habido un error' });
			} else {
				if (arrayUsuario.length > 0) {
					if (bcrypt.compareSync(password, arrayUsuario[0].password)) {
						res.send({ status: 200, mensaje: 'Logueado correctamente' });
					} else {
						res.send({ mensaje: 'Contraseña incorrecta' });
					}
				} else {
					res.send({ mensaje: 'El usuario no existe' });
				}
			}
		});
});

module.exports = router;
