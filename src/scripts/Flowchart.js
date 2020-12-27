import NodeCollection from './NodeCollection';
import CanvasController from './CanvasController';
import DomController from './DomController';

function Flowchart(selector) {
    this.parentContainer = document.querySelector(selector);

    this.container = document.createElement('div');
    this.container.classList.add('flowchart');
    this.parentContainer.appendChild(this.container);

    this.nodes = new NodeCollection();
    this.canvas = new CanvasController(this.container, this.nodes);
    this.dom = new DomController(this, this.nodes);
}

Flowchart.prototype.init = function () {
    this.canvas.init();
    this.dom.init();

    this.nodes.addTestData();
    this.render();
}

Flowchart.prototype.render = function() {
    this.canvas.render();
    this.dom.render();
}

Flowchart.prototype.onNodePositionChanged = function() {
    this.canvas.render();
}

Flowchart.prototype.onRenameLabel = function(from, to) {
    alert('rename label: ' + from.id + '->' + to.id);
}

Flowchart.prototype.onRemoveConnection = function(from, to) {
    alert('remove connection: ' + from.id + '->' + to.id);
}

Flowchart.prototype.onEditNode = function(nodeId) {
    alert('edit node: ' + nodeId);
}

Flowchart.prototype.onLinkNode = function(nodeId) {
    alert('link node: ' + nodeId);
}

export default Flowchart;