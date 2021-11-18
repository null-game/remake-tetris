const pattern = [
	[0, -1, -1, 0, -1],
	[0, -1, 2, -1, 2],
	[0, -2, 1, -2, 1],
	[0, -2, 1, 1, -2],
	[0, 0, -1, 2, 2],
	[0, 0, 0, -1, 2],
	[0, 0, 0, -2, 1],
	[0, 0, 0, 1, -2],
	[0, 0, 0, 2, -1],
	[0, 0, 1, -2, -2],
	[0, 1, -2, -2, 1],
	[0, 1, -2, 1, -2],
	[0, 1, 1, 0, 1],
	[0, 2, -1, 2, -1],
]

const vectorPattern = [
	[
		// Iミノ以外
		[
			// angle: 0
			[Vector2.ZERO, Vector2.RIGHT, Vector2.RIGHT_UP, Vector2.DOWN.times(2), Vector2.RIGHT.add(Vector2.DOWN.times(2))],
			[Vector2.ZERO, Vector2.LEFT, Vector2.ONE.inverse, Vector2.DOWN.times(2), Vector2.LEFT.add(Vector2.DOWN.times(2))],
		],
		[
			// angle: 90
			[Vector2.ZERO, Vector2.RIGHT, Vector2.ONE, Vector2.UP.times(2), Vector2.RIGHT.add(Vector2.UP.times(2))],
			[Vector2.ZERO, Vector2.RIGHT, Vector2.ONE, Vector2.UP.times(2), Vector2.RIGHT.add(Vector2.UP.times(2))],
		],
		[
			// angle: 180
			[Vector2.ZERO, Vector2.LEFT, Vector2.ONE.inverse, Vector2.DOWN.times(2), Vector2.LEFT.add(Vector2.DOWN.times(2))],
			[Vector2.ZERO, Vector2.RIGHT, Vector2.RIGHT_UP, Vector2.DOWN.times(2), Vector2.RIGHT.add(Vector2.DOWN.times(2))],
		],
		[
			// angle: 270
			[Vector2.ZERO, Vector2.LEFT, Vector2.LEFT_DOWN, Vector2.UP.times(2), Vector2.LEFT.add(Vector2.UP.times(2))],
			[Vector2.ZERO, Vector2.LEFT, Vector2.LEFT_DOWN, Vector2.UP.times(2), Vector2.LEFT.add(Vector2.UP.times(2))],
		],
	],
	[
		// Iミノ
		[
			// angle: 0
			[Vector2.ZERO, Vector2.LEFT, Vector2.RIGHT.times(2), Vector2.LEFT.add(Vector2.UP.times(2)), new Vector2(2, 1)],
			[Vector2.ZERO, Vector2.LEFT.times(2), Vector2.RIGHT, new Vector2(-2, 1), Vector2.RIGHT.add(Vector2.UP.times(2))],
		],
		[
			// angle: 90
			[Vector2.ZERO, Vector2.RIGHT.times(2), Vector2.LEFT, new Vector2(2, -1), Vector2.LEFT.add(Vector2.DOWN.times(2))],
			[Vector2.ZERO, Vector2.LEFT, Vector2.RIGHT.times(2), Vector2.LEFT.add(Vector2.UP.times(2)), new Vector2(2, 1)],
		],
		[
			// angle: 180
			[Vector2.ZERO, Vector2.RIGHT, Vector2.LEFT.times(2), Vector2.RIGHT.add(Vector2.DOWN.times(2)), new Vector2(-2, -1)],
			[Vector2.ZERO, Vector2.RIGHT.times(2), Vector2.LEFT, new Vector2(2, -1), Vector2.LEFT.add(Vector2.DOWN.times(2))],
		],
		[
			// angle: 270
			[Vector2.ZERO, Vector2.RIGHT, Vector2.LEFT.times(2), new Vector2(-2, 1), Vector2.RIGHT.add(Vector2.UP.times(2))],
			[Vector2.ZERO, Vector2.LEFT.times(2), Vector2.RIGHT, Vector2.RIGHT.add(Vector2.DOWN.times(2)), new Vector2(-2, -1)],
		],
	],
]