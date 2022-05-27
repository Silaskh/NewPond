
const CODE_LENGTH = 6
const NEIGHBOURHOOD_SIZE = 5
const NEIGHBOURHOOD_COUNT = parseInt(["1"].repeat(CODE_LENGTH).join(""), 2) + 1
const CELL_SIZE = 28
const MARGIN = CELL_SIZE

const NEIGHBOURHOOD_MAP = [

	/*0, 1, 0,
	1, 2, 1,
	0, 1, 0,*/

	0, 1, 3, 1, 0,
	1, 2, 4, 2, 1,
	3, 4, 5, 4, 3,
	1, 2, 4, 2, 1,
	0, 1, 3, 1, 0,

	/*0, 1, 3, 6, 3, 1, 0,
	1, 2, 4, 7, 4, 2, 1, 
	3, 4, 5, 8, 5, 4, 3, 
	6, 7, 8, 9, 8, 7, 6,
	3, 4, 5, 8, 5, 4, 3,
	1, 2, 4, 7, 4, 2, 1,
	0, 1, 3, 6, 3, 1, 0,*/
]

const global = {
	currentNeighbourhood: 0,
	currentX: MARGIN,
	currentY: MARGIN,
	i: 0,
	x: 0,
	y: 0,
	show: Show.start({paused: false, speed: 1.0, paused: true}),
}

const drawNeighbourhood = (context, neighbourhood, offsetX, offsetY) => {

	context.shadowOffsetX = 0
	context.shadowOffsetY = 0

	let i = 0
	for (let x = 0; x < NEIGHBOURHOOD_SIZE; x++) {
		for (let y = 0; y < NEIGHBOURHOOD_SIZE; y++) {
			drawCell(context, neighbourhood, i, x, y, offsetX, offsetY)
			i++
		}
	}

	context.fillStyle = Colour.White
	context.shadowColor = Colour.Black
	context.shadowOffsetX = 5
	context.shadowOffsetY = 5
	const size = 120
	context.font = `bold ${size}px Rosario`

	const X = offsetX
	const Y = offsetY
	const metric = context.measureText(neighbourhood)
	context.fillText(neighbourhood, X - metric.actualBoundingBoxRight/2 + CELL_SIZE/2*5, Y + CELL_SIZE*5 - metric.fontBoundingBoxDescent - size/10)
}

const drawCell = (context, neighbourhood, i, x, y, offsetX, offsetY) => {
	

	const cells = neighbourhood.toString(2, CODE_LENGTH).split("").map(c => parseInt(c))

	const id = NEIGHBOURHOOD_MAP[i]
	const cell = cells[id]
	context.fillStyle = cell === 1? Colour.Blue : Colour.Grey

	const X = x * CELL_SIZE + offsetX
	const Y = y * CELL_SIZE + offsetY

	//print(X, Y)

	context.fillRect(X, Y, CELL_SIZE, CELL_SIZE)
}

global.show.resize = (context) => {
	context.fillStyle = Colour.multiply(Colour.Blue, {lightness: 0.5})
	context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

global.show.tick = (context) => {

	/*if (global.currentNeighbourhood >= NEIGHBOURHOOD_COUNT) {
		global.currentNeighbourhood = 0
	} 
	drawNeighbourhood(context, global.currentNeighbourhood, global.currentX, global.currentY)
	global.currentNeighbourhood++
	*/

	if (global.currentNeighbourhood >= NEIGHBOURHOOD_COUNT) return

	drawNeighbourhood(context, global.currentNeighbourhood, global.currentX, global.currentY)
	//drawCell(context, global.currentNeighbourhood, global.i, global.x, global.y, global.currentX, global.currentY)

	global.i++
	global.x++
	if (global.x >= NEIGHBOURHOOD_SIZE) {
		global.x = 0
		global.y++
		if (global.y >= NEIGHBOURHOOD_SIZE) {
			global.y = 0
			global.i = 0
			global.currentNeighbourhood++
			global.currentX += CELL_SIZE * NEIGHBOURHOOD_SIZE + MARGIN
			if (global.currentX >= context.canvas.width - CELL_SIZE*NEIGHBOURHOOD_SIZE - MARGIN) {
				global.currentX = MARGIN
				global.currentY += CELL_SIZE * NEIGHBOURHOOD_SIZE + MARGIN
			}
		}
	}

	//print(global.currentNeighbourhood)

	/*global.currentNeighbourhood++
	global.currentX += CELL_SIZE * NEIGHBOURHOOD_SIZE + MARGIN
	if (global.currentX >= context.canvas.width - CELL_SIZE*NEIGHBOURHOOD_SIZE - MARGIN) {
		global.currentX = MARGIN
		global.currentY += CELL_SIZE * NEIGHBOURHOOD_SIZE + MARGIN
	}*/
}
