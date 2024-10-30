function showError(input, message, config) {
	const errorElement = input.nextElementSibling
	errorElement.textContent = message
	input.classList.add(config.inputErrorClass)
}

function hideError(input, config) {
	const errorElement = input.nextElementSibling
	errorElement.textContent = ''
	input.classList.remove(config.inputErrorClass)
}

function validateInput(input, config) {
	let isValid = true
	const value = input.value.trim()
	const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/
	const newPlaseNamePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/
	const descriptionPattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,200}$/
	const urlPattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?]?.*$/

	if (input.name === 'name' || input.name === 'place-name') {
		const pattern = input.name === 'name' ? namePattern : newPlaseNamePattern
		if (!pattern.test(value)) {
			const customMessage =
				'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
			input.dataset.error = customMessage
			showError(input, customMessage, config)
			isValid = false
		} else {
			hideError(input, config)
		}
	}

	if (input.name === 'description') {
		if (!descriptionPattern.test(value)) {
			const customMessage =
				'Описание должно содержать от 2 до 200 символов, включая только буквы, пробелы и дефисы'
			input.dataset.error = customMessage
			showError(input, customMessage, config)
			isValid = false
		} else {
			hideError(input, config)
		}
	}

	if (input.name === 'link') {
		if (!urlPattern.test(value)) {
			showError(input, 'Введите корректный URL', config)
			isValid = false
		} else {
			hideError(input, config)
		}
	}

	return isValid
}

function toggleSubmitButton(form, config) {
	const inputs = Array.from(form.querySelectorAll(config.inputSelector))
	const isValidForm = inputs.every(input => validateInput(input, config))
	const submitButton = form.querySelector(config.submitButtonSelector)
	submitButton.disabled = !isValidForm
	submitButton.classList.toggle(config.inactiveButtonClass, !isValidForm)
}

function resetValidationErrors(form, config) {
	const inputs = Array.from(form.querySelectorAll(config.inputSelector))
	inputs.forEach(input => hideError(input, config))
	toggleSubmitButton(form, config)
}

export function clearValidation(form, config) {
	resetValidationErrors(form, config)
	const submitButton = form.querySelector(config.submitButtonSelector)
	submitButton.disabled = true
	submitButton.classList.add(config.inactiveButtonClass)
}

export function enableValidation(config) {
	const forms = Array.from(document.querySelectorAll(config.formSelector))
	forms.forEach(form => {
		const inputs = Array.from(form.querySelectorAll(config.inputSelector))

		inputs.forEach(input => {
			input.addEventListener('input', () => {
				validateInput(input, config)
				toggleSubmitButton(form, config)
			})
		})

		form.addEventListener('submit', evt => {
			evt.preventDefault()
			if (!inputs.every(input => validateInput(input, config))) {
				return
			}
		})
	})
}
