import '../pages/index.css'
import { initialCards } from './cards'
import { setupAddCardForm, openImagePopup } from './modal'

const placesList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

// Создание карточки
export function createCard(cardData, likeHandler) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true)
	const cardPicture = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const cardDeleteButton = cardElement.querySelector('.card__delete-button')
	const cardLikeButton = cardElement.querySelector('.card__like-button')

	cardPicture.src = cardData.link
	cardPicture.alt = cardData.name
	cardTitle.textContent = cardData.name

	cardDeleteButton.addEventListener('click', () => cardElement.remove())
	cardLikeButton.addEventListener('click', likeHandler) // Передаем обработчик лайка

	cardPicture.addEventListener('click', () =>
		openImagePopup(cardPicture.src, cardPicture.alt)
	)

	return cardElement
}

// Добавление начальных карточек
initialCards.forEach(cardData => {
	const cardElement = createCard(cardData, event => {
		event.target.classList.toggle('card__like-button_active')
	})
	placesList.append(cardElement)
})

// Настройка обработчика для формы добавления карточки
const formAddElement = document.querySelector(
	'.popup_type_new-card .popup__form'
)
setupAddCardForm(placesList, createCard)
