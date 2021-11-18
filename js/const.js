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
			[Vector2.ZERO, Vector2.RIGHT, new Vector2(1, -1), new Vector2(0, 2), new Vector2(1, 2)],
			[Vector2.ZERO, Vector2.LEFT, new Vector2(-1, -1), new Vector2(0, 2), new Vector2(-1, 2)],
		],
		[
			// angle: 90
			[Vector2.ZERO, Vector2.RIGHT, new Vector2(1, 1), new Vector2(0, -2), new Vector2(1, -2)],
			[Vector2.ZERO, Vector2.RIGHT, new Vector2(1, 1), new Vector2(0, -2), new Vector2(1, -2)],
		],
		[
			// angle: 180
			[Vector2.ZERO, Vector2.LEFT, new Vector2(-1, -1), new Vector2(0, 2), new Vector2(-1, 2)],
			[Vector2.ZERO, Vector2.RIGHT, new Vector2(1, -1), new Vector2(0, 2), new Vector2(1, 2)],
		],
		[
			// angle: 270
			[Vector2.ZERO, Vector2.LEFT, new Vector2(-1, 1), new Vector2(0, -2), new Vector2(-1, -2)],
			[Vector2.ZERO, Vector2.LEFT, new Vector2(-1, 1), new Vector2(0, -2), new Vector2(-1, -2)],
		],
	],
	[
		// Iミノ
		[
			// angle: 0
			[Vector2.ZERO, Vector2.LEFT, new Vector2(2, 0), new Vector2(-1, -2), new Vector2(2, 1)],
			[Vector2.ZERO, new Vector2(-2, 0), new Vector2(1, 0), new Vector2(-2, 1), new Vector2(1, -2)],
		],
		[
			// angle: 90
			[Vector2.ZERO, new Vector2(2, 0), new Vector2(-1, 0), new Vector2(2, -1), new Vector2(-1, 2)],
			[Vector2.ZERO, Vector2.LEFT, new Vector2(2, 0), new Vector2(-1, -2), new Vector2(2, 1)],
		],
		[
			// angle: 180
			[Vector2.ZERO, Vector2.RIGHT, new Vector2(-2, 0), new Vector2(1, 2), new Vector2(-2, -1)],
			[Vector2.ZERO, new Vector2(2, 0), new Vector2(-1, 0), new Vector2(2, -1), new Vector2(-1, 2)],
		],
		[
			// angle: 270
			[Vector2.ZERO, Vector2.RIGHT, new Vector2(-2, 0), new Vector2(-2, 1), new Vector2(1, -2)],
			[Vector2.ZERO, new Vector2(-2, 0), new Vector2(1, 0), new Vector2(1, 2), new Vector2(-2, -1)],
		],
	],
]