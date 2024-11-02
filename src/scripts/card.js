import { likeCard, unlikeCard, deleteCard } from './api'
import { openPopup, closePopup } from './modal'

export function handleLikeButton(event) {
	event.target.classList.toggle('card__like-button_active')
}

export function deleteHandler(cardId, cardElement) {
	const deletePopup = document.querySelector('.popup_type_delete')

	if (!deletePopup) {
		console.error('Popup for deletion not found.')
		return
	}

	openPopup(deletePopup)
	deletePopup.querySelector('.popup__button').onclick = () => {
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

export const likeCallback = (cardId, cardButton, likeCounter) => {
	const isLiked = cardButton.classList.contains('card__like-button_is-active')
	const likeMethod = isLiked ? unlikeCard : likeCard

	likeMethod(cardId)
		.then(updatedCard => {
			likeCounter.textContent = updatedCard.likes.length
			cardButton.classList.toggle('card__like-button_is-active')
		})
		.catch(err => console.log(err))
}

export function createCard(
	cardData,
	userId,
	deleteHandler,
	handleImageClick,
	likeCallback
) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true)
	const cardPicture = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const cardDeleteButton = cardElement.querySelector('.card__delete-button')
	const cardLikeButton = cardElement.querySelector('.card__like-button')
	const cardLikeCount = cardElement.querySelector('.card__like-count')

	cardPicture.src = cardData.link
	cardPicture.alt = cardData.name
	cardTitle.textContent = cardData.name
	cardLikeCount.textContent = cardData.likes.length

	cardPicture.addEventListener('click', () => {
		handleImageClick({ link: cardData.link, name: cardData.name })
	})

	cardLikeButton.addEventListener('click', () => {
		likeCallback(cardData._id, cardLikeButton, cardLikeCount)
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
