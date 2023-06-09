import Observer from './Observer';

class Header extends Observer {
	/**
	 * Создать экземпляр Header, который расширяет Observer
	 * @param {Basket} subject - экземпляр объекта наблюдения
	 * @constructor
	 */
	constructor(subject) {
		super(subject);

		/**
		 * Корневной HTML-элемент компонента
		 * @type {HTMLElement}
		 */
		this._rootElement = document.querySelector('.header');
	}

	/** Инициализировать компонент */
	init() {
		this._subject.addObserver(this);
	}

	/** Обновить данные наблюдателя */
	update() {
		this._updateTotalCount(this._subject.totalCount);
	}

	/**
	 * Обновить количество всех товаров
	 * @param {number} totalCount - количество всех товаров
	 */
	_updateTotalCount(totalCount) {
		const basketCounter = this._rootElement.querySelector('.header__cart-counter');

		basketCounter.textContent = totalCount;

		// Скрыть счетчик, если нет товаров
		if (totalCount === 0) {
			basketCounter.classList.add('badge_hidden');
		} else {
			basketCounter.classList.remove('badge_hidden');
		}

		// Скорректировать стили, если значение счетчика двузначное
		if (totalCount > 9) {
			basketCounter.classList.add('badge_digit_multi');
		} else {
			basketCounter.classList.remove('badge_digit_multi');
		}
	}
}

export default Header;
