// 2013 © Axel ЯB
// Licence GPL

function findColor(color) {
	var x = 0
	var y = 0
	for (var i = 0 ; i < COLORS.length ; ++i) {
		x = COLORS[i].indexOf(color)
		if (x != -1) {
			y = i
			break
		}
	}
	console.log(y +' '+x)
	return [y, x]
}

function calculMixedColor(y, x) {
	var current = Map[y][x]
	if (current.colorA == BLANC)
		current.color1 = current.colorB
	else if (current.colorB == BLANC)
		current.color1 = current.colorA
	else {

		var a  = 0
		var lA = 0
		var b  = 0
		var lB = 0

		var tmp = findColor(current.colorA)
		lA = tmp[0]
		a = tmp[1]
		var tmp = findColor(current.colorB)
		lB = tmp[0]
		b = tmp[1]

		if (a > b) {
			var c = b
			b = a
			a = c
		}

		var c = b - a
		var lC = 0

		if (lA == (lB - 1))
			lC = lB
		else if (lA == lB)
			lC = lA
		else if (lA == (lB + 1))
			lC = lA
		else
			lC = 1

		if (c == 0)
			current.color1 = COLORS[lC][a]
		else if ((b % 2) == 1)
			current.color1 = MARRONS
		else if (c == 4)
			current.color1 = COLORS[lC][5]
		else if (c == 2)
			current.color1 = COLORS[lC][a + 1]
		else
			current.color1 = MARRONS
	}
}

function calculInvertColor(y, x) {
	var current = Map[y][x]
	var tmp = findColor(current.colorA)
	var i = tmp[0]
	var j = tmp[1]
	if (j == -1)
		current.color1 = MARRONS
	else
		current.color1 = COLORS[i][(j + 3) % 6]
}

function calculLightColor(y, x) {
	var current = Map[y][x]
	var tmp = findColor(current.colorA)
	var i = tmp[0] == 0 ? 0 : (tmp[0] - 1)
	var j = tmp[1]
	current.color1 = COLORS[i][j]
}

function calculShadowColor(y, x) {
	var current = Map[y][x]
	var tmp = findColor(current.colorA)
	var i = tmp[0] == 2 ? 2 : (tmp[0] + 1)
	var j = tmp[1]
	current.color1 = COLORS[i][j]
}

// Get After Pole

function updateAfter(y, x, color, previous) {
	switch(Map[y][x].type) {

		// Output
		case 2:
			Map[y][x].color = color
			break

		// Road
		case 3:
			Map[y][x].color = color
			Map[y][x].previous = previous
			break

		// Mix
		case 5:
			if (previous == 4) {
				Map[y][x].colorA = color
			} else if (previous == 8) {
				Map[y][x].colorB = color
			}
			calculMixedColor(y, x)
			break

		// Invert
		case 6:
			Map[y][x].colorA = color
			calculInvertColor(y, x)
			break

		// Light
		case 7:
			Map[y][x].colorA = color
			calculLightColor(y, x)
			break

		// Shadow
		case 8:
			Map[y][x].colorA = color
			calculShadowColor(y, x)
			break
	}
}

function getAfterRoad(tmp, y, x) {
	var current = Map[y][x]
	if (current.code.indexOf('t') != -1 && current.previous != 2) {
		updateAfter(y-1, x, current.color, 8)
		tmp.push({y: y-1, x: x})
	}
	if (current.code.indexOf('l') != -1 && current.previous != 4) {
		updateAfter(y, x-1, current.color, 6)
		tmp.push({y: y, x: x-1})
	}
	if (current.code.indexOf('r') != -1 && current.previous != 6) {
		updateAfter(y, x+1, current.color, 4)
		tmp.push({y: y, x: x+1})
	}
	if (current.code.indexOf('b') != -1 && current.previous != 8) {
		updateAfter(y+1, x, current.color, 2)
		tmp.push({y: y+1, x: x})
	}

}

function getAfterInput(tmp, y, x) {
	updateAfter(y-1, x, Map[y][x].color, 8)
	tmp.push({y: y-1, x: x})
}

function getAfterMix(tmp, y, x) {
	updateAfter(y-1, x, Map[y][x].color1, 8)
	tmp.push({y: y-1, x: x})
}

function getAfterInvert(tmp, y, x) {
	updateAfter(y-1, x, Map[y][x].color1, 8)
	tmp.push({y: y-1, x: x})
}

function getAfterSimple(tmp, y, x) {
	updateAfter(y-1, x, Map[y][x].color1, 8)
	tmp.push({y: y-1, x: x})
}

// Map Walk update

function nextWalk(tmp, y, x) {
	switch (Map[y][x].type) {

		case 1:
			getAfterInput(tmp, y, x)
			break

		case 3:
			getAfterRoad(tmp, y, x)
			break

		// Mix
		case 5:

		// Invert
		case 6:

		// Light
		case 7:

		// Shadow
		case 8:
			getAfterSimple(tmp, y, x)
			break
	}
}
