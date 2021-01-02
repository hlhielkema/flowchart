import {
    NODE_ELEMENT_HEIGHT, NODE_ELEMENT_WIDTH, LABEL_ELEMENT_HEIGHT, LABEL_ELEMENT_WIDTH,
} from './Constants';

function DomLabelController(parent, from, to, label) {
    this.parent = parent;
    this.from = from;
    this.to = to;
    this.label = label;
    this.element = null;
    this.selected = false;
}

DomLabelController.prototype.render = function () {
    const element = document.createElement('div');
    element.classList.add('label');

    const innerElement = document.createElement('div');
    innerElement.classList.add('inner');
    innerElement.innerText = this.label;

    innerElement.appendChild(this.renderActions());
    element.appendChild(innerElement);

    const position = this.getLineCenter();

    // Set initial position
    element.style.top = `${position.y + this.parent.parent.offset.y}px`;
    element.style.left = `${position.x + this.parent.parent.offset.x}px`;

    const self = this;
    element.addEventListener('click', () => {
        // Labels can only be selected in editor mode
        if (self.parent.parent.mode === 'editor') {
            self.onLabelSelected();
        }
    });

    this.element = element;
    return element;
};

DomLabelController.prototype.renderActions = function () {
    const actionsElement = document.createElement('div');
    const renameElement = document.createElement('div');
    const removeElement = document.createElement('div');

    actionsElement.classList.add('actions');

    renameElement.innerText = 'Rename';
    removeElement.innerText = 'Remove';

    actionsElement.appendChild(renameElement);
    actionsElement.appendChild(removeElement);

    const self = this;
    renameElement.addEventListener('click', () => {
        self.onRenameLabel();
    });
    removeElement.addEventListener('click', () => {
        self.onRemoveConnection();
    });

    return actionsElement;
};

DomLabelController.prototype.updatePosition = function () {
    const position = this.getLineCenter();

    this.element.style.top = `${position.y + this.parent.parent.offset.y}px`;
    this.element.style.left = `${position.x + this.parent.parent.offset.x}px`;
};

DomLabelController.prototype.getLineCenter = function () {
    return {
        x: (this.from.x + this.to.x) / 2 + (NODE_ELEMENT_WIDTH / 2) - (LABEL_ELEMENT_WIDTH / 2),
        y: (this.from.y + this.to.y) / 2 + (NODE_ELEMENT_HEIGHT / 2) - (LABEL_ELEMENT_HEIGHT / 2),
    };
};

DomLabelController.prototype.applySelected = function applySelected() {
    const hasClass = this.element.classList.contains('selected');
    if (hasClass != this.selected) {
        if (this.selected) {
            this.element.classList.add('selected');
        }
        else {
            this.element.classList.remove('selected');
        }
    }
};

DomLabelController.prototype.onRenameLabel = function onRenameLabel() {
    this.parent.onRenameLabel(this.from, this.to);
};

DomLabelController.prototype.onRemoveConnection = function onRemoveConnection() {
    this.parent.onRemoveConnection(this.from, this.to);
};

DomLabelController.prototype.onLabelSelected = function onLabelSelected() {
    if (!this.selected) {
        this.selected = true;
        this.applySelected();
        this.parent.onLabelSelected(this);
    }
};

export default DomLabelController;
