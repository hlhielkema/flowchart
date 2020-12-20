import MouseDragDropTracker from './util/MouseDragDropTracker';
import DomNodeController from './DomNodeController';

function DomController(parent, nodes) {
    this.parent = parent;
    this.parentContainer = parent.container;
    this.nodes = nodes;
    this.container = null;
    this.dragDropEngine = new MouseDragDropTracker();
}

DomController.prototype.init = function() {
    this.container = document.createElement('div');
    this.container.classList.add('node-container');
    this.parentContainer.appendChild(this.container);
}

DomController.prototype.render = function() {
    // Clear container content
    this.container.innerHTML = '';

    // Loop through the nodes
    var nodes = this.nodes.items;
    for (var i = 0; i < nodes.length; i++) {            
        // Create controller for node
        var nodeController = new DomNodeController(this, nodes[i]);

        // Render the node element    
        var nodeElement = nodeController.render();

        // Add the node element to the container
        this.container.appendChild(nodeElement);
    }
}

DomController.prototype.onNodePositionChanged = function() {
    this.parent.onNodePositionChanged();
}


export default DomController;