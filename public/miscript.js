var nombre = 'marvel'
console.log("ejecutando : " + nombre +" script ")

var $ = window.jQuery

$.get('http://gateway.marvel.com:80/v1/public/series?title=avengers&apikey=7fc2445ad7eaaca3d264f95151c2e64f')
.done(function (resolve) {
	debugger
})
