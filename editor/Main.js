// 2013 © Axel ЯB
// Licence GPL

var COLUMNS = 14
var LINES   = 10

// Pole Declaration

function poleIn(color) {
	this.type = 1
	this.color = color
}

function poleOut(except) {
	this.type = 2
	this.except = except
}

function poleMix() {
	this.type = 5
}

function poleInvert() {
	this.type = 6
}

function poleLight() {
	this.type = 7
}
function poleShadow() {
	this.type = 8
}

function road(code) {
	this.type = 3
	this.code = code
}

// Valid grid

function valid() {
	var level = []

	for (var y = 0 ; y < LINES ; ++y) {
		level.push([])
		for (var x = 0 ; x < COLUMNS ; ++x) {

			var carac = map[y][x].value.replace(/\s+/g, '')

			// If Output
			if (!isNaN(parseInt(carac))) {
				level[y][x] = new poleOut(parseInt(carac))
				continue
			}

			// If Other
			switch (carac) {
				case '□':
					level[y][x] = new poleIn()
					break

				case '╣':
					level[y][x] = new poleMix()
					break

				case '◘':
					level[y][x] = new poleInvert()
					break

				case '☼':
					level[y][x] = new poleLight()
					break

				case '●':
					level[y][x] = new poleShadow()
					break

				case '─':
					level[y][x] = new road('lr')
					break

				case '│':
					level[y][x] = new road('tb')
					break

				case '┌':
					level[y][x] = new road('rb')
					break

				case '┐':
					level[y][x] = new road('lb')
					break

				case '└':
					level[y][x] = new road('tr')
					break

				case '┘':
					level[y][x] = new road('tl')
					break

				case '├':
					level[y][x] = new road('trb')
					break

				case '┤':
					level[y][x] = new road('tlb')
					break

				case '┬':
					level[y][x] = new road('lrb')
					break

				case '┴':
					level[y][x] = new road('tlr')
					break

				case '┼':
					level[y][x] = new road('tlrb')
					break

			}
		}
	}
	document.getElementById('result').value = JSON.stringify(level)

}

var map = []

window.onload = function() {

	var grid = document.getElementById('grid')

	for (var y = 0 ; y < LINES ; ++y) {

		map.push([])

		for (var x = 0 ; x < COLUMNS ; ++x) {
			var input = document.createElement('input')
			map[y][x] = input
			grid.appendChild(input)
		}

		grid.appendChild(document.createElement('br'))
	}

	document.getElementById('submit').addEventListener('click', valid, false)

}
