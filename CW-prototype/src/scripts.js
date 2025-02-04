// __proto__

// let mike = {
// 	name: 'Mike',
// 	speak: function() {
// 			console.log(this.name + ' Speak... bla bla bla');
// 	},
// 	sayName: function() {
// 			console.log(this.name);
// 	}
// };

// let peter = {
// 	name: 'Peter',
// 	walk: function() {
// 	}
// };

// peter.__proto__ = mike;

// console.log(mike);
// console.log(peter);

// let bob = {
// 	name: 'Bob'
// };

// bob.walk = peter.walk;
// bob.sayName = mike.sayName;

// mike.sayName.bind(bob)()


// prototype

// function Transport() {
// 	this.setInfo = function(brand, model) {
// 		this.brand = brand;
// 		this.model = model;
// 	}
// }

// function Car(wheels, engine) {
// 	this.wheels = wheels;
// 	this.engine = engine;
// }

// Car.prototype = new Transport();

// let opel = new Car(4 , "disel");
// opel.setInfo('bmw', 'm6',)
// console.log(opel);



// apply, call
/*

чайник
кофемолка
кафеварка
кофемашина

*/

/*
volume - обьем
power - мощность
timeBoil - время закипания
done - вода закипела и готова
on - вкл чайник, начал нагревать воду

*/


let Keetle = function (volume = 1, power = 1) {
	this.status = false;
	this.volume = volume;
	this.power = power;
	this.done = false;

	this.timeBoil = Number(((0.00117 * this.volume * (100 - 98) / this.power) * 60).toFixed(1));

	this.on = function () {
		this.status = true;

		setTimeout(() => {
			this.done = true;

			this.off();

			console.log('Water is boiled');
		}, this.timeBoil * 60 * 1000);
	};

	this.off = function () {
		this.status = false;
	};

	this.get = function (count) {
		if (this.done && (this.volume - count) >= 0) {
			this.volume -= count;
			return count;
		}
	}
};

let CoffeeGrinder = function (volume = 100, time = 5) {
	this.coffeeGrinderStatus = false;
	this.coffeeGrinderVolume = volume;
	this.coffeeGrinderTime = time;

	this.coffeeGrinderOn = function () {
		setTimeout(() => {
			this.coffeeGrinderOff();

			console.log('Coffee is ground');
		}, this.coffeeGrinderTime * 1000);
	};

	this.coffeeGrinderOff = function () {
		this.coffeeGrinderStatus = false;
	};

	this.coffeeGrinderGet = function (count) {
		if ((this.coffeeGrinderVolume - count) >= 0) {
			this.coffeeGrinderVolume -= count;
			return count;
		}
	}
};


// let scarlet = new Keetle();
// let myGrinder = new CoffeeGrinder();

// console.log(scarlet);
// console.log(myGrinder);


let CoffeeMaker = function () {
	// Keetle.apply(this, arguments);
	// Keetle.apply(this, [arg1, arg2, arg3]);
	// CoffeeGrinder.call(this, arg1, arg2, arg3);
	// CoffeeGrinder.call(this, ...arguments);

	Keetle.apply(this);
	CoffeeGrinder.call(this);

	this.coffeeMakerStatus = false;
	this.coffeeMakerDone = false;
	this.programm = 0;

	this.milkVolume = 0;
	this.coffeeVolume = 0;

	this.coffeeMakerOn = function () {
		this.coffeeMakerStatus = true;
	};

	this.coffeeMakerOff = function () {
		this.coffeeMakerStatus = false;
		this.programm = 0;
	};

	this.setWaterVolume = function (volume) {
		this.volume = volume;
	};

	this.setMilkVolume = function (volume) {
		this.milkVolume = volume;
	};

	this.setCoffeeVolume = function (volume) {
		this.coffeeVolume = volume;
		this.coffeeGrinderVolume = volume;
	};

	this.setProgramm = function (number) {
		if (this.volume <= 0) {
			this.programm = 0;
			console.log('Add water!');
			return;
		}

		if (this.coffeeVolume <= 0) {
			this.programm = 0;
			console.log('Add coffee!');
			return;
		}

		this.programm = number;

		if (this.programm > 1 && this.milkVolume <= 0) {
			console.log('Add milk!');
			this.programm = 0;
		}

		this.coffeeGrinderTime = 5;
	};

	this.start = function () {
		if (!this.coffeeMakerOn || !this.coffeeMakerStatus) return;

		this.on();
		this.coffeeGrinderOn();

		setTimeout(() => {
			this.coffeeMakerDone = true;
			this.coffeeMakerOff();
			console.log('Coffee is done');
		}, 10000);
	};
}

let delonghi = new CoffeeMaker();
console.log(delonghi);


/*
1. создаем чайник. (у него есть обьем, мощность выносим в параметры, по умолчанию обьем 1л. можность 1000ват(1квт))
2. чайник кипитит воду, пишим формулу закипания воды
3. создаем обычный обьект на основании нашего конструктора, для проверки в консоле let scarlet = new Keetle();
4. теперь нам надо, что бы когда мы влючили чайник он через n время, когда закипит, сообщил об этом. для этого нам нужен метод вкл или выключин и флаг true/false this.on = function () {this.status = true;}; this.off = function () {this.status = false;}; сам флаг по умолчанию this.status = false;
5. запускаем внутри on функцию сеттаймаут,через  this.timeBoil (в минутах, а нам надо в милисек), когда вода закипит, она должна подать сигнал о готовности  this.done = true; и автоматом выключится this.off();
6. чайник готов

7. кофемолка
*/