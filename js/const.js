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
	{
		// Iミノ以外
		0: {
			LEFT: [Vector2.ZERO, Vector2.RIGHT, Vector2.RIGHT_UP, Vector2.DOWN.times(2), Vector2.add(Vector2.RIGHT, Vector2.DOWN.times(2))],
			RIGHT: [Vector2.ZERO, Vector2.LEFT, Vector2.ONE.inverse, Vector2.DOWN.times(2), Vector2.add(Vector2.LEFT, Vector2.DOWN.times(2))],
		},
		90: {
			LEFT: [Vector2.ZERO, Vector2.RIGHT, Vector2.ONE, Vector2.UP.times(2), Vector2.add(Vector2.RIGHT, Vector2.UP.times(2))],
			RIGHT: [Vector2.ZERO, Vector2.RIGHT, Vector2.ONE, Vector2.UP.times(2), Vector2.add(Vector2.RIGHT, Vector2.UP.times(2))],
		},
		180: {
			LEFT: [Vector2.ZERO, Vector2.LEFT, Vector2.ONE.inverse, Vector2.DOWN.times(2), Vector2.add(Vector2.LEFT, Vector2.DOWN.times(2))],
			RIGHT: [Vector2.ZERO, Vector2.RIGHT, Vector2.RIGHT_UP, Vector2.DOWN.times(2), Vector2.add(Vector2.RIGHT, Vector2.DOWN.times(2))],
		},
		270: {
			LEFT: [Vector2.ZERO, Vector2.LEFT, Vector2.LEFT_DOWN, Vector2.UP.times(2), Vector2.add(Vector2.LEFT, Vector2.UP.times(2))],
			RIGHT: [Vector2.ZERO, Vector2.LEFT, Vector2.LEFT_DOWN, Vector2.UP.times(2), Vector2.add(Vector2.LEFT, Vector2.UP.times(2))],
		},
	},
	[
		// Iミノ
		{
			// angle: 0
			LEFT: [Vector2.ZERO, Vector2.LEFT, Vector2.RIGHT.times(2), Vector2.add(Vector2.LEFT, Vector2.UP.times(2)), Vector2.add(Vector2.RIGHT.times(2), Vector2.DOWN)],
			RIGHT: [Vector2.ZERO, Vector2.LEFT.times(2), Vector2.RIGHT, Vector2.add(Vector2.LEFT.times(2), Vector2.DOWN), Vector2.add(Vector2.RIGHT, Vector2.UP.times(2))],
		},
		{
			// angle: 90
			LEFT: [Vector2.ZERO, Vector2.RIGHT.times(2), Vector2.LEFT, Vector2.add(Vector2.RIGHT.times(2), Vector2.UP), Vector2.add(Vector2.LEFT, Vector2.DOWN.times(2))],
			RIGHT: [Vector2.ZERO, Vector2.LEFT, Vector2.RIGHT.times(2), Vector2.add(Vector2.LEFT, Vector2.UP.times(2)), Vector2.add(Vector2.RIGHT.times(2), Vector2.DOWN)],
		},
		{
			// angle: 180
			LEFT: [Vector2.ZERO, Vector2.RIGHT, Vector2.LEFT.times(2), Vector2.add(Vector2.RIGHT, Vector2.DOWN.times(2)), Vector2.add(Vector2.LEFT.times(2), Vector2.UP)],
			RIGHT: [Vector2.ZERO, Vector2.RIGHT.times(2), Vector2.LEFT, Vector2.add(Vector2.RIGHT.times(2), Vector2.UP), Vector2.add(Vector2.LEFT, Vector2.DOWN.times(2))],
		},
		{
			// angle: 270
			LEFT: [Vector2.ZERO, Vector2.RIGHT, Vector2.LEFT.times(2), Vector2.add(Vector2.LEFT.times(2), Vector2.DOWN), Vector2.add(Vector2.RIGHT, Vector2.UP.times(2))],
			RIGHT: [Vector2.ZERO, Vector2.LEFT.times(2), Vector2.RIGHT, Vector2.add(Vector2.RIGHT, Vector2.DOWN.times(2)), Vector2.add(Vector2.LEFT.times(2), Vector2.UP)],
		},
	],
];

console.log(vectorPattern[0][0].LEFT);