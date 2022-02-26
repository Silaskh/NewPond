const Show = {}

{

	

	Show.start = ({canvas, context, paused = false, scale = 1.0, speed = 1.0, resize = () => {}, tick = () => {}} = {}) => {
		
		const show = {canvas, context, paused, scale, speed, resize, tick, construct}

		if (document.body === null) {
			addEventListener("load", () => start(show))
		} else {
			start(show)
		}
		
		return show
	}

	const start = (show) => {
		
		// TODO: support canvases of different sizes. just for provided ones? or all?
		if (show.canvas === undefined) {
			document.body.style["margin"] = "0px"
			document.body.style["overflow"] = "hidden"
			document.body.style["background-color"] = Colour.Void

			show.canvas = document.createElement("canvas")
			show.canvas.style["background-color"] = Colour.Void
			show.canvas.style["image-rendering"] = "pixelated"
			document.body.appendChild(show.canvas)
		}

		if (show.context === undefined) {
			show.context = show.canvas.getContext("2d")
		}
		
		const resize = () => {
			show.canvas.width = innerWidth * show.scale
			show.canvas.height = innerHeight * show.scale
			show.canvas.style["width"] = show.canvas.width
			show.canvas.style["height"] = show.canvas.height
			
			const margin = (100 - show.scale*100)/2
			show.canvas.style["margin-top"] = `${margin}vh`
			show.canvas.style["margin-bottom"] = `${margin}vh`
			show.canvas.style["margin-left"] = `${margin}vw`
			show.canvas.style["margin-right"] = `${margin}vw`
			
			show.resize(show.context, show.canvas)
		}

		let t = 0
		const tick = () => {
			
			if (!show.paused) {
				t += show.speed
				while (t > 0) {
					show.tick(show.context, show.canvas)
					t--
				}
			}
			
			requestAnimationFrame(tick)
		}


		addEventListener("resize", resize)
		addEventListener("keydown", (e) => {
			if (e.key === " ") show.paused = !show.paused
		})
		
		resize()
		requestAnimationFrame(tick)
		
	}

}