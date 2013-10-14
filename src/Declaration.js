// 2013 © Axel ЯB
// Licence GPL

// Poles' Declaration

function poleIn(color) {
	this.type = 1
	try {
		this.color = COLORS[Math.floor(color / 6)][color % 6]
	}
	catch (e) {
		this.color = BLANC
	}
}

function poleOut(except) {
	this.type = 2
	this.color  = BLANC
	this.except = COLORS[Math.floor(except / 6)][except % 6]
}

function poleMix() {
	this.type = 5
	this.colorA = BLANC
	this.colorB = BLANC
	this.color1 = BLANC
}

function poleInvert() {
	this.type = 6
	this.color1 = BLANC
	this.colorA = BLANC
}

function poleLight() {
	this.type = 7
	this.color1 = BLANC
	this.colorA = BLANC
}

function poleShadow() {
	this.type = 8
	this.color1 = BLANC
	this.colorA = BLANC
}

function road(code) {
	this.type = 3
	this.code = code
	this.color = BLANC
	this.previous = 0
}
