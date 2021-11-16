const game = new Game();

document.addEventListener('keydown', (e) => {
	const key = e.key;
	switch (key) {
		case 'ArrowUp':
			game.rotateMino('right');
			break;
		case 'ArrowDown':
			game.moveMino('down');
			break;
		case 'ArrowLeft':
			game.moveMino('left');
			break;
		case 'ArrowRight':
			game.moveMino('right');
			break;
	}
});