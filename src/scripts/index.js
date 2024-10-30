import '../pages/index.css'
import '../scripts/api.js'
import { openPopup, closePopup, handleOverlayClick } from './modal'
import { createCard, handleDelete, handleLikeButton } from './card'
import { enableValidation, clearValidation } from './validation'

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

export function openImagePopup(imageUrl, imageAlt) {
	const popupTypeImage = document.querySelector('.popup_type_image')
	const popupImage = popupTypeImage.querySelector('.popup__image')
	const popupCaption = popupTypeImage.querySelector('.popup__caption')

	popupImage.src = imageUrl
	popupImage.alt = imageAlt
	popupCaption.textContent = imageAlt
	openPopup(popupTypeImage)
}

function handleImageClick(cardData) {
	openImagePopup(cardData.link, cardData.name)
}

profileEditButton.addEventListener('click', () => {
	nameInput.value = profileName.textContent
	jobInput.value = profileDescription.textContent
	openPopup(profilePopup)
})

profilePopup.querySelector('.popup__form').addEventListener('submit', evt => {
	evt.preventDefault()

	profileName.textContent = nameInput.value
	profileDescription.textContent = jobInput.value

	closePopup(profilePopup)
})

profileAddButton.addEventListener('click', () => {
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

formAddElement.addEventListener('submit', evt => {
	evt.preventDefault()

	const newCardData = {
		name: formAddElement.querySelector('input[name="place-name"]').value,
		link: formAddElement.querySelector('input[name="link"]').value,
	}

	const newCard = createCard(
		newCardData,
		handleLikeButton,
		handleDelete,
		handleImageClick
	)
	placesList.prepend(newCard)
	closePopup(popupTypeNewCard)
	formAddElement.reset()
})

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

enableValidation(validationConfig)

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
