import '../pages/index.css'
import { openPopup, closePopup, handleOverlayClick } from './modal'
import { initialCards } from './cards'
import { createCard } from './cards'

document.addEventListener('DOMContentLoaded', () => {
	// Определение основных DOM элементов
	const placesList = document.querySelector('.places__list')
	const profileEditButton = document.querySelector('.profile__edit-button')
	const profilePopup = document.querySelector('.popup_type_edit')
	const profileAddButton = document.querySelector('.profile__add-button') // Кнопка добавления карточки
	const popupTypeNewCard = document.querySelector('.popup_type_new-card') // Попап для добавления карточки
	const formAddElement = popupTypeNewCard.querySelector('.popup__form')
	const profileName = document.querySelector('.profile__title')
	const profileDescription = document.querySelector('.profile__description')
	const nameInput = profilePopup.querySelector('input[name="name"]')
	const jobInput = profilePopup.querySelector('input[name="description"]')

	// Обработчик для кнопки лайка
	function handleLikeButton(event) {
		event.target.classList.toggle('card__like-button_active')
	}

	// Обработчик открытия попапа с изображением
	function openImagePopup(imageUrl, imageAlt) {
		const popupTypeImage = document.querySelector('.popup_type_image')
		const popupImage = popupTypeImage.querySelector('.popup__image')
		const popupCaption = popupTypeImage.querySelector('.popup__caption')

		popupImage.src = imageUrl
		popupImage.alt = imageAlt
		popupCaption.textContent = imageAlt
		openPopup(popupTypeImage)
	}

	// Обработчик удаления карточки
	function handleDelete(cardElement) {
		cardElement.remove()
	}

	// Обработчик клика по изображению
	function handleImageClick(cardData) {
		openImagePopup(cardData.link, cardData.name)
	}

	// Открытие попапа редактирования профиля
	profileEditButton.addEventListener('click', () => {
		nameInput.value = profileName.textContent
		jobInput.value = profileDescription.textContent
		openPopup(profilePopup)
	})

	profilePopup.querySelector('.popup__form').addEventListener('submit', evt => {
		evt.preventDefault() // Предотвращаем стандартное поведение формы

		// Обновляем текст в профиле
		profileName.textContent = nameInput.value
		profileDescription.textContent = jobInput.value

		closePopup(profilePopup) // Закрываем попап
	})
	// Открытие попапа добавления карточки
	profileAddButton.addEventListener('click', () => {
		openPopup(popupTypeNewCard)
	})

	// Закрытие всех попапов при клике на крестик
	document.querySelectorAll('.popup__close').forEach(closeButton => {
		closeButton.addEventListener('click', () => {
			const popup = closeButton.closest('.popup')
			closePopup(popup)
		})
	})

	document.querySelectorAll('.popup').forEach(popup => {
		popup.addEventListener('click', handleOverlayClick)
	})

	// Настройка формы добавления карточки
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

	// Добавление начальных карточек
	initialCards.forEach(cardData => {
		const cardElement = createCard(
			cardData,
			handleLikeButton,
			handleDelete,
			handleImageClick
		)
		placesList.append(cardElement)
	})
})
