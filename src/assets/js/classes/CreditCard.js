import Validator from './Validator';
import Tooltip from './Tooltip';

class CreditCard {
	/**
	 * Создать экземпляр CreditCard, который работает с полями ввода карты
	 * @constructor
	 */
	constructor() {
		/**
		 * Корневной HTML-элемент компонента
		 * @type {HTMLElement}
		 */
		this._rootElement = document.querySelector('.credit-card');

		/**
		 * Объект для валидации значений
		 * @type {Validator}
		 */
		this._validator = new Validator();

		/**
		 * Объект для управление подсказкой
		 * @type {Tooltip}
		 */
		this._tooltip = new Tooltip({
			button: '.credit-card__tooltip-button',
			tooltip: '.credit-card__tooltip',
		});
	}

	/** Инициализировать компонент */
	init() {
		this._setEventListeners();
		this._tooltip.init();
	}

	/** Добавить слушателей событий */
	_setEventListeners() {
		const inputElements = this._rootElement.querySelectorAll('input');

		for (let i = 0; i < inputElements.length; i++) {
			const inputElement = inputElements[i];
			inputElement.addEventListener('input', this._handleInput.bind(this));
		}
	}

	/**
	 * Обработать событие ввода
	 * @param {Event} evt - событие
	 */
	_handleInput(evt) {
		const { inputMode, id } = evt.target;

		const isCardOnName = id === 'name-on-card-id';
		const isNumericMode = inputMode === 'numeric';
		const isExpireDate = id === 'expire-date-id';

		if (isCardOnName) {
			this._validator.checkElementValidity({
				element: evt.target,
				errorMessage: 'Only letters (A-Z, a-z), spaces, hyphens, and apostrophes are allowed',
			});
		}

		if (isNumericMode) {
			this._validator.checkElementValidity({
				element: evt.target,
				errorMessage: 'Only numbers are allowed',
			});
		}

		if (isExpireDate) {
			this._handleExpireDateInput(evt);
		}
	}

	/**
	 * Обработать событие ввода на поле ввода даты
	 * @param {Event} evt - событие
	 */
	_handleExpireDateInput(evt) {
		this._validator.checkElementValidity({
			element: evt.target,
			errorMessage: 'Please enter the date in the following format: MM/YY',
		});

		this._addNumberSeparator(evt);
	}

	/**
	 * Подставить и убрать разделитель чисел
	 * @param {Event} evt - событие
	 */
	_addNumberSeparator(evt) {
		const { value } = evt.target;

		if (evt.inputType === 'insertText') {
			if (value.length === 2) {
				evt.target.value = value + `/`;
			}

			if (value.length === 3) {
				evt.target.value = value[0] + value[1] + '/' + value[2];
			}
		}

		if (evt.inputType === 'deleteContentBackward') {
			if (value.length === 2) {
				evt.target.value = evt.target.value.slice(0, -1);
			}

			if (value.length === 3) {
				evt.target.value = value[0] + value[1] + '/';
			}
		}
	}
}

export default CreditCard;
