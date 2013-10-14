// 2013 © Axel ЯB
// Licence GPL

// JSON Map

var LEVELS = [

// Vert
'[[],[],[null,null,null,null,null,{"type":2,"except":9}],[null,null,null,null,null,{"type":3,"code":"tb","color":"#fff4ca","previous":0}],[null,null,null,null,{"type":3,"code":"rb","color":"#fff4ca","previous":0},{"type":5,"colorA":"#fff4ca","colorB":"#fff4ca","color1":"#fff4ca"}],[null,null,null,null,{"type":3,"code":"tb","color":"#fff4ca","previous":0},{"type":3,"code":"tb","color":"#fff4ca","previous":0}],[null,null,null,null,{"type":3,"code":"tb","color":"#fff4ca","previous":0},{"type":1,"color":"#fff4ca"}],[null,null,null,null,{"type":1,"color":"#fff4ca"}],[],[]]',

// Rouge
'[[],[],[null,null,null,null,null,null,null,{"type":2,"except":6}],[null,null,null,null,null,null,null,{"type":3,"code":"tb"}],[null,null,null,null,null,null,{"type":3,"code":"rb"},{"type":5}],[null,null,null,null,null,null,{"type":3,"code":"tb"},{"type":3,"code":"tb"}],[null,null,null,null,null,null,{"type":1},{"type":1}],[],[],[]]',

// Orange Violet
'[[],[],[null,null,null,null,{"type":2,"except":7},null,null,null,null,{"type":2,"except":11}],[null,null,null,null,{"type":3,"code":"tb"},null,null,null,null,{"type":3,"code":"tb"}],[null,null,null,{"type":3,"code":"rb"},{"type":5},null,null,null,{"type":3,"code":"rb"},{"type":5}],[null,null,null,{"type":3,"code":"tb"},{"type":3,"code":"tr"},{"type":3,"code":"lr"},{"type":3,"code":"lrb"},{"type":3,"code":"lr"},{"type":3,"code":"tl"},{"type":3,"code":"tb"}],[null,null,null,{"type":1},null,null,{"type":1},null,null,{"type":1}],[],[],[]]',

// Orange (sans rouge)
'[[],[],[],[null,null,null,null,null,null,{"type":2,"except":7}],[null,null,null,null,null,null,{"type":3,"code":"tb"}],[null,null,null,null,{"type":3,"code":"rb"},{"type":3,"code":"lr"},{"type":5}],[null,null,null,null,{"type":3,"code":"tb"},null,{"type":3,"code":"tb"}],[null,null,null,null,{"type":1},null,{"type":1}],[],[]]',

// Violet Vert (sans jaune)
'[[],[],[null,null,null,null,null,{"type":2,"except":11},null,null,null,{"type":2,"except":9}],[null,null,null,{"type":3,"code":"rb"},{"type":3,"code":"lb"},{"type":3,"code":"tb"},null,null,null,{"type":3,"code":"tb"}],[null,null,null,{"type":3,"code":"tb"},{"type":3,"code":"tr"},{"type":5},null,{"type":3,"code":"rb"},{"type":3,"code":"lr"},{"type":5}],[null,null,null,{"type":3,"code":"tb"},null,{"type":3,"code":"trb"},{"type":3,"code":"lr"},{"type":3,"code":"tl"},null,{"type":3,"code":"tb"}],[null,null,null,{"type":3,"code":"tb"},null,{"type":1},null,null,null,{"type":1}],[null,null,null,{"type":1}],[],[]]',

// Rouge clair
'[[],[],[],[null,null,null,null,null,null,{"type":2,"except":0}],[null,null,null,null,null,null,{"type":3,"code":"tb"}],[null,null,null,null,null,null,{"type":3,"code":"tb"}],[null,null,null,null,null,null,{"type":3,"code":"tb"}],[null,null,null,null,null,null,{"type":1}],[],[]]',

// Rose
'[[],[],[],[null,null,null,null,null,null,{"type":2,"except":5}],[null,null,null,null,null,null,{"type":7}],[null,null,null,null,{"type":3,"code":"rb"},{"type":3,"code":"lr"},{"type":5}],[null,null,null,null,{"type":3,"code":"tb"},null,{"type":3,"code":"tb"}],[null,null,null,null,{"type":1},null,{"type":3,"code":"tb"}],[null,null,null,null,null,null,{"type":1}],[]]',

] // /!\

var MENUS = [
	['poleIn(6)',	'poleIn(8)',	'poleIn(10)'],		// Vert
	['poleIn(6)',	'poleIn(8)',	'poleIn(10)'],		// Rouge
	['poleIn(6)',	'poleIn(8)',	'poleIn(10)'],		// Orange Violet
	['poleIn(8)',	'poleIn(10)',	'poleInvert()', 	'road("tb")'],	// Orange (sans rouge)
	['poleIn(6)',	'poleIn(10)',	'poleInvert()', 	'road("tb")'],	// Violet Vert (sans jaune)
	['poleIn(6)',	'poleIn(8)',	'poleIn(10)',	'poleLight()',	'road("tb")'],	// Rouge clair
	['poleIn(6)',	'poleIn(8)',	'poleIn(10)',	'poleLight()',	'road("tb")'],	// Rose
] // /!\

// Vert
var Level = 0
