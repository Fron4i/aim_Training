const screens = document.querySelectorAll('.screen')
const startBtn = document.querySelector('#start')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#e74c3c', '#d65656', '#3498bd', '#e67e22', '#2ecc71', '#31ffba', '#c58929'] 

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})

function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let curret = --time
		if (curret < 10) curret = `0${curret}`
		setTime(curret)
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(15, 30)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	setColor(circle)
	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`

	board.append(circle)
}

function getRandomNumber(min, max) {
	return (Math.round(Math.random() * (max-min) + min))
}

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)]
}

function setColor(element) {
	const color = getRandomColor()

	element.style.background = color
	element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}