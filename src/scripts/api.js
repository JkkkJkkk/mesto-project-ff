import { createCard } from './card'
import { closePopup } from './modal'

const cohortId = 'wff-cohort-25'
const apiUrl = `https://nomoreparties.co/v1/${cohortId}`
const token = '9bea7d06-a363-495d-8a84-706c9d81bcd2'

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image')
const placesList = document.querySelector('.places__list')

const checkResponse = res => {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка: ${res.status}`)
}

const getUserData = () => {
	return fetch(`${apiUrl}/users/me`, {
		headers: {
			authorization: token,
		},
	}).then(checkResponse)
}

const getCards = () => {
	return fetch(`${apiUrl}/cards`, {
		headers: {
			authorization: token,
		},
	}).then(checkResponse)
}

const renderCards = cardsData => {
	cardsData.forEach(cardData => {
		const cardElement = createCard(cardData)
		placesList.prepend(cardElement)
	})
}

Promise.all([getUserData(), getCards()])
	.then(([userData, cardsData]) => {
		profileName.textContent = userData.name
		profileDescription.textContent = userData.about
		profileAvatar.style.backgroundImage = `url(${userData.avatar})`

		renderCards(cardsData)
	})
	.catch(err => {
		console.error(err)
	})

function updateUserData(name, about) {
	return fetch(`${apiUrl}/users/me`, {
		method: 'PATCH',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	}).then(response => {
		if (!response.ok) {
			return Promise.reject(`Ошибка: ${response.status}`)
		}
		return response.json()
	})
}

document.querySelector('.popup_type_edit').addEventListener('submit', evt => {
	evt.preventDefault()

	const nameInput = document.querySelector('input[name="name"]')
	const jobInput = document.querySelector('input[name="description"]')

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

function addCard(name, link) {
	if (!name || !link) {
		console.error('Name and link cannot be empty')
		return Promise.reject('Name and link cannot be empty')
	}

	console.log('Adding card:', { name, link })

	return fetch(`${apiUrl}/cards`, {
		method: 'POST',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	}).then(response => {
		if (!response.ok) {
			return Promise.reject(`Ошибка: ${response.status}`)
		}
		return response.json()
	})
}

document
	.querySelector('.popup_type_new-card')
	.addEventListener('submit', evt => {
		evt.preventDefault()

		const nameInput = document.querySelector('input[name="place-name"]')
		const linkInput = document.querySelector('input[name="link"]')

		addCard(nameInput.value, linkInput.value)
			.then(newCardData => {
				const newCardElement = createCard(newCardData)
				placesList.prepend(newCardElement)

				closePopup(document.querySelector('.popup_type_new-card'))
				evt.target.reset()
			})
			.catch(err => {
				console.error(err)
			})
	})

export function likeCard(cardId) {
	return fetch(`${apiUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: { authorization: token },
	}).then(checkResponse)
}

export function unlikeCard(cardId) {
	return fetch(`${apiUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: { authorization: token },
	}).then(checkResponse)
}

export function deleteCard(cardId) {
	return fetch(`${apiUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: token,
		},
	}).then(checkResponse)
}

function updateAvatar(evt) {
	evt.preventDefault()

	const avatarUrl = document.querySelector('.popup__input_type_url').value

	if (!avatarUrl) {
		console.error('Avatar URL is required')
		return
	}

	fetch(`${apiUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			avatar: avatarUrl,
		}),
	})
		.then(response => {
			if (!response.ok) {
				return Promise.reject(`Ошибка: ${response.status}`)
			}
			return response.json()
		})
		.then(data => {
			document.querySelector('.profile__image').src = data.avatar
			closePopup(document.querySelector('.popup_type_avatar'))
		})
		.catch(err => {
			console.error(err)
		})
}

document
	.querySelector('.popup__form[name="edit-avatar"]')
	.addEventListener('submit', updateAvatar)
