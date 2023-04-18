export default class Tooltip {
	constructor() {
		this.tooltips = [];
	}

	showTooltip(popoverData, element) {
		const tooltipElement = document.createElement('DIV');
		const title = document.createElement('H3');
		const content = document.createElement('DIV');
		const whiteArrow = document.createElement('DIV');
		const blackArrow = document.createElement('DIV');

		tooltipElement.classList.add('popover');
		title.classList.add('popover_header');
		content.classList.add('popover_body');
		whiteArrow.classList.add('white_arrow');
		blackArrow.classList.add('black_arrow');

		title.textContent = popoverData.title;
		content.textContent = popoverData.content;

		const id = performance.now();

		this.tooltips.push({
			id,
			element: tooltipElement
		})

		document.body.prepend(tooltipElement);

		const popover = document.querySelector('.popover');
		popover.append(title, content, whiteArrow, blackArrow);

		const { left, top } = element.getBoundingClientRect();
		popover.style.left = left + (element.offsetWidth - popover.offsetWidth) / 2 + 'px';
		popover.style.top = top - popover.offsetHeight - blackArrow.offsetHeight / 2 + 'px';

		blackArrow.style.left = (popover.offsetWidth - blackArrow.offsetWidth) / 2 + 'px';
		whiteArrow.style.left = blackArrow.style.left;
		return id;
	}

	removeTooltip(id) {
		const tooltip = this.tooltips.find(t => t.id === id);

		tooltip.element.remove();

		this.tooltips = this.tooltips.filter(t => t.id !== id);
	}
}
