var $ = window.jQuery

class MarvelApi {

	constructor (key) {
		this.key = key
		this.baseURL = 'http://gateway.marvel.com:80/v1/public/'

	}

	findSeries (title) {
		let url  = `${this.baseURL}series?title=${title}&apikey=${this.key}`
		return Promise.resolve($.get(url))
		.then((result)=>{
			return result.data.results[0]
		})
	}

	getResourceURI (resouceURI) {
		let url = `${resouceURI}?apikey=${this.key}`
		return Promise.resolve($.get(url))
		.then((res) => {
			return res.data.results[0]
		})
	}
}

window.MarvelApi = MarvelApi