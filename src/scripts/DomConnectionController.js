// TODO: Move to one location
const NODE_ELEMENT_HEIGHT = 74;
const NODE_ELEMENT_WIDHT = 260;
const LABEL_ELEMENT_HEIGHT = 34;
const LABEL_ELEMENT_WIDHT = 100;

function DomConnectionController(parent, from, to, label) {
    this.parent = parent;
    this.from = from;
    this.to = to;
    this.label = label;
    this.element = null;
}

DomConnectionController.prototype.render = function() {
    var element = document.createElement('div');
    element.classList.add('label');
    element.innerText = this.label;
    
    var position = this.getLineCenter();

    // Set initial position
    element.style.top = position.y + 'px';
    element.style.left = position.x + 'px';

    this.element = element;
    return element;
}

DomConnectionController.prototype.updatePosition = function() {

    var position = this.getLineCenter();

    this.element.style.top = position.y + 'px';
    this.element.style.left = position.x + 'px';
}

DomConnectionController.prototype.getLineCenter = function() {
    return {
        x: (this.from.x + this.to.x) / 2 + (NODE_ELEMENT_WIDHT / 2) - (LABEL_ELEMENT_WIDHT / 2),
        y: (this.from.y + this.to.y) / 2 + (NODE_ELEMENT_HEIGHT / 2) - (LABEL_ELEMENT_HEIGHT / 2),
    }
}

export default DomConnectionController;