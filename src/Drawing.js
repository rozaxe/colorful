// 2013 © Axel ЯB
// Licence GPL

// Drawing functions
function drawInput(y, x) {
	if (Map[y][x].color == BLANC)
		return
	Context.fillStyle = Map[y][x].color
	//console.log(Map[y][x].color)
	Context.fillRect(x * 32 + 11, y * 32 + 11, 10, 10)
	if (States < 2)
		return
	Context.fillRect(x * 32 + 11, y * 32, 10, 4)
}

function drawOuput(y, x) {
	Context.fillStyle = Map[y][x].except
	Context.fillRect(x * 32 + 11, y * 32 + 11, 10, 10)
	if (States < 2)
		return
	Context.fillStyle = Map[y][x].color
	Context.fillRect(x * 32 + 11, y * 32 + 28, 10, 4)
}

function drawRoad(y, x) {
	Context.fillStyle = Map[y][x].color
	Context.fillRect(x * 32 + 11, y * 32 + 11, 10, 10)
	var code = Map[y][x].code
	if(code.indexOf('t') != -1)
		Context.fillRect(x * 32 + 11, y * 32, 10, 11)
	if(code.indexOf('l') != -1)
		Context.fillRect(x * 32, y * 32 + 11, 11, 10)
	if(code.indexOf('r') != -1)
		Context.fillRect(x * 32 + 21, y * 32 + 11, 11, 10)
	if(code.indexOf('b') != -1)
		Context.fillRect(x * 32 + 11, y * 32 + 21, 10, 11)
}

function drawMix(y, x) {
	if (Map[y][x].colorA != BLANC) {
		Context.fillStyle = Map[y][x].colorA
		Context.fillRect(x * 32, y * 32 + 11, 4, 10)
	}
	if (Map[y][x].colorB != BLANC) {
		Context.fillStyle = Map[y][x].colorB
		Context.fillRect(x * 32 + 11, y * 32 + 28, 10, 4)
	}
	Context.fillStyle = Map[y][x].color1
	Context.fillRect(x * 32 + 11, y * 32, 10, 4)
}

function drawInvert(y, x) {
	Context.fillStyle = Map[y][x].colorA
	Context.fillRect(x * 32 + 11, y * 32 + 28, 10, 4)
	Context.fillStyle = Map[y][x].color1
	Context.fillRect(x * 32 + 11, y * 32, 10, 4)
}

function drawSimple(y, x) {
	Context.fillStyle = Map[y][x].colorA
	Context.fillRect(x * 32 + 11, y * 32 + 28, 10, 4)
	Context.fillStyle = Map[y][x].color1
	Context.fillRect(x * 32 + 11, y * 32, 10, 4)
}

function drawPole(y, x) {
	switch(Map[y][x].type) {
		case 1:
			drawInput(y, x)
			break
		case 2:
			drawOuput(y, x)
			break
		case 3:
			drawRoad(y, x)
			break
		case 5:
			drawMix(y, x)
			break
		case 6:
			//drawInvert(y, x)
			//break
		case 7:
			//drawLight(y, x)
			//break
		case 8:
			drawSimple(y, x)
			break
	}
}

function draw_background() {
	for (var y = 0 ; y < LINES ; ++y) {
		for (var x = 0 ; x < COLUMNS ; ++x) {
			if (!Map[y][x])
				continue
			var img
			switch (Map[y][x].type) {
				case 1:
					img = 'in'
					break
				case 2:
					img = 'out'
					break
				case 3:
					img = Map[y][x].code
					break
				case 5:
					img = 'mix'
					break
				case 6:
					img = 'invert'
					break
				case 7:
					img = 'light'
					break
				case 8:
					img = 'shadow'
					break
			}
			Context.drawImage(Images[img], x*32, y*32)
			if (img == 'in')
				drawInput(y, x)
			if (img == 'out')
				drawOuput(y, x)
		}
	}
}

function draw_update() {
	Context.fillStyle = BLANC
	Context.fillRect(0, 0, Canvas.width, LINES * 32)
	draw_menu()
	draw_background()
}

function draw_menu() {

	// Draw Menu
	Context.fillStyle = '#f7f7f7'
	Context.fillRect(0, LINES * 32, Canvas.width, 50)
	Context.fillStyle = '#2b1210'
	Context.fillRect(0, LINES * 32, Canvas.width, 1)
	Menu.propose.forEach(function(elem, index) {
		switch (elem.type) {
			case 1: // Input
				Context.fillStyle = elem.color
				Context.fillRect(index * 50 + 9, 9 + LINES * 32, 32, 32)
				break
			case 3: // Road
				Context.drawImage(Images['tb'], index * 50 + 9, 9 + LINES * 32)
				break
			case 6: // Invert
				Context.drawImage(Images['invert'], index * 50 + 9, 9 + LINES * 32)
				break
			case 7: // Light
				Context.drawImage(Images['light'], index * 50 + 9, 9 + LINES * 32)
				break
			case 8: // Shadow
				Context.drawImage(Images['shadow'], index * 50 + 9, 9 + LINES * 32)
				break
		}
	})

	Context.drawImage(Images['play'], 409, 329)
}

function draw_selected(x) {
	draw_menu()
	Context.drawImage(Images['select'], x * 50 + 16, 9 + 24 + LINES * 32)
}

function draw_end(win) {
	if (win)
		Context.drawImage(Images[(Level == LEVELS.length) ? 'end' : 'win'], 118, 86)
	else
		Context.drawImage(Images['lose'], 118, 86)
}
