"use strict";

var $ = window.jQuery;
var $nombre = "marvel script";

var MarvelApi = window.MarvelApi;

console.log("cargando " + $nombre + " !");

var urlMarvel = "http://gateway.marvel.com:80/v1/public/series?title=avengers&apikey=7fc2445ad7eaaca3d264f95151c2e64f";
var key = "7fc2445ad7eaaca3d264f95151c2e64f";

var api = new MarvelApi(key);
api.findSeries("avengers")
//Promise.resolve($.get(urlMarvel))
.then(function (serie) {
	var serieImage = "url(" + serie.thumbnail.path + "." + serie.thumbnail.extension + ")";
	$(".Layout").css("background-image", serieImage);
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
			var character = _step.value;

			var promise = api.getResourceURI(character.resourceURI);
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

	$(".Card").each(function (i, item) {
		var rand = Math.floor(Math.random() * characters.length - 1);
		if (rand == -1) rand = 0;

		var attackPoint = Math.floor(Math.random() * 500) + 500;
		console.log("attack poitn generated :" + parseInt(attackPoint));

		var character = characters[rand];
		var $this = $(item);

		var $name = $this.find(".Card-name");
		var $image = $this.find(".Card-image");
		var $descrip = $this.find(".Card-description");
		var $attack = $this.find(".Card-attack");

		$name.text(character.name);
		$image.attr("src", character.thumbnail.path + "." + character.thumbnail.extension);
		$descrip.text(character.description);
		$attack.text("Puntos de ataque : " + attackPoint);
	});
})["catch"](function (err) {
	debugger;
	console.error(err);
});
//Promises.all resulve todo lo que hay dentro de una array y cuando este listo devuelve.

//pomises estados.
//resolve
//pending
//rejected
//all