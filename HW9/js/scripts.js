let ToDoList = function () {
	let data = [];
	let lastId = 0;

	let todoListElem;

	this.add = (name) => { //добавлять в  хранилище
		if (!name || name.length < 3) return;
		lastId++;

		let task = {
			id: lastId,
			name: name,
			dateCreate: Date.now(),
			status: false,
		};

		data.push(task);
	};

	this.edit = (id, newName) => { // редактировать
		if (!id || id <= 0 || !newName || newName.length < 3) return;

		let task = data.find((task) => {
			return task.id == id;
		});

		if (!task) return;

		task.name = newName;
		task.dateUpdate = Date.now();
	};

	this.remove = (id) => {
		if (id === undefined) {
			data = [];
		} else {
			if (!id || id <= 0) return;
			let dataTmp = data.filter((task) => {
				return task.id != id;
			});

			data = dataTmp;
		};
	};

	this.done = (id) => { // статуы true/false
		if (!id || id <= 0) return;

		let task = data.find((task) => {
			return task.id == id;
		});

		if (!task) return;

		task.status = !task.status;
		task.dateUpdate = Date.now();
	};

	this.get = (id) => {
		if (!id && id === undefined) return data;

		if (id < 0) return;

		let task = data.find((item) => {
			return item.id == id;
		});

		if (!task) return;

		return task;
	};

	let update = () => {
		todoListElem.innerHTML = '';

		data.forEach((task) => {
			let todoLiElem = document.createElement('li');
			todoLiElem.classList.add('todo__item');

			let todoCheckboxElem = document.createElement('input');
			todoCheckboxElem.classList.add('todo__status');
			todoCheckboxElem.type = 'checkbox';

			let todoNameElem = document.createElement('span');
			todoNameElem.classList.add('todo__name');
			// todoNameElem.setAttribute('contenteditable', false);


			todoNameElem.innerHTML = task.name;
			todoCheckboxElem.checked = task.status;

			todoLiElem.append(todoCheckboxElem, todoNameElem);
			todoListElem.append(todoLiElem);

			todoCheckboxElem.addEventListener('change', () => {
				this.done(task.id);
				update();
			});

			todoNameElem.addEventListener('dblclick', (event) => {
				let value = event.target.innerText;
				if (!value) return;

				let newName = prompt('', value);

				this.edit(task.id, newName);
				update();

				// event.target.contentEditable = true;

				// todoNameElem.addEventListener('keypress', (event) => {
				// 	if (event.code != 'Enter') return;

				// 	event.target.contentEditable = false;

				// 	let newName = event.target.innerText;

				// 	this.edit(task.id, newName);
				// 	update();
				// });
			});
		});
	};

	let showUi = () => {
		let todoElem = document.createElement('div');
		todoElem.classList.add('todo');

		let todoTitileElem = document.createElement('h3');
		todoTitileElem.classList.add('todo__title');

		let todoInputName = document.createElement('input');
		todoInputName.classList.add('todo__field_name');
		todoInputName.type = 'text';
		todoInputName.placeholder = 'Type your task...';

		todoListElem = document.createElement('ul');
		todoListElem.classList.add('todo__list');

		let todoBtnClear = document.createElement('button');
		todoBtnClear.classList.add('todo__btn_clear');


		todoTitileElem.innerHTML = 'ToDo List';
		todoBtnClear.innerHTML = 'Clear';

		todoElem.append(todoTitileElem, todoInputName, todoListElem, todoBtnClear);


		document.body.append(todoElem);

		todoInputName.addEventListener('keypress', (event) => {
			if (event.key != "Enter") return;
			this.add(event.target.value);
			update();
			event.target.value = '';
		});

		todoBtnClear.addEventListener('click', () => {
			this.remove();
			update();
		});
	};

	showUi();
};

window.addEventListener('load', () => {
	new ToDoList();
});



/*
1. создаем структуру
2. создаем обьект конструктор let ToDoList = function()
3. создаем хранилище, куда все наши задачи будут падать
4. создаем основные методы add, elit, remove, get, done

5. создаем наш обьект, с основными параметрами(имя, ид, статус, дата создания и т.д) добавляем в add
6. нам надо получать только имя задачи(оно будет отображаться) для этого в функцию add  в параметры выносим name и прописываем в нашей task {..., name: name, ...}
7. Нужно присвоить каждой задаче(task) счетчик ид, т.е увеличивать ИД на ед а потом записывать результат в task.id
8.[task1, tack2, task3]
		{"id": 1,"name": "1 задача", "dateCreate": 1737212149627, "status": false},
		{"id": 2, "name": "2 задача", dateCreate": 1737212156296, "status": false},
		{"id": 3, "name": "3 задача", "dateCreate": 1737212161485, "status": false}

9.Делаем функцию edit
10. Для редактирования нам нужно знать id и изменять name, поэтому их выносим в параметры
11. Ищем в хранилище задачу, которая соответсвует нужномо ИД, при помощи метода find
12. задаче присваеваем  новое имя, через task.name = name
13. можно присвоить дату изменения task.dateUpdate = Date.now();

14. делаем метод удаления, будем искать ИД
15. при помощи фильтра(будем не искать при помощи find, а исключать из всего массива нашу задачу)
16. делаем временное хранилище(так как метод filter возвращает новый массив)
17. исключив ненужную задача присваиваем хранилещу, результат временного хранилища

18. дороботка метода get
19. смысл в том что-бы показывать не только все хранилище, но и конкретную задачу, если введен ИД (используем проверки и поиск для ид)

20. Делаем метод done, по ид включаем или выключаем, делаем также как метод edit, только task.status = !task.status;(когда нажато меняет статус на противоположный и обратно)

21. делаем структуру в  функции showUi(); и запускаем ее вне функции
22. там где задачи добавляются(ли элементы) временный код мы потом отдельно их перенесем и showUi только окно с тодо будет показывать и не создавать задачи

23. У нас запустилось окошко todo
24. 1 надо ввести задачу в окошко и по ентер забрать его.
		2 todoInputName - окошко с писаниной, вешаем событие внутри функции showUi добавляем в самом низу
		3 забираем значение что ввели по кнопке ентер
		4 запускаем наше значене в функции add(значение)
		5 все добавляется но пока не показывает в самом попапе(не добавляет лишку) нам нужен еще один метод абдейт и запустить его
		6. очищаем поле для задач event.target.value = '';
25. 1 создаем метод updete (показать нашу созданную задачу)
		2 перебираем каждую задачу и переносим в функцию структуру для создания нашей задачи/лишки
		3 заменяем todoNameElem.innerHTML = task.name;
		4 todoListElem.append(todoLiElem); todoListElem не видет наша функция, так как создана эта переменная в другой функции, поэтому нужно вынести ее
		5. готово задачи теперь создаются и показываются
		6. проблема дублирования задач при создании новой задачи, делаем очистку в самом начале функции update: todoListElem.innerHTML = '';
26. 1 переходим к чекбоксам, когда мы отмечаем нашу задачу и добовляем новую, чекбокс ы сбрасываются не сохрянют свое значение. Что бы они сохранялись нам надо статус их забирать
			2. Т.Е. у чекбоксов есть атрибут checked(флажок вкл) кототорое может быть или true или false. Значит нам надо присвоить чекбоксам  из обьекта todoCheckboxElem.checked = task.status; по умолчанию в обьекте стоит false, т.е по умолчанию флажек выключен, обозначаем, что наша задача невыполнена
			3. теперь вешаем на чекбокс событие change(срабатывает когда жмем на чекбокс)
			4. и  запускаем функцию done(ид) this.done(task.id)
			5. готово работает
27. Делаем функцию очитки и редактирования добавляем клик и двойной клик соответственно

*/