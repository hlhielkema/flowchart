// TODO: Move to one location
const NODE_ELEMENT_HEIGHT = 74;
const NODE_ELEMENT_WIDHT = 260;
const LABEL_ELEMENT_HEIGHT = 34;
const LABEL_ELEMENT_WIDHT = 100;

function DomLabelController(parent, from, to, label) {
    this.parent = parent;
    this.from = from;
    this.to = to;
    this.label = label;
    this.element = null;
    this.actions = [
        {
            title: 'Rename'
        },
        {
            title: 'Remove'
        }
    ]
}

DomLabelController.prototype.render = function() {
    const element = document.createElement('div');
    element.classList.add('label');

    const innerElement = document.createElement('div');
    innerElement.classList.add('inner');
    innerElement.innerText = this.label;

    innerElement.appendChild(this.renderActions());
    element.appendChild(innerElement);


    const position = this.getLineCenter();

    // Set initial position
    element.style.top = position.y + 'px';
    element.style.left = position.x + 'px';

    this.element = element;
    return element;
}

DomLabelController.prototype.renderActions = function() {
    const actionsElement = document.createElement('div');
    actionsElement.classList.add('actions');

    for (var i = 0; i < this.actions.length; i++) {
        var actionElement = document.createElement('div');
        actionElement.innerText = this.actions[i].title;
        actionsElement.appendChild(actionElement);
    }

    return actionsElement;
}

DomLabelController.prototype.updatePosition = function() {

    var position = this.getLineCenter();

    this.element.style.top = position.y + 'px';
    this.element.style.left = position.x + 'px';
}

DomLabelController.prototype.getLineCenter = function() {
    return {
        x: (this.from.x + this.to.x) / 2 + (NODE_ELEMENT_WIDHT / 2) - (LABEL_ELEMENT_WIDHT / 2),
        y: (this.from.y + this.to.y) / 2 + (NODE_ELEMENT_HEIGHT / 2) - (LABEL_ELEMENT_HEIGHT / 2),
    }
}

export default DomLabelController;