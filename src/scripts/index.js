import '../pages/index.css'
import { openPopup, closePopup, handleOverlayClick } from './modal'
import { createCard } from './card'
import { enableValidation, clearValidation } from './validation'
import { updateUserData, getUserData, getCards } from './api.js'

const profileAvatar = document.querySelector('.profile__image')
const profilePopup = document.querySelector('.popup_type_edit')
const placesList = document.querySelector('.places__list')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeAvatar = document.querySelector('.popup_type_avatar')
const apploadNewAvatar = document.querySelector('.avatar__add_button')
const profileAddButton = document.querySelector('.profile__add-button')
const formAddElement = popupTypeNewCard.querySelector('.popup__form')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const nameInput = profilePopup.querySelector('input[name="name"]')
const jobInput = profilePopup.querySelector('input[name="description"]')
const avatarForm = document.querySelector('.popup_type_avatar .popup__form')
const avatarInput = document.querySelector('.popup__input_type_url')

avatarForm.addEventListener('submit', evt => {
	evt.preventDefault()

	const avatarUrl = avatarInput.value

	if (!avatarUrl) {
		console.error('Avatar URL is required')
		return
	}

	updateAvatar(avatarUrl)
		.then(data => {
			document.querySelector('.profile__image').src = data.avatar
			closePopup(document.querySelector('.popup_type_avatar'))
			avatarForm.reset()
		})
		.catch(err => {
			console.error(err)
		})
})

export const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

const renderCards = (cardsData, userId) => {
	cardsData.forEach(cardData => {
		const cardElement = createCard(
			cardData,
			userId
			// handleDelete,
			// likeCallback,
			// openImagePopup
		)
		placesList.prepend(cardElement)
	})
}

function openImagePopup(imageUrl, imageAlt) {
	const popupTypeImage = document.querySelector('.popup_type_image')
	const popupImage = popupTypeImage.querySelector('.popup__image')
	const popupCaption = popupTypeImage.querySelector('.popup__caption')

	popupImage.src = imageUrl
	popupImage.alt = imageAlt
	popupCaption.textContent = imageAlt
	openPopup(popupTypeImage)
}

profileEditButton.addEventListener('click', () => {
	nameInput.value = profileName.textContent
	jobInput.value = profileDescription.textContent
	clearValidation(formAddElement, validationConfig)
	openPopup(profilePopup)
})

profileAddButton.addEventListener('click', () => {
	clearValidation(formAddElement, validationConfig)
	openPopup(popupTypeNewCard)
})

apploadNewAvatar.addEventListener('click', () => {
	openPopup(popupTypeAvatar)
})

document.querySelectorAll('.popup__close').forEach(closeButton => {
	closeButton.addEventListener('click', () => {
		const popup = closeButton.closest('.popup')
		closePopup(popup)
	})
})

document.querySelectorAll('.popup').forEach(popup => {
	popup.addEventListener('click', handleOverlayClick)
})

enableValidation(validationConfig)

Promise.all([getUserData(), getCards()])
	.then(([userData, cardsData]) => {
		profileName.textContent = userData.name
		profileDescription.textContent = userData.about
		profileAvatar.style.backgroundImage = `url(${userData.avatar})`

		renderCards(cardsData, userData._id)
	})
	.catch(err => {
		console.error(err)
	})

document.querySelector('.popup_type_edit').addEventListener('submit', evt => {
	evt.preventDefault()

	updateUserData(nameInput.value, jobInput.value)
		.then(userData => {
			profileName.textContent = userData.name
			profileDescription.textContent = userData.about
			closePopup(profilePopup)
		})
		.catch(err => {
			console.error(err)
		})
})

function handleImageClick(cardData) {
	openImagePopup(cardData.link, cardData.name)
}

document
	.querySelector('.popup_type_new-card')
	.addEventListener('submit', evt => {
		evt.preventDefault()

		const nameInput = document.querySelector('input[name="place-name"]')
		const linkInput = document.querySelector('input[name="link"]')

		addCard(nameInput.value, linkInput.value)
			.then(cardData => {
				const cardElement = createCard(
					cardData,
					cardData.owner._id,
					handleDelete,
					handleImageClick,
					likeCallback
				)
				placesList.prepend(cardElement)

				closePopup(document.querySelector('.popup_type_new-card'))
				evt.target.reset()
			})
			.catch(err => {
				console.error(err)
			})
	})
