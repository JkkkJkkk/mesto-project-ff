// cards.js

export const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
	},
]

export function createCard(
	cardData,
	likeHandler,
	deleteHandler,
	imageClickHandler
) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true)
	const cardPicture = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const cardDeleteButton = cardElement.querySelector('.card__delete-button')
	const cardLikeButton = cardElement.querySelector('.card__like-button')

	// Устанавливаем данные карточки
	cardPicture.src = cardData.link
	cardPicture.alt = cardData.name
	cardTitle.textContent = cardData.name

	// Добавляем обработчики событий
	cardDeleteButton.addEventListener('click', () => deleteHandler(cardElement))
	cardLikeButton.addEventListener('click', likeHandler)
	cardPicture.addEventListener('click', () => imageClickHandler(cardData))

	return cardElement
}
