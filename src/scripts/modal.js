export function openPopup(popupElement) {
	popupElement.classList.add('popup_is-opened')
}

export function closePopup(popupElement) {
	popupElement.classList.remove('popup_is-opened')
}

const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const profileAddButton = document.querySelector('.profile__add-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const formEditElement = popupTypeEdit.querySelector('.popup__form')
const nameInput = formEditElement.querySelector('input[name="name"]')
const jobInput = formEditElement.querySelector('input[name="description"]')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

// Открытие профиля
profileEditButton.addEventListener('click', () => {
	nameInput.value = profileName.textContent
	jobInput.value = profileDescription.textContent
	openPopup(popupTypeEdit)
})

// Открытие карточки
profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard))

// Закрытие по крестику
document.querySelectorAll('.popup__close').forEach(button => {
	button.addEventListener('click', () => closePopup(button.closest('.popup')))
})

// Закрытие на оверлей
document.querySelectorAll('.popup').forEach(popup => {
	popup.addEventListener('click', event => {
		if (event.target === popup) {
			closePopup(popup)
		}
	})
})

// Закрытие по клавише Esc
document.addEventListener('keyup', evt => {
	if (evt.key === 'Escape') {
		document
			.querySelectorAll('.popup_is-opened')
			.forEach(popup => closePopup(popup))
	}
})

// Функция открытия попапа с изображением
export function openImagePopup(imageUrl, imageAlt) {
	const popupTypeImage = document.querySelector('.popup_type_image')
	const popupImage = popupTypeImage.querySelector('.popup__image')
	const popupCaption = popupTypeImage.querySelector('.popup__caption')

	popupImage.src = imageUrl
	popupImage.alt = imageAlt
	popupCaption.textContent = imageAlt
	openPopup(popupTypeImage)
}

// Обработчик формы редактирования профиля
formEditElement.addEventListener('submit', evt => {
	evt.preventDefault()
	profileName.textContent = nameInput.value
	profileDescription.textContent = jobInput.value
	closePopup(popupTypeEdit)
})

// Обработчик формы добавления карточки
const formAddElement = popupTypeNewCard.querySelector('.popup__form')

export function setupAddCardForm(placesList, createCard) {
	formAddElement.addEventListener('submit', evt => {
		evt.preventDefault()

		const newCardData = {
			name: formAddElement.querySelector('input[name="place-name"]').value,
			link: formAddElement.querySelector('input[name="link"]').value,
		}

		const newCard = createCard(newCardData, handleLikeButton)
		placesList.prepend(newCard)

		closePopup(popupTypeNewCard)
		formAddElement.reset()
	})
}

//Лайк
function handleLikeButton(event) {
	event.target.classList.toggle('card__like-button_active') // Переключаем класс для изменения стиля
}
