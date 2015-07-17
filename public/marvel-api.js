"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window.jQuery;

var MarvelApi = (function () {
	function MarvelApi(key) {
		_classCallCheck(this, MarvelApi);

		this.key = key;
		this.baseURL = "http://gateway.marvel.com:80/v1/public/";
	}

	_createClass(MarvelApi, [{
		key: "searchCharacter",
		value: function searchCharacter(nombre) {
			var url = this.baseURL + "characters?name=" + nombre + "&apikey=" + this.key;

			return Promise.resolve($.get(url)).then(function (res) {
				return Promise.resolve(res.data.results[0]);
			})
			/*	otra forma de hacer promesas funciona igual que la anterior.
   return new Promise(function(done){
   	$.get(url).done(function(data){
   		done(data)
   	})
   })
   */
			;
		}
	}, {
		key: "findSeries",
		value: function findSeries(title) {
			var url = this.baseURL + "series?title=" + title + "&apikey=" + this.key;
			if (localStorage[url]) {
				var datos = localStorage[url];
				datos = JSON.parse(datos);
				console.log("obteniendo los datos de la cache del navegador : " + datos);
				return Promise.resolve(datos);
			}
			return Promise.resolve($.get(url)).then(function (res) {
				var datos = res.data.results[0];
				datos = JSON.stringify(datos);
				localStorage[url] = datos;
				console.log("obteniendo datos de la url y almacenandolos en la cache" + datos);
				return Promise.resolve(datos);
			});
		}
	}, {
		key: "getResourceURI",
		value: function getResourceURI(resouceURI) {
			var url = resouceURI + "?apikey=" + this.key;
			if (localStorage[url]) {
				var datos = localStorage[url];
				datos = JSON.parse(datos);
				console.log("obteniendo datos de la cache del navegaror..");
				return Promise.resolve(datos);
			}

			return Promise.resolve($.get(url)).then(function (res) {
				var datos = res.data.results[0];
				datos = JSON.stringify(datos);
				localStorage[url] = datos;
				console.log("obteniendo los datos de la url de marvel y almacenandolos en la cache.. ");
				return Promise.resolve(datos);
			});
		}
	}]);

	return MarvelApi;
})();

window.MarvelApi = MarvelApi;