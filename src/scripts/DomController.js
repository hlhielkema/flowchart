import MouseDragDropTracker from './util/MouseDragDropTracker';
import DomNodeController from './DomNodeController';
import DomConnectionController from './DomConnectionController';

function DomController(parent, nodes) {
    this.parent = parent;
    this.parentContainer = parent.container;
    this.nodes = nodes;
    this.nodeControllers = null;
    this.connectionControllers = null;
    this.container = null;
    this.dragDropEngine = new MouseDragDropTracker();
}

DomController.prototype.init = function() {
    this.container = document.createElement('div');
    this.container.classList.add('node-container');
    this.parentContainer.appendChild(this.container);
}

DomController.prototype.createNodeControllers = function() {
    this.nodeControllers = [];
    const nodes = this.nodes.items;
    for (var i = 0; i < nodes.length; i++) { 
        // Create controller for the node and add it to the array        
        this.nodeControllers.push(new DomNodeController(this, nodes[i]));
    }
}

DomController.prototype.createConnectionControllers = function() {
    this.connectionControllers = [];
    const nodes = this.nodes.items;
    for (var i = 0; i < nodes.length; i++) {
        for (var t = 0; t < nodes[i].connections.length; t++) {
            var from = nodes[i];
            var to = this.nodes.getForId(nodes[i].connections[t].id);
            var label = nodes[i].connections[t].label;
            
            this.connectionControllers.push(new DomConnectionController(this, from, to, label));
        }
    }
}

DomController.prototype.render = function() {
    // Clear container content
    this.container.innerHTML = '';

    // Create the controllers
    this.createNodeControllers();
    this.createConnectionControllers();

    // Loop through the nodes    
    for (var i = 0; i < this.nodeControllers.length; i++) {                    
        // Render the node element    
        var nodeElement = this.nodeControllers[i].render();

        // Add the node element to the container
        this.container.appendChild(nodeElement);
    }

    // Loop through the connections    
    for (var i = 0; i < this.connectionControllers.length; i++) {                    
        // Render the connection element    
        var connectionElement = this.connectionControllers[i].render();

        // Add the connection element to the container
        this.container.appendChild(connectionElement);
    }
}

DomController.prototype.updateLabelPositions = function() {
 // Loop through the connections    
 for (var i = 0; i < this.connectionControllers.length; i++) {                    
     // Update the position
    this.connectionControllers[i].updatePosition();
}
}

DomController.prototype.onNodePositionChanged = function() {
    this.updateLabelPositions();
    this.parent.onNodePositionChanged();
}


export default DomController;