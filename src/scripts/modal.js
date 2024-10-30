export function openPopup(popupElement) {
	popupElement.classList.add('popup_is-opened')
	document.addEventListener('keyup', handleEscape)
}

export function closePopup(popupElement) {
	popupElement.classList.remove('popup_is-opened')
	document.removeEventListener('keyup', handleEscape)
}

function handleEscape(evt) {
	if (evt.key === 'Escape') {
		document
			.querySelectorAll('.popup_is-opened')
			.forEach(popup => closePopup(popup))
	}
}

export function handleOverlayClick(event) {
	if (event.target === event.currentTarget) {
		closePopup(event.currentTarget)
	}
}
