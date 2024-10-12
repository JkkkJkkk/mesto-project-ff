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

// Обработчик для кнопки лайка
export function handleLikeButton(event) {
	event.target.classList.toggle('card__like-button_active')
}

// Обработчик удаления карточки
export function handleDelete(cardElement) {
	cardElement.remove()
}
