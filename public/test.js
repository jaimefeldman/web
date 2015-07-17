"use strict";

var $ = window.jQuery;
var $nombre = "marvel script";
var cardArray = window.cardArray = [];

var MarvelApi = window.MarvelApi;

console.log("cargando " + $nombre + " !");

var urlMarvel = "http://gateway.marvel.com:80/v1/public/series?title=avengers&apikey=7fc2445ad7eaaca3d264f95151c2e64f";
var key = "7fc2445ad7eaaca3d264f95151c2e64f";

var api = new MarvelApi(key);
api.findSeries("avengers")
//Promise.resolve($.get(urlMarvel))
.then(function (serie) {
	var serieImage = "url(" + serie.thumbnail.path + "." + serie.thumbnail.extension + ")";
	//con un background de marvel.
	//$('.Layout').css('background-image', serieImage)
	var characters = serie.characters.items;
	var promises = [];
	//for(var i in characters) {
	//	var character = characters[i]
	//	var cahracterURL = character.resourceURI + "?" + key
	//	promises.push(Promise.resolve($.get(cahracterURL)))
	//}
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = characters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _character = _step.value;

			var promise = api.getResourceURI(_character.resourceURI);
			promises.push(promise);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator["return"]) {
				_iterator["return"]();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return Promise.all(promises);
}).then(function (characters) {
	return characters.filter(function (character) {
		return !!character.thumbnail //&& !!character.description
		;
	});
}).then(function (characters) {

	characters = shuffle(characters);
	$(".Card").each(function (i, item) {
		var rand = Math.floor(Math.random() * characters.length - 1);
		if (rand == -1) rand = 0;

		console.log(hola("jaime"));

		var attackPoint = Math.floor(Math.random() * 500) + 500;
		console.log("attack poitn generated :" + parseInt(attackPoint));

		var character = characters[rand];

		//almacenando los characters del tablero en arreglo.
		cardArray[i] = character;

		var $this = $(item);

		var $name = $this.find(".Card-name");
		var $image = $this.find(".Card-image");
		var $descrip = $this.find(".Card-description");
		var $attack = $this.find(".Card-attack");

		$name.text(character.name);
		$image.attr("src", character.thumbnail.path + "." + character.thumbnail.extension);
		$descrip.text(character.description);
		$attack.attr("data-attack", attackPoint);
		$attack.text("Puntos de ataque : " + attackPoint);
	});
})["catch"](function (err) {
	console.error(err);
	debugger;
});
//pomises estados.
//resolve
//pending
//rejected
//all

/*
$(".Card").click((item) => {
	//let text = $(item.target).text()
	let $this = $(item)

	let $cardName = $this.find('.Card-name')
	console.log($cardName.text)
})
*/

//funciana!
/*
$(".Card").click(function(e){
	debugger
	let $this = $(this)
	let cardName = $this.find('.Card-name')
	let cardPoints = $this.find('.Card-attack')

	console.log("has echo click en "+ cardName.text())
	console.log("puntos de ataque : " + cardPoints.data('attack'))
})
*/

//intentando que sea en un sector determiando.
$(".Layout-antagonist").on("click", function (e) {

	var carta = e.target;
	console.log(carta);
	if ($(carta).is(".Card")) {

		var $this = $(e.target.parentNode);
		var nombre = $this.find(".Card-name");
		var points = $this.find(".Card-attack");

		console.log("el nombre de la carta es :" + nombre.text() + " y posee :" + points.data("attack") + " puntos de ataque.");
		debugger;
	}
});

/*
$('body').on('click', function (event) {
	debugger
})
*/
function shuffle(arr) {
	for (var i = 0; i < arr.length; i++) {
		var temp = arr[i];
		var index = Math.floor(Math.random() * arr.length - 1);
		arr[i] = arr[index];
		arr[index] = temp;
	}
	return arr;
}

function changeCard(indice, newCharacter) {
	if (indice <= 0 && indice >= 4) {
		character = cardArray[indice];

		var attackPoint = Math.floor(Math.random() * 500) + 500;

		var $this = $(item);

		var $name = $this.find(".Card-name");
		var $image = $this.find(".Card-image");
		var $descrip = $this.find(".Card-description");
		var $attack = $this.find(".Card-attack");

		$name.text(newCharacter.name);
		$image.attr("src", newCharacter.thumbnail.path + "." + newCharacter.thumbnail.extension);
		$descrip.text(newCharacter.description);
		$attack.attr("data-attack", attackPoint);
		$attack.text("Puntos de ataque : " + attackPoint);
		return this;
	}
}

function hola(mensaje) {
	return "Hola amigo " + mensaje;
}

$(".CharacterForm").on("submit", function (event) {
	event.preventDefault();
	var name = $(this).find(".CharacterForm-name").val();
	api.searchCharacter(name).then(function (character) {
		console.log(character.name);
		console.log(hola(character.name));
		changeCard(0, character);
	});
});

//Promises.all resulve todo lo que hay dentro de una array y cuando este listo devuelve.

//Array.prototype.shuffle =  shuffle