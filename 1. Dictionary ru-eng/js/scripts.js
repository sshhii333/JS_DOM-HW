/* словарь рус - англ. (добаление слов в словарь) */

/*
	1. Слово
		-создать:
		{
			rus: 'Стол';
			en: 'Table';
		}

		- редактировать

	2. App, где хранить
		- добавление
		- редактирование
		- удаление
		- получение/вывод

	3. AppUI
*/

function Word(word, translate) {
	if (!word || !translate) return;

	this.rus = word;
	this.en = translate;

	this.editWord = function (translate) {
		if (!translate) return;

		this.en = translate;
	};
};

function App() {
	let id = 0; // закрытое свойство
	this.data = []; // хранилище, куда будем все пихать

	this.add = function (word, translate) {
		let obj = new Word(word, translate);

		if (!obj.rus) return;

		obj.id = ++id; //увеличить id на 1

		this.data.push(obj); // [word, word, word] -> word = rus, en, id
	};

	this.edit = function (id, translate) {
		let item = this.data.find(function (elem) { // item = word
			return elem.id === id;
		});

		if (!item) return;

		item.editWord(translate); // у item(word) есть свойство editWord
	};

	this.remove = function (id) {
		let dataTmp = this.data.filter(function (elem) {
			return elem.id !== id;
		});

		this.data = dataTmp;
	};

	this.get = function (id) {
		if (id) {
			let item = this.data.find(function (elem) { // item = word
				return elem.id === id;
			});

			if (item) return item;
			return;
		};

		return this.data;
	};
};

// let myApp = new App();
function AppUI() {
	let appElem = document.createElement('div');
	appElem.classList.add('app');

	/* верстка, слово/перевод и кнопка */
	let formElem = document.createElement('div');
	formElem.classList.add('app__form');

	let inputWordRus = document.createElement('input');
	inputWordRus.setAttribute('type', 'text');
	inputWordRus.setAttribute('name', 'word_rus');
	inputWordRus.setAttribute('placeholder', 'Cлово');

	let inputWordEn = document.createElement('input');
	inputWordEn.type = 'text';
	inputWordEn.name = 'word_en';
	inputWordEn.placeholder = 'Перевод';

	let btnAdd = document.createElement('button');
	btnAdd.classList.add('app__btn', 'app__btn-add');
	btnAdd.textContent = '+';

	/* верстка, слова в словарь добавляються и создаются отдельно */
	let listElem = document.createElement('ul');
	listElem.classList.add('app__list');

	document.body.append(appElem);

	appElem.append(formElem, listElem);
	formElem.append(inputWordRus, inputWordEn, btnAdd);


	let app = new App(); // доступ  к конструктору App

	let updateList = function () {
		listElem.innerHTML = '';

		let baza = app.get();

		if (!baza || baza.length == 0) return;

		baza.forEach(function (elem) {
			let itemElem = document.createElement('li');
			itemElem.classList.add('app__item');

			let wordRusElem = document.createElement('span');
			wordRusElem.classList.add('app__word_rus');
			wordRusElem.textContent = elem.rus;

			let wordEnElem = document.createElement('span');
			wordEnElem.classList.add('app__word_en');
			wordEnElem.textContent = elem.en;

			let wordBtns = document.createElement('div');
			wordBtns.classList.add('app__word_btns');

			let wordBtnEdit = document.createElement('button');
			wordBtnEdit.classList.add('app__btn', 'app__btn-edit');
			wordBtnEdit.textContent = 'Редактировать';

			let wordBtnRemove = document.createElement('button');
			wordBtnRemove.classList.add('app__btn', 'app__btn-remove');
			wordBtnRemove.textContent = 'Удалить';

			listElem.append(itemElem);
			itemElem.append(wordRusElem, wordEnElem, wordBtns);
			wordBtns.append(wordBtnEdit, wordBtnRemove);

			wordBtnEdit.addEventListener('click', function () {
				let translateNew = prompt('Новый перевод');
				if (!translateNew) return;

				app.edit(elem.id, translateNew);

				updateList();
			});

			wordBtnRemove.addEventListener('click', function () {
				app.remove(elem.id);

				updateList();
			});
		});
	};


	btnAdd.addEventListener('click', function () {
		let inputRusValue = inputWordRus.value;
		let inputEnValue = inputWordEn.value;

		app.add(inputRusValue, inputEnValue);

		inputWordRus.value = '';
		inputWordEn.value = '';

		updateList();
	});
};

window.addEventListener('load', () => {
	new AppUI();
	// AppUI()
});

















// let appElem = document.createElement('div');
// appElem.classList.add('app');

// /* верстка, слово/перевод и кнопка */
// let formElem = document.createElement('div');
// formElem.classList.add('app__form');

// let inputWordRus = document.createElement('input');
// inputWordRus.setAttribute('type', 'text');
// inputWordRus.setAttribute('name', 'word_rus');
// inputWordRus.setAttribute('placeholder', 'Cлово');

// let inputWordEn = document.createElement('input');
// inputWordEn.type = 'text';
// inputWordEn.name = 'word_en';
// inputWordEn.placeholder = 'Перевод';

// let btnAdd = document.createElement('button');
// btnAdd.classList.add('app__btn', 'app__btn-add');
// btnAdd.textContent = '+';


// /* верстка, слова в словарь добавляються и создаются отдельно */
// let listElem = document.createElement('ul');
// listElem.classList.add('app__list');

// let itemElem = document.createElement('li');
// itemElem.classList.add('app__item');

// let wordRusElem = document.createElement('span');
// wordRusElem.classList.add('app__word_rus');
// wordRusElem.textContent = 'Стол';

// let wordEnElem = document.createElement('span');
// wordEnElem.classList.add('app__word_en');
// wordEnElem.textContent = 'Table';

// let wordBtns = document.createElement('div');
// wordBtns.classList.add('app__word_btns');

// let wordBtnEdit = document.createElement('button');
// wordBtnEdit.classList.add('app__btn', 'app__btn-edit');
// wordBtnEdit.textContent = 'Редактировать';

// let wordBtnRemove = document.createElement('button');
// wordBtnRemove.classList.add('app__btn', 'app__btn-remove');
// wordBtnRemove.textContent = 'Удалить';


// document.body.append(appElem);

// appElem.append(formElem, listElem);
// formElem.append(inputWordRus, inputWordEn, btnAdd);

// listElem.append(itemElem);
// itemElem.append(wordRusElem, wordEnElem, wordBtns);
// wordBtns.append(wordBtnEdit, wordBtnRemove);

