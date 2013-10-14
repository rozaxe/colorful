// 2013 © Axel ЯB
// Licence GPL

var BLANC = '#ffea75'

var COLORS = [
	// Red        Orange     Yellow     Green       Blue       Violet
	['#ff6772', '#fd9745', '#fff071', '#90fd5b', '#26c4ff', '#ff90fb'],
	['#f00b2c', '#f87308', '#ffe400', '#61e620', '#076dea', '#f105cd'],
	['#ca0828', '#db6200', '#d1bb00', '#3fbc02', '#0854b2', '#ba09b8']
]

var MARRONS = '#804020'

var COLUMNS = 14
var LINES   = 10

var Ready = false
var Canvas
var Context
var Menu


// Load Images
var Images = []
var Loaded = 0
var Total = 18
loadImage('in')
loadImage('invert')
loadImage('lb')
loadImage('light')
loadImage('lr')
loadImage('lrb')
loadImage('lose')
loadImage('mix')
loadImage('out')
loadImage('play')
loadImage('rb')
loadImage('shadow')
loadImage('tb')
loadImage('tl')
loadImage('tlb')
loadImage('tlr')
loadImage('tlrb')
loadImage('tr')
loadImage('trb')
loadImage('win')

function loadImage(name) {
	Images[name] = new Image()
	Images[name].onload = function() {
		resourceLoaded()
	}
	Images[name].src = 'img/' + name + '.png'
}

function resourceLoaded() {
	++Loaded
	if (Loaded == Total) {
		game_ready()
	}
}

// Map Data
var Map

// 0 > Editor
// 1 > Placement
// 2 > Playing
var States

function prepare_map() {

	var json = JSON.parse(LEVELS[Level - 1])

	Map = []
	for (var i = 0 ; i < LINES ; ++i) {
		Map.push([])
	}
	Map.input = []
	Map.output = []

	for (var y = 0 ; y < LINES ; ++y) {
		for (var x = 0 ; x < COLUMNS ; ++x) {
			if (!json[y][x])
				continue

			switch (json[y][x].type) {
				// In
				case 1:
					Map[y][x] = new poleIn(json[y][x].color)
					Map.input.push({y: y, x: x})
					break
				// Out
				case 2:
					Map[y][x] = new poleOut(json[y][x].except)
					Map.output.push({y: y, x: x})
					break
				// Road
				case 3:
					Map[y][x] = new road(json[y][x].code)
					break
				// Mix
				case 5:
					Map[y][x] = new poleMix()
					break
				// Invert
				case 6:
					Map[y][x] = new poleInvert()
					break
				// Light
				case 7:
					Map[y][x] = new poleLight()
					break
				// Shadow
				case 8:
					Map[y][x] = new poleShadow()
					break
			}
		}
	}

	States = 1

}

function end_map() {
	var okay = true
	Map.output.forEach(function(cell) {
		if (Map[cell.y][cell.x].except != Map[cell.y][cell.x].color)
			okay = false
	})
	States = 3
	draw_end(okay)
}

// Play Map
function play_map() {
	var tmp = []
	Map.next.forEach(function(cell) {
		drawPole(cell.y, cell.x)
		nextWalk(tmp, cell.y, cell.x)
	})
	Map.next = []
	tmp.forEach(function(elem) {
		Map.next.push(elem)
	})
	if (Map.next.length > 0)
		setTimeout(play_map, 500)
	else
		end_map()
}

function click_menu(x) {
	// Play
	if (x == 8) {
		if (States == 2)
			return

		States = 2
		Map.next = []

		Map.input.forEach(function(elem) {
			if (Map[elem.y][elem.x].color != BLANC)
				Map.next.push({y: elem.y, x: elem.x})
		})

		play_map()
	} else {
		Menu.selected = Menu.propose[x]
	}
}

function click_grid(y, x) {
	if (States == 2) // Running map
			return

	if (Map[y][x] && Map[y][x].type == 1 && Menu.selected.type == 1) { // In
		Map[y][x].color = Menu.selected.color
		Menu.selected = {}
		draw_update()
	} else if (Map[y][x] && Map[y][x].code == 'tb' && Menu.selected.type != 1) { // Road
		Map[y][x].type = Menu.selected.type
		if (Menu.selected.code)
			Map[y][x].code = Menu.selected.code
		Menu.selected = {}
		draw_update()
	}
}

function click_canvas(event) {
	var mouseX = event.pageX - Canvas.offsetLeft
	var mouseY = event.pageY - Canvas.offsetTop

	if (States == 3) { // Ending game
		if (134 <= mouseX && mouseX <= 198)
			retry_lvl()
		else if (230 <= mouseX && mouseX <= 294)
			next_lvl()
	}

	if (mouseY > 320)
		click_menu(Math.floor(mouseX / 50))
	else
		click_grid(Math.floor(mouseY / 32), Math.floor(mouseX / 32))
}

function retry_lvl() {
	prepare_map()
	// Draw background
	draw_update()
}

function next_lvl() {
	if (LEVELS[Level])
		++Level

	document.getElementsByTagName('h1')[0].innerHTML = 'Level ' + Level
	parent.location.hash = Level;

	prepare_map()
	// Draw background
	draw_update()
}

function game_ready() {

	if (!Ready) {
		Ready = true
		return
	}

	prepare_map()

	// Draw background
	draw_update()

	// Draw menu
	draw_menu()

}

window.onload = function() {

	Canvas = document.getElementById('game')
	Canvas.width  = COLUMNS * 32
	Canvas.height = LINES * 32 + 50

	Canvas.addEventListener('click', click_canvas, false)

	Context = Canvas.getContext('2d')

	var lvl = 0
	var parts = window.location.href.replace(/.*#(\d)$/gi, function(m, number) {
		lvl = parseInt(number)
	});


	if (LEVELS[lvl - 1])
		Level = lvl
	else
		Level = 1

	document.getElementsByTagName('h1')[0].innerHTML = 'Level ' + Level
	parent.location.hash = Level;

	game_ready()

}
