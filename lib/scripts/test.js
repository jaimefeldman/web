var $ = window.jQuery
var $nombre = "marvel script"

var MarvelApi = window.MarvelApi

console.log("cargando " + $nombre +" !")

var urlMarvel = 'http://gateway.marvel.com:80/v1/public/series?title=avengers&apikey=7fc2445ad7eaaca3d264f95151c2e64f'
var key = '7fc2445ad7eaaca3d264f95151c2e64f'

var api = new MarvelApi(key)
api.findSeries('avengers')
//Promise.resolve($.get(urlMarvel))
.then((serie) => {
	let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`
	$('.Layout').css('background-image', serieImage)
	var characters = serie.characters.items
	var promises = []
	//for(var i in characters) {
	//	var character = characters[i]
	//	var cahracterURL = character.resourceURI + "?" + key
	//	promises.push(Promise.resolve($.get(cahracterURL)))
	//}
	for(let character of characters) {
		let promise = api.getResourceURI(character.resourceURI)
		promises.push(promise)
	}
	return Promise.all(promises)
})

.then((characters) => {
	return characters.filter((character) => {
		return !!character.thumbnail && !!character.description
	})
})

.then((characters) => {
	$('.Card').each((i, item) => {
		let character = characters[i]
		let $this = $(item)

		let $name = $this.find('.Card-name')
		let $image = $this.find('.Card-image')	
		let $descrip = $this.find('.Card-description')

		$name.text(character.name)
		$image.attr('src', character.thumbnail.path +"."+ character.thumbnail.extension)
		$descrip.text(character.description)



	})
	
	//Promises.all resulve todo lo que hay dentro de una array y cuando este listo devuelve.

})

.catch(function(err){
	debugger
	console.error(err)
})
//pomises estados.
//resolve
//pending
//rejected
//all