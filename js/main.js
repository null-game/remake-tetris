(() => {

	const game = new Game();

	document.addEventListener('keydown', (e) => {
		const key = e.key;
		switch (key) {
			case 'Escape':
				game.start();
				break;
			case 'w':
			case 'ArrowUp':
				game.hardDrop();
				break;
			case 's':
			case 'ArrowDown':
				game.moveMino('down');
				break;
			case 'a':
			case 'ArrowLeft':
				game.moveMino('left');
				break;
			case 'd':
			case 'ArrowRight':
				game.moveMino('right');
				break;
			case 'q':
				game.rotateMino('left');
				break;
			case 'e':
				game.rotateMino('right');
				break;
		}
	});

})();