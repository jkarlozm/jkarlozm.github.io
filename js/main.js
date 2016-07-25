$(document).ready(function(){
	var banner = {
		padre: $('#banner'),
		// Accede a los elementos hijos de banner que tengan la clase slide y los cuenta.
		numeroSlide: $('#banner').children('.slide').length,
		// Inicia en la posicion uno.
		posicion: 1
	};

	var info = {
		padre: $('#info'),
		// Accede a los elementos hijos de banner que tengan la clase slide y los cuenta.
		numeroSlide: $('#info').children('.slide').length,
		// Inicia en la posicion uno.
		posicion: 1
	};

	/*
		Accedemos al primer hijo que tenga la clase slide y cambiamos
		el valor de la propiedad "left"
	*/
	banner.padre.children('.slide').first().css({
		'left': 0
	});

	info.padre.children('.slide').first().css({
		'left': 0
	});

	// Función calcular el alto del slider.
	var altoBanner = function(){
		var alto = banner.padre.children('.slide').outerHeight();
		banner.padre.css({
			'height' : alto + "px"
		});
	};

	var altoInfo = function(){
		var alto = info.padre.children('.active').outerHeight();
		info.padre.animate({
			'height' : alto + "px"
		});
	};

	//	Centramos el contenido de manera Vertical.	
	var altoContenedor = function(){
		var altoVentana = $(window).height();

		if(altoVentana <= $('#contenedor').outerHeight() + 200){
			$('#contenedor').css({
				'height': ''
			});
		}
		else{
			$('#contenedor').css({
				'height': altoVentana + 'px'
			});
		}
	}

	altoBanner();
	altoInfo();
	altoContenedor();

	// Cuando la ventana cambie de tamañon ejecutamos la funcion altoBaner.
	$(window).resize(function(){
		altoBanner();
		altoInfo();
		altoContenedor();
	});

	//	Por cada elemento que tenga '#info' ejecutaremos la función y agregaremos una etiqueta 'span'
	$('#info').children('.slide').each(function(){
		$('#botones').append('<span>');
	});

	//	Al primer elemento de #botones le agregamos la class=active.
	$('#botones').children('span').first().addClass('active');

	// --------------------------------------
	// ------- Banner
	// --------------------------------------

	// Botón siguiente

	$('#bannerNext').on('click', function(e){
		e.preventDefault(); // Evitamos que agrege # a la URL

		
		if(banner.posicion < banner.numeroSlide){			
			
			/*
				Los elementos hijos que no tengan class=active reiniciamos
				su posicion de origen.
			*/
			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			/*
				Nos posicionamos en el elemento con id=banner y class=active
				para quitarle la clase, nos movemos al siguiente elemento agregamos class=active
				y por ultimo animamos el desplazamiento de la imagen.
			*/		

			$('#banner .active').removeClass('active').next().addClass('active').animate({
				'left': '0'
			});

			// Desplazamos la imagen que se esta mostrando junto con la nueva imagen a mostrar.
			$('#banner .active').prev().animate({
				'left': '-100%'
			});

			banner.posicion += 1;
		} else{
			// La ultima imagen la desplzamos a la izquierda para darle lugar a la primera.
			$('#banner .active').animate({
				'left': '-100%'
			});
			
			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#banner .active').removeClass('active');
			banner.padre.children('.slide').first().addClass('active').animate({
				'left': '0'
			});
			banner.posicion = 1;
		}
	});

	// Botón anterior

	$('#bannerPrev').on('click', function(e) {
		e.preventDefault();

		if (banner.posicion > 1) {			
			/*
				Todos los elementos que no tengan la class=active los desplazamos
				hacia la izquierda.
			*/
			banner.padre.children().not('.active').css({
				'left': '-100%'
			});

			// Animamos elemento de izquierda a derecha.
			$('#banner .active').animate({
				'left': '100%'
			});

			// Animamos elemento de derecha a izquierda.
			$('#banner .active').removeClass('active').prev().addClass('active').animate({
				'left': '0'
			});

			banner.posicion = banner.posicion - 1;
		} else {

			/*	Todos los elementos que no tengan la class=active los desplazamos
			del lado izquierdo de la pantalla. */
			banner.padre.children().not('.active').css({
				'left':'-100%'
			});

			//	Animación de imagen de izquierda a derecha.
			$('#banner .active').animate({
				'left': '100%',
			});

			$('#banner .active').removeClass('active');
			banner.padre.children().last().addClass('active').animate({
				'left': '0'
			});

			banner.posicion = banner.numeroSlide;
		}
	});

	// --------------------------------------
	// ------- Información
	// --------------------------------------

	// Botón siguiente

	$('#infoNext').on('click', function(e){
		e.preventDefault(); // Evitamos que agrege # a la URL

		
		if(info.posicion < info.numeroSlide){			
			
			/*
				Los elementos hijos que no tengan class=active reiniciamos
				su posicion de origen.
			*/
			info.padre.children().not('.active').css({
				'left': '100%'
			});

			/*
				Nos posicionamos en el elemento con id=info y class=active
				para quitarle la clase, nos movemos al siguiente elemento agregamos class=active
				y por ultimo animamos el desplazamiento del div.
			*/		

			$('#info .active').removeClass('active').next().addClass('active').animate({
				'left': '0'
			});

			// Desplazamos el div que se esta mostrando junto con el nuevo div a mostrar.
			$('#info .active').prev().animate({
				'left': '-100%'
			});

			$('#botones').children('.active').removeClass('active').next().addClass('active');

			info.posicion += 1;
		} else{
			// El ultimo div lo desplzamos a la izquierda para darle lugar al primero.
			$('#info .active').animate({
				'left': '-100%'
			});
			
			info.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#info .active').removeClass('active');
			info.padre.children('.slide').first().addClass('active').animate({
				'left': '0'
			});

			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').first().addClass('active');

			info.posicion = 1;
		}

		altoInfo();
	});

	// Botón anterior

	$('#infoPrev').on('click', function(e) {
		e.preventDefault();

		if (info.posicion > 1) {			
			/*
				Todos los elementos que no tengan la class=active los desplazamos
				hacia la izquierda.
			*/
			info.padre.children().not('.active').css({
				'left': '-100%'
			});

			// Animamos elemento de izquierda a derecha.
			$('#info .active').animate({
				'left': '100%'
			});

			// Animamos elemento de derecha a izquierda.
			$('#info .active').removeClass('active').prev().addClass('active').animate({
				'left': '0'
			});

			$('#botones').children('.active').removeClass('active').prev().addClass('active');

			info.posicion = info.posicion - 1;
		} else {

			/*	Todos los elementos que no tengan la class=active los desplazamos
			del lado izquierdo de la pantalla. */
			info.padre.children().not('.active').css({
				'left':'-100%'
			});

			//	Animación del div de izquierda a derecha.
			$('#info .active').animate({
				'left': '100%',
			});

			$('#info .active').removeClass('active');
			info.padre.children().last().addClass('active').animate({
				'left': '0'
			});

			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').last().addClass('active');

			info.posicion = info.numeroSlide;
		}

		altoInfo();
	});
});