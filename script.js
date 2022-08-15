'use strict';

const playerHt = document.querySelector('.players_amount')
const title = document.querySelector('.title')
const spyHt = document.querySelector('.spy_amount')
const minutHt = document.querySelector('.minutes')
const container = document.querySelector('.container')
let cheatAlert = '';
const body = document.querySelector('body')
let timer = '';
let card = '';
let next = '';

let players = '';
let spy = '';
let minutes = '';
let randomElem = '';
let randomSpy = '';
let randomSpy2 = null;
let spyName = 'Ты Шпион'
let spyArr = [];
let helper = 0;
let cardOpenBlock = true;
let mainArr = ['База террористов','Банк','Школа','Цирк-шапито','Церковь','Университет','Хоккейная арена','Театр','Супермаркет','Станция техобслуживания','Спа-салон','Самолет','Ресторан','Посольство','Полярная станция','Полицейский участок','Подводная лодка','Пляж','Пиратский корабль','Пассажирский поезд','Партизанский отряд','Отель','Орбитальная станция','Океанский лайнер','Овощебаза','Ночной клуб','Лунапарк' ,'Корпоративная вечеринка','Киностудия','Карнавал','Казино','Зоопарк','Войско крестоносцев','Выставка  настольных игр','Воинская часть','Больница']


function getRandom(arr){
   return arr[Math.floor(Math.random()*arr.length)]
}

function numToArr (arg) {
	spyArr = []
	let i = 0;
	while (i < arg) {
		spyArr.push(i)
		i+=1
	}
}

function cheatSpy () {
	cheatAlert.innerHTML = randomElem;
	cheatAlert.classList.add('cheatAdd')
	setTimeout(() =>{
		cheatAlert.classList.remove('cheatAdd')
	}, 1000)
}

function gangstaTems () {
	playerHt.value = '';
	mainArr = ['Хата Вадика','Гимназия','5 парсека','Откидон','Подвал Эвы', 'Комната Полищук', 'Хата Васи','Гараж Сани','Макдональс','МНВК','Житомир','Свечка','Поезд','Вейпшоп','Зона','Донбас','Бар','Казино','Варус','ПТУ','Кабинет Костивской','Ликеро-водочный завод','Столовка в школе','Психобольница','Наркопритон','Пентагон','Запой','Железка', 'Последняя парта','Лес' ,'Птицеферма' ,'Марс']
	body.style.backgroundImage = 'linear-gradient(to top, #FFF824 10%, #FF0011 50%, #000000 80%)'
	spyName = `<img src="spy.jpg" alt="Ты шпион" class="spyImg">`
}


function startGame() {
	if (playerHt.value == 'Гангстер' && spyHt.value == '' && minutHt.value == '') {
		gangstaTems()
	} else if (playerHt.value == '' || spyHt.value == '' || minutHt.value == '') {
		alert('Заполните все даные')
	} else if (playerHt.value % 1 !== 0 || spyHt.value % 1 !== 0 || minutHt.value % 1 !== 0) {
		alert('Введи все числа')
	} else if (playerHt.value > 10 || spyHt.value > 2 || minutHt.value > 10 ) {
		alert('Слишком дохера вводиш')	
	} else if (playerHt.value < 3 || spyHt.value < 1 || minutHt.value < 1) {
		alert('Слишком мало вводиш')
	} else {
		players = playerHt.value;
		spy = spyHt.value;
		minutes = minutHt.value;
		container.innerHTML = `
		<h1 class="title">Open
		<div class="cheat" onclick="cheatSpy()"></div>
		<div class="cheatAlert"></div>
		</h1>
		<div class="card" onclick="openCard()"></div>
		<button class="next" onclick="nextCard()">Следующий</button>
		`
		randomElem = getRandom(mainArr);
		card = document.querySelector('.card')
		next = document.querySelector('.next')
		cheatAlert = document.querySelector('.cheatAlert')
		numToArr(players)
		randomSpy = getRandom(spyArr)
		if (spy == 2) {
			randomSpy2 = getRandom(spyArr)
			while (randomSpy2 == randomSpy) {
				randomSpy2 = getRandom(spyArr)
			}
		}
	}
}

function openCard() {
	if (cardOpenBlock) {
		if (players > helper) {
			if (helper == randomSpy || helper == randomSpy2) {
				card.classList.add('addCard')
				setTimeout(() => {
					card.innerHTML=`<div class='insideCard'>${spyName}</div>`
				}, 200)
				helper +=1;
			} else {
				card.classList.add('addCard')
				setTimeout(() => {
					card.innerHTML=`<div class='insideCard'>${randomElem}</div>`
				}, 200)
				helper +=1;
			}
			
		} else {
			
		} 

		cardOpenBlock = false;	
	}

}

function nextCard () {
	card.classList.remove('addCard')
	card.innerHTML=`<div class='insideCard'></div>`
	cardOpenBlock = true;
	if (helper == players) {
		next.style.background = 'red';
		helper += 1
	} else if (helper > players) {
		minutes = minutHt.value* 60;
		container.innerHTML = `
		<h1 class="title">Таймер</h1>
		<div class="block-timer">${minutes}</div>
		<button class="startStop" onclick="startStop()">Старт/Стоп</button>
		<button class="restart" onclick="window.location.reload()">Перезапуск</button>`
		timer = document.querySelector('.block-timer')
	}
}

let timerHelper = true;
let timeDown = 1;
let intervalHelper = true;


function startStop () {
	if (timerHelper) {
		timeDown = 1
		timerHelper = false;
		if (intervalHelper) {
			intervalHelper = false;
			setInterval(() => {
	        	minutes -= timeDown;
	        	timer.innerHTML = minutes;
	        	if (minutes == 0) {
	        		timeDown = 0;
	        		timer.innerHTML = `<div class="gameStop">Стоп игра</div>`;
	        	}
			} ,1000)
		}
		
	} else{
		timeDown= 0;
		timerHelper = true;
	}
	
}
