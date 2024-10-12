export function openPopup(popupElement) {
	popupElement.classList.add('popup_is-opened')
	document.addEventListener('keyup', handleEscape)
}

export function closePopup(popupElement) {
	popupElement.classList.remove('popup_is-opened')
	document.removeEventListener('keyup', handleEscape)
}

// Закрытие попапа при нажатии на клавишу Escape
function handleEscape(evt) {
	if (evt.key === 'Escape') {
		document
			.querySelector('.popup_is-opened')
			.forEach(popup => closePopup(popup))
	}
}

// Закрытие попапа при клике на оверлей
export function handleOverlayClick(event) {
	if (event.target === event.currentTarget) {
		closePopup(event.currentTarget)
	}
}
