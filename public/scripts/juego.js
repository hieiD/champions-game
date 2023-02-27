let url = window.location.search;
let urlParams = new URLSearchParams(url);
let usuario = urlParams.get('usuario');

fetch(
	'http://localhost:3000/campeones/obtener?' +
		new URLSearchParams({
			usuario: usuario,
		})
)
	.then((res) => res.json())
	.then((resp) => {
		if (resp.existe === true) {
			let bloqueCampeon = document.querySelector('.campeon');
			let datosCampeon = resp.campeon;
			let clase = datosCampeon.clase;
			let experiencia = datosCampeon.experiencia;
			document.querySelector('.claseImg').setAttribute('src', `imagenes/${clase}.png`);
			document.querySelector('.clase').innerHTML = clase;
			document.querySelector('.usuario').innerHTML = usuario;
			document.querySelector('.experiencia').innerHTML = experiencia;
			bloqueCampeon.classList.remove('hidden');
		} else {
			let bloqueCampeones = document.querySelector('.elegir');
			bloqueCampeones.classList.remove('hidden');
		}
	});

document.querySelectorAll('.botonElegir').forEach(function (boton) {
	boton.addEventListener('click', function () {
		let clase = this.id;
		let miCampeon = new Object();
		let experiencia = 0;
		miCampeon.usuario = usuario;
		miCampeon.clase = clase;
		miCampeon.experiencia = experiencia;

		fetch('http://localhost:3000/campeones/crear', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(miCampeon),
		})
			.then((resp) => resp.json())
			.then((res) => {
				let bloqueCampeones = document.querySelector('.elegir');
				bloqueCampeones.classList.add('hidden');
				document.querySelector('.claseImg').setAttribute('src', `imagenes/${clase}.png`);
				document.querySelector('.clase').innerHTML = clase;
				document.querySelector('.usuario').innerHTML = usuario;
				document.querySelector('.experiencia').innerHTML = experiencia;
				let campeonSeleccionado = document.querySelector('.campeon');
				campeonSeleccionado.classList.remove('hidden');
			});
	});
});

document.querySelector('.mision').addEventListener('click', function () {
	let barraExperiencia = new Object();
	let experiencia = document.querySelector('.experiencia').innerHTML;

	barraExperiencia.usuario = usuario;
	let experienciaGanada = Math.floor(Math.random() * 100);
	barraExperiencia.experiencia = experienciaGanada;
	barraExperiencia.experiencia += parseInt(experiencia);

	fetch('http://localhost:3000/campeones/actualizar', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(barraExperiencia),
	})
		.then((resp) => resp.json())
		.then((resp) => {
			console.log(resp);
			document.querySelector('.experiencia').innerHTML = barraExperiencia.experiencia;
			document.querySelector('.misionInfo').innerHTML = 'Has completado la misión! Has ganado ' + experienciaGanada + ' puntos de exp.';
		});
});
