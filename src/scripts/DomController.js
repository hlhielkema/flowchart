import MouseDragDropTracker from './util/MouseDragDropTracker';
import DomNodeController from './DomNodeController';
import DomLabelController from './DomLabelController';

function DomController(parent, nodes) {
    this.parent = parent;
    this.parentContainer = parent.container;
    this.nodes = nodes;
    this.nodeControllers = null;
    this.labelControllers = null;
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

DomController.prototype.createLabelControllers = function() {
    this.labelControllers = [];
    const nodes = this.nodes.items;
    for (var i = 0; i < nodes.length; i++) {
        for (var t = 0; t < nodes[i].connections.length; t++) {
            var from = nodes[i];
            var to = this.nodes.getForId(nodes[i].connections[t].id);
            var label = nodes[i].connections[t].label;
            
            this.labelControllers.push(new DomLabelController(this, from, to, label));
        }
    }
}

DomController.prototype.render = function() {
    // Clear container content
    this.container.innerHTML = '';

    // Create the controllers
    this.createNodeControllers();
    this.createLabelControllers();

    // Loop through the nodes    
    for (var i = 0; i < this.nodeControllers.length; i++) {                    
        // Render the node element    
        var nodeElement = this.nodeControllers[i].render();

        // Add the node element to the container
        this.container.appendChild(nodeElement);
    }

    // Loop through the labels    
    for (var i = 0; i < this.labelControllers.length; i++) {                    
        // Render the label element    
        var labelElement = this.labelControllers[i].render();

        // Add the label element to the container
        this.container.appendChild(labelElement);
    }
}

DomController.prototype.updateLabelPositions = function() {
 // Loop through the labels    
 for (var i = 0; i < this.labelControllers.length; i++) {                    
     // Update the position
    this.labelControllers[i].updatePosition();
}
}

DomController.prototype.onNodePositionChanged = function() {
    this.updateLabelPositions();
    this.parent.onNodePositionChanged();
}

DomController.prototype.onLabelSelected = function onLabelSelected(selectLabel) {
    // Loop through the nodes    
    for (var i = 0; i < this.nodeControllers.length; i++) {                    
        const nodeController = this.nodeControllers[i];
        nodeController.selected = false;
        nodeController.applySelected();
    }

    // Loop through the labels
    for (var j = 0; j < this.labelControllers.length; j++) {
        const labelController = this.labelControllers[j];
        if (labelController !== selectLabel) {
            labelController.selected = false;
            labelController.applySelected();
        }
    }
}

DomController.prototype.onNodeSelected = function onNodeSelected(selectedNode) {
    // Loop through the nodes    
    for (var i = 0; i < this.nodeControllers.length; i++) {                    
        const nodeController = this.nodeControllers[i];
        if (nodeController !== selectedNode) {
            nodeController.selected = false;
            nodeController.applySelected();
        }
    }

    // Loop through the labels
    for (var j = 0; j < this.labelControllers.length; j++) {
        const labelController = this.labelControllers[j];
        labelController.selected = false;
        labelController.applySelected();
    }
}

DomController.prototype.onEditNode = function onEditNode(nodeController) {
    this.parent.onEditNode(nodeController.getNodeId());
}

DomController.prototype.onLinkNode = function onLinkNode(nodeController) {
    this.parent.onLinkNode(nodeController.getNodeId());
}

DomController.prototype.onRenameLabel = function onRenameLabel(from, to) {
    this.parent.onRenameLabel(from, to);
}

DomController.prototype.onRemoveConnection = function onRemoveConnection(from, to) {
    this.parent.onRemoveConnection(from, to);
}

export default DomController;