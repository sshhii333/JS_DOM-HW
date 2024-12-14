function CallToAction() {
	let head = document.head;

	let lang = document.querySelector('html');
	lang.setAttribute('lang', 'en');

	let utf = document.createElement('meta');
	utf.setAttribute('charset', 'UTF-8');

	let viewport = document.createElement('meta');
	viewport.setAttribute('name', 'viewport');
	viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');

	let style = document.createElement('style');
	style.innerHTML = `
	@import url('https://fonts.googleapis.com/css2?family=Arvo&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

	* {
		margin: 0;
		padding: 0;
	}

	body {
		font-family: 'Open Sans';
		font-size: 12px;
		color: #9FA3A7;
	}


	.choice {
		width: 1280px;
		margin: 0 auto;
		background-color: #FFFFFF;

	}

	.choice__title {
		font-family: "Arvo", serif;
		font-weight: 400;
		font-size: 36px;
		text-align: center;
		color: #212121;

		margin-top: 120px;
		margin-bottom: 10px;
	}

	.choice__description {
		font-size: 14px;
		text-align: center;
		margin-bottom: 55px;
	}

	.choice__card {
		display: flex;
		justify-content: center;
	}

	.card {
		width: 400px;
		height: 480px;
		text-align: center;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card__subtitle {
		font-family: "Montserrat", sans-serif;
		font-weight: 700;
		font-size: 12px;
		text-transform: uppercase;

		padding-top: 80px;
		padding-bottom: 20px;
	}

	.card__title {
		font-family: "Arvo", serif;
		font-weight: 400;
		font-size: 36px;
		color: #212121;

		padding-bottom: 25px;
	}

	.card__content {
		line-height: 22px;

		padding-bottom: 65px;
	}

	.card__btn {
		font-family: "Montserrat", sans-serif;
		font-weight: 700;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 2.4px;
		color: #212121;
		background-color:#FFFFFF;
		cursor: pointer;


		border: 3px solid #FFC80A;
		border-radius: 50px;

		padding: 25px 35px;
	}

	.card__freelancer {
		border-radius: 10px 0 0 10px;
	}

	.card__studio {
		border-radius: 0 10px 10px 0;
	}
	`;

	let title = document.createElement('title');
	title.textContent = 'Document';

	head.append(utf, viewport, style, title);


	let body = document.body;

	let choice = document.createElement('section');
	choice.classList.add('choice');

	let choiceTitle = document.createElement('h1');
	choiceTitle.classList.add('choice__title');
	choiceTitle.textContent = 'Choose Your Option';

	let choiceDescription = document.createElement('p');
	choiceDescription.classList.add('choice__description');
	choiceDescription.textContent = 'But I must explain to you how all this mistaken idea of denouncing';

	let choiceCard = document.createElement('div');
	choiceCard.classList.add('choice__card');

	for (let i = 0; i < 2; i++) {

		let card = document.createElement('div');

		if (i === 0) {
			card.classList.add('card', 'card__freelancer');
		} else {
			card.classList.add('card', 'card__studio');
		}

		let cardSubtitle = document.createElement('h3');
		cardSubtitle.classList.add('card__subtitle');
		cardSubtitle.textContent = (i === 0) ? `freelancer`: `studio`;

		let cardTitle = document.createElement('h2');
		cardTitle.classList.add('card__title');
		cardTitle.innerHTML = 'Initially<br> designed to';

		let cardContent = document.createElement('p');
		cardContent.classList.add('card__content');
		cardContent.innerHTML = 'But I must explain to you how all this<br> mistaken idea of denouncing';

		let cardBtn = document.createElement('button');
		cardBtn.classList.add('card__btn');
		cardBtn.textContent = 'start here';

		card.addEventListener('mouseover', function () {
			card.style.backgroundColor = '#8F75BE';
			cardSubtitle.style.color = '#FFC80A';
			cardContent.style.color = '#FFFFFF';
			cardTitle.style.color = '#FFFFFF';
			cardBtn.style.color = '#FFFFFF';
			cardBtn.style.backgroundColor = '#8F75BE';
		});

		card.addEventListener('mouseout', function () {
			card.style.backgroundColor = '#FFFFFF';
			cardSubtitle.style.color = '#9FA3A7';
			cardContent.style.color = '#9FA3A7';
			cardTitle.style.color = '#212121';
			cardBtn.style.color = '#212121';
			cardBtn.style.backgroundColor = '#FFFFFF';
		});

		choiceCard.append(card);
		card.append(cardSubtitle, cardTitle, cardContent, cardBtn);
	}

	body.append(choice);
	choice.append(choiceTitle, choiceDescription, choiceCard);
};


window.addEventListener('load', function() {
	CallToAction();
});