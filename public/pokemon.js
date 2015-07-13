var $nombre = "jaime"

console.log($nombre)

var $ = window.jQuery
var url = 'http://pokeapi.co/api/v1/pokedex/1/'
Promise.resolve($.get(url))
.then (
	function (results) {
		var character = name
		debugger
	}
)

.catch(function (err) {
	console.log(err)
})
