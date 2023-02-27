document.querySelector('#registrarse').addEventListener('click', function () {
	let data = {
		usuario: document.querySelector('#usuario').value,
		password: document.querySelector('#password').value,
	};
	if (!!data.usuario && !!data.usuario.trim() && !!data.password && !!data.password.trim()) {
		fetch('http://localhost:3000/usuarios/registrarse', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((resp) => resp.json())
			.then((res) => {
				document.querySelector('#respuesta').classList.remove('hidden');
				document.querySelector('#respuesta').innerHTML = res.mensaje;
				setTimeout(function () {
					document.querySelector('#respuesta').classList.add('hidden');
				}, 5000);
			});
	}
});

document.querySelector('#login').addEventListener('click', function () {
	let data = {
		usuario: document.querySelector('#usuarioLogin').value,
		password: document.querySelector('#contrasenaLogin').value,
	};
	if (!!data.usuario && !!data.usuario.trim() && !!data.password && !!data.password.trim()) {
		fetch('http://localhost:3000/usuarios/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((resp) => resp.json())
			.then((res) => {
				if (res.status === 200) {
					window.location = window.location.origin + '/public/juego.html?usuario=' + data.usuario;
				} else {
					console.log('error');
					document.querySelector('#respuesta').classList.remove('hidden');
					document.querySelector('#respuesta').innerHTML = res.mensaje;
					setTimeout(function () {
						document.querySelector('#respuesta').classList.add('hidden');
					}, 5000);
				}
			});
	}
});
