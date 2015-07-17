var $ = window.jQuery

class MarvelApi {

	constructor (key) {
		this.key = key
		this.baseURL = 'http://gateway.marvel.com:80/v1/public/'

	}

	findSeries (title) {
		let url  = `${this.baseURL}series?title=${title}&apikey=${this.key}`
			if(localStorage[url]) {
				let datos = localStorage[url]
				datos = JSON.parse(datos)
				console.log("obteniendo los datos de la cache del navegador : " + datos)	
				return Promise.resolve(datos)
			}
			return Promise.resolve($.get(url))
			.then((res) => {
				let datos = res.data.results[0]
				datos = JSON.stringify(datos)
				localStorage[url] = datos
				console.log("obteniendo datos de la url y almacenandolos en la cache" + datos)
				return Promise.resolve(datos)
			})

	}

	getResourceURI (resouceURI) {
		let url = `${resouceURI}?apikey=${this.key}`
		if(localStorage[url]) {
			let datos = localStorage[url]
			datos = JSON.parse(datos)
			console.log("obteniendo datos de la cache del navegaror..")
			return Promise.resolve(datos)
		}

		return Promise.resolve($.get(url))
		.then((res) => {
			let datos = res.data.results[0]
			datos = JSON.stringify(datos)
			localStorage[url] = datos
			console.log("obteniendo los datos de la url de marvel y almacenandolos en la cache.. ")
			return Promise.resolve(datos)
		})
	}
}

window.MarvelApi = MarvelApi