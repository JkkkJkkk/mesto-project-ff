import { validationConfig } from './index'

function hideError(input, config) {
	const errorElement = input.nextElementSibling
	errorElement.textContent = ''
	input.classList.remove(config.inputErrorClass)
}

const validateInput = input => {
	const errorElement = input.nextElementSibling

	if (!input.validity.valid) {
		const errorMessage = input.dataset.errorMessage || input.validationMessage
		errorElement.textContent = errorMessage
		errorElement.classList.add('popup__error_visible')
	} else {
		errorElement.textContent = ''
		errorElement.classList.remove('popup__error_visible')
	}
}

const validateForm = form => {
	const inputs = form.querySelectorAll('input')
	inputs.forEach(input => validateInput(input))
}

function toggleSubmitButton(form, config) {
	const inputs = Array.from(form.querySelectorAll(config.inputSelector))
	const submitButton = form.querySelector(config.submitButtonSelector)
	const isFormValid = inputs.every(input => input.validity.valid)

	submitButton.disabled = !isFormValid
	submitButton.classList.toggle(config.inactiveButtonClass, !isFormValid)
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

export const enableValidation = config => {
	const forms = document.querySelectorAll(config.formSelector)

	forms.forEach(form => {
		form.addEventListener('submit', event => {
			event.preventDefault()
			clearValidation(form, config)
		})

		const inputs = form.querySelectorAll(config.inputSelector)
		inputs.forEach(input => {
			input.addEventListener('input', () => validateInput(input, config))
		})
	})
}