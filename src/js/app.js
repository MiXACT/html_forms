import Tooltip from './tooltip';

const popoverData = {
	'title': 'Popover title',
	'content': 'Popover content'
};
// eslint-disable-next-line

const button = document.querySelector('.btn');
const tooltipFactory = new Tooltip();
let id;
button.addEventListener('click', () => {
	if (!id) id = tooltipFactory.showTooltip(popoverData, button);
	else {
		tooltipFactory.removeTooltip(id);
		id = 0;
	}
});
