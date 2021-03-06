import templateEngine from './../../template/engine.js';

class Item {
	constructor (options) {
		this.el = options.el;
		this.data = options.data;
		this._template = document.querySelector(options.template).innerHTML;

		this.render();
		this._initEvents();
	}

	/**
	 * Add new item
	 * @param {Object} item
	 */
	addItem (item) {
		this.data.items.unshift(item);
		this.render();
	}

	/**
	 * Remove item from data
	 * @param {Object} itemIndex
	 */
	removeItem (itemIndex) {
		if (itemIndex > -1) {
		    this.data.items.splice(itemIndex, 1);
		}

		this.render();
	}

	getNameByIndex (itemIndex) {
		let itemName = null;

		if (itemIndex > -1) {
			itemName = this.data.items[itemIndex].name;
		}

		return itemName;
	}

	render (data) {
		if (data) {
 			this.data = data;
 		}

		this.el.innerHTML = templateEngine(this._template, this.data);
	}

	/**
	* Trigger an event
	* @param {string} name - event's type
	* @param {Object} data - event's object
	*/
	trigger (name, data) {
		let widgetEvent = new CustomEvent(name, {
			bubbles: true,
			detail: data
		});

		this.el.dispatchEvent(widgetEvent);
	}

	_initEvents () {
		this.el.addEventListener('click', this._removeOnClick.bind(this));
	}

	_removeOnClick (event) {
		let target = event.target;
		let items = Array.prototype.slice.call( this.el.children );

	    if (target.classList.contains('book__delete')) {
	    	this.trigger('remove', items.indexOf(target.parentNode));
	    }
	}

	_animateLoading (on, object) { 
		if (on) {
			object.className += ' animate-spin';
		} else {
			object.className = object.className.replace(' animate-spin', '');
		}
	}
}

//Export
export default Item;
