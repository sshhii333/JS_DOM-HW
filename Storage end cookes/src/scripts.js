
// есть обьект с верным паролем, который даст доступ к вкладке апп
const authInfo = {
	login: 'admin',
	password: 'nimba'
};

const getCookie = (name) => {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

//при клике на кнопку
const auth = (e) => {
	let form = e.target.closest('.form'); // ищу форму
	let inputLogin = form.querySelector('input[name="login"]').value;
	let inputPass = form.querySelector('input[name="password"]').value;

	//если значения забранные из формы = нашим значениям обьекта
	if (inputLogin === authInfo.login &&
		inputPass === authInfo.password) {
		document.cookie = 'auth=true'; // создаем куку true для перехода на другую стр по условию ниже
		document.cookie = 'authLogin=' + inputLogin//в куку прописываем логин
		window.location = "/app.html";// и переходим на страницу апп

	} else {
		console.log('неверное');
	};
};

// console.log(document.cookie);//auth=true; authLogin=admin - всегда строка, что-бы забрать значения нужно спарсить console.log(getCookie('auth')) console.log(getCookie('auth')) true
// console.log(getCookie('authLogin')) admin

// при клике на кнопку на стр апп
const logouot = (e) => {
	// если !true || !admin return т.е если false или !admin ничего не делать
	if (!getCookie('auth') || !getCookie('authLogin')) return;

	//иначе очистить куки
	document.cookie = 'auth=; max-age = -1';
	document.cookie = 'authLogin=; max-age = -1';

	//если фалсе перегрузить, непонятная проверка
	if (!getCookie('auth')) window.location.reload();
}

// если мы на странице апп и куки auth = false, перейти всегда на страницу индекс
if (window.location.pathname == '/app.html' && !getCookie('auth'))
	window.location = "/index.html";
// если мы на странице индекс и куки auth = true, перейти всегда на страницу апп
if (window.location.pathname == '/index.html' && getCookie('auth') === 'true')
	window.location = "/app.html";

let btn = document.querySelector('.form .signin');
let btnLog = document.querySelector('.contacts .logout');

if (btn) btn.addEventListener('click', auth); // при клике запускаем функцию
if (btnLog) btnLog.addEventListener('click', logouot);



// функционал для работы с хранилищами localStorage

let bookContacts = [];

const contactUpdate = () => {
	// создаем лишки из сохраненного хранилища
	// для этого нужно забрать значения  из хранилища и спарсить их
	let value = localStorage.getItem("book"); //ключ
	if (value && value.length > 0) bookContacts = JSON.parse(value); //массив

	// Получится [{…}, {…}, {…}]
	// 0{"name": "658", "phone": "65868"},
	// 1{"name": "12", "phone": "62448"},
	// 2{"name": "61248", "phone": "66585868"},
	// length 3

	// создаем лишки
	let contactsList = document.querySelector('.contacts_list ul');
	contactsList.innerHTML = ''; //очистка

	bookContacts.forEach((elem, id) => {

		let elemContact = document.createElement('li');
		elemContact.innerHTML = `
	<div class="id">${id + 1}</div>
	<div class="name">${elem.name}</div>
	<div class="phone">${elem.phone}</div>
	`;
		contactsList.append(elemContact);
	});

};


const contactAdd = (e) => {
	let form = e.target.closest('.form_add');
	let inputName = form.querySelector('input[name="name"]').value;
	let inputPhone = form.querySelector('input[name="phone"]').value;

	if (inputName.length == 0 || inputName == ' ' || inputPhone.length == 0 || inputPhone == ' ') return;

	// инфу о новом контакте мы будеим хранить в обьекте
	let contact = {
		name: inputName,
		phone: inputPhone,
	};

	// который будем хранить в массиве bookContacts
	bookContacts.push(contact);

	// при дабовлении в массив и обновлении страницы -все данные уничтожаются, что-бы этого не происходило нужно, сохранять куда-то данные - предлагаю сохранять в localStorage
	// setItem(передаются только строки) 1 параметр- название хранилища, 2 переводим в строку и добавляем в хранилище bookContactsStorage
	localStorage.setItem('book', JSON.stringify(bookContacts));

	contactUpdate();

	sessionStorage.removeItem('contactInputName');
	sessionStorage.removeItem('contactInputPhone');
};


//смысл функции при нажатии не добавлять на страницу а временно сохранит в хранилище session и пока мы обновляем страницу и не жмем на кнопку адд, данные должны подставлятся в форму, а когда нажмем адд удалиться из хранилища и добавиться на страницу. Для этого прописываем условие вот тут if (window.location.pathname == '/app.html') {contactUpdate();};
const contactSave = (e) => {
	let form = e.target.closest('.form_add');
	let inputName = form.querySelector('input[name="name"]').value;
	let inputPhone = form.querySelector('input[name="phone"]').value;

	if (inputName.length == 0 || inputName == ' ' || inputPhone.length == 0 || inputPhone == ' ') return;

	// добавляем в сессионное хранилище
	sessionStorage.setItem('contactInputName', inputName);
	sessionStorage.setItem('contactInputPhone', inputPhone);

};

let btnAdd = document.querySelector('.form_add .add');
let btnSave = document.querySelector('.form_add .save');

if (btnAdd) btnAdd.addEventListener('click', contactAdd);
if (btnSave) btnSave.addEventListener('click', contactSave);


if (window.location.pathname == '/app.html') {
	contactUpdate();

	let contactInputName = sessionStorage.getItem('contactInputName');
	let contactInputPhone = sessionStorage.getItem('contactInputPhone');

	if (contactInputName && contactInputPhone.length > 0 && contactInputPhone.length > 0) {
		let form = document.querySelector('.form_add');
		let inputName = form.querySelector('input[name="name"]');
		let inputPhone = form.querySelector('input[name="phone"]');

		inputName.value = contactInputName;
		inputPhone.value = contactInputPhone;
	}
};

