import { likeCard, unlikeCard, deleteCard } from './api'
import { openImagePopup } from './index'

export function handleLikeButton(event) {
	event.target.classList.toggle('card__like-button_active')
}

export function createCard(cardData, userId, deleteHandler) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true)
	const cardPicture = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const cardDeleteButton = cardElement.querySelector('.card__delete-button')
	const cardLikeButton = cardElement.querySelector('.card__like-button')
	const cardLikeCount = cardElement.querySelector('.card__like-count')
	const likeCounter = cardElement.querySelector('.card__like-count')

	cardPicture.src = cardData.link
	cardPicture.alt = cardData.name
	cardTitle.textContent = cardData.name
	cardLikeCount.textContent = cardData.likes.length

	cardDeleteButton.addEventListener('click', () =>
		deleteHandler(cardData._id, cardElement)
	)
	cardPicture.addEventListener('click', () => {
		openImagePopup(cardData.link, cardData.name)
	})

	cardLikeButton.addEventListener('click', () => {
		const isLiked = cardLikeButton.classList.contains(
			'card__like-button_is-active'
		)
		const likeMethod = isLiked ? unlikeCard : likeCard

		likeMethod(cardData._id)
			.then(updatedCard => {
				likeCounter.textContent = updatedCard.likes.length
				cardLikeButton.classList.toggle('card__like-button_is-active')
			})
			.catch(err => console.log(err))
	})

	if (cardData.owner._id !== userId) {
		cardDeleteButton.remove()
	} else {
		cardDeleteButton.addEventListener('click', () =>
			deleteHandler(cardData._id, cardElement)
		)
	}
	return cardElement
}

export function handleDelete(cardId, cardElement) {
	const deletePopup = document.querySelector('.popup_type_delete')
	openPopup(deletePopup)

	deletePopup.querySelector('.popup__confirm-button').onclick = () => {
		deleteCard(cardId)
			.then(() => {
				cardElement.remove()
				closePopup(deletePopup)
			})
			.catch(err => {
				console.error(err)
			})
	}
}
