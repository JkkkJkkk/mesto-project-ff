import { createCard } from './card'
import { closePopup } from './modal'

const cohortId = 'wff-cohort-25'
const apiUrl = `https://nomoreparties.co/v1/${cohortId}`
const token = '9bea7d06-a363-495d-8a84-706c9d81bcd2'

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const placesList = document.querySelector('.places__list')

const checkResponse = res => {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка: ${res.status}`)
}

export const getUserData = () => {
	return fetch(`${apiUrl}/users/me`, {
		headers: {
			authorization: token,
		},
	}).then(checkResponse)
}

export const getCards = () => {
	return fetch(`${apiUrl}/cards`, {
		headers: {
			authorization: token,
		},
	}).then(checkResponse)
}

export function updateUserData(name, about) {
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
	}).then(checkResponse)
}

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
	}).then(checkResponse)
}

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

export function updateAvatar(url) {
	return fetch(`${apiUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ avatar: url }),
	}).then(checkResponse)
}
