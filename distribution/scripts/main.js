const area = document.getElementById('area');
const modalWindow = document.querySelector('.modal__window-wrapper');
const overlay = document.querySelector('.overlay');
const interface = document.querySelector('.interface');
const newGameBtn = document.querySelector('.new-game-btn');
const gameWinnerText = document.querySelector('.game-winner');
let move = 0;
let result = '';

area.addEventListener('click', e => {
	if (e.target.classList.contains('box')) {
		move % 2 === 0 ? (e.target.innerHTML = 'X') : (e.target.innerHTML = '0');
		move++;
		check();
	}
});

const check = () => {
	const boxes = document.querySelectorAll('.box');
	const isFilled = Array.from(boxes).every(item => item.innerHTML !== '');

	if (isFilled) {
		result = 'Friendship';
		prepareResult(result);
		return;
	}

	const arr = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < arr.length; i++) {
		if (
			boxes[arr[i][0]].innerHTML === 'X' &&
			boxes[arr[i][1]].innerHTML === 'X' &&
			boxes[arr[i][2]].innerHTML === 'X'
		) {
			result = 'Tac';
			prepareResult(result);
			return;
		} else if (
			boxes[arr[i][0]].innerHTML === '0' &&
			boxes[arr[i][1]].innerHTML === '0' &&
			boxes[arr[i][2]].innerHTML === '0'
		) {
			result = 'Toe';
			prepareResult(result);
			return;
		}
	}
};

const prepareResult = winner => {
	modalWindow.style.display = 'block';
	interface.innerHTML = `${winner} won. Congratulate!`;
	if (winner !== 'Friendship') {
		gameWinnerText.innerHTML = winner === 'Tac' ? 'X' : '0';
	}
};

const closeAll = () => {
	modalWindow.style.display = 'none';
	location.reload();
};

overlay.addEventListener('click', closeAll);
newGameBtn.addEventListener('click', closeAll);
