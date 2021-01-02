import DomNodeController from './DomNodeController';
import DomLabelController from './DomLabelController';

function DomController(parent) {
    this.parent = parent;
    this.nodeControllers = null;
    this.labelControllers = null;
    this.container = null;
    this.dragDropEngine = parent.dragDropEngine;
}

DomController.prototype.init = function init() {
    this.container = document.createElement('div');
    this.container.classList.add('node-container');
    this.parent.container.appendChild(this.container);
};

DomController.prototype.createNodeControllers = function createNodeControllers() {
    this.nodeControllers = [];
    const { nodes } = this.parent;
    for (let i = 0; i < nodes.length; i++) {
        // Create controller for the node and add it to the array
        this.nodeControllers.push(new DomNodeController(this, nodes[i]));
    }
};

DomController.prototype.createLabelControllers = function createLabelControllers() {
    this.labelControllers = [];
    const { nodes } = this.parent;
    for (let i = 0; i < nodes.length; i++) {
        for (let t = 0; t < nodes[i].connections.length; t++) {
            const from = nodes[i];
            const to = this.parent.getNodeForId(nodes[i].connections[t].id);
            const { label } = nodes[i].connections[t];

            this.labelControllers.push(new DomLabelController(this, from, to, label));
        }
    }
};

DomController.prototype.render = function render() {
    // Clear container content
    this.container.innerHTML = '';

    // Create the controllers
    this.createNodeControllers();
    this.createLabelControllers();

    // Loop through the nodes
    for (let i = 0; i < this.nodeControllers.length; i++) {
        // Render the node element
        const nodeElement = this.nodeControllers[i].render();

        // Add the node element to the container
        this.container.appendChild(nodeElement);
    }

    // Loop through the labels
    for (let j = 0; j < this.labelControllers.length; j++) {
        // Render the label element
        const labelElement = this.labelControllers[j].render();

        // Add the label element to the container
        this.container.appendChild(labelElement);
    }
};

DomController.prototype.updateLabelPositions = function updateLabelPositions() {
    // Loop through the labels
    for (let i = 0; i < this.labelControllers.length; i++) {
        // Update the position
        this.labelControllers[i].updatePosition();
    }
};

DomController.prototype.updateNodePositions = function updateNodePositions() {
    // Loop through the nodes
    for (let i = 0; i < this.nodeControllers.length; i++) {
        // Update the position
        this.nodeControllers[i].applyPosition();
    }
};

DomController.prototype.onNodePositionChanged = function onNodePositionChanged() {
    this.updateLabelPositions();
    this.parent.onNodePositionChanged();
};

DomController.prototype.onLabelSelected = function onLabelSelected(selectLabel) {
    // Loop through the nodes
    for (let i = 0; i < this.nodeControllers.length; i++) {
        const nodeController = this.nodeControllers[i];
        nodeController.selected = false;
        nodeController.applySelected();
    }

    // Loop through the labels
    for (let j = 0; j < this.labelControllers.length; j++) {
        const labelController = this.labelControllers[j];
        if (labelController !== selectLabel) {
            labelController.selected = false;
            labelController.applySelected();
        }
    }
};

DomController.prototype.onNodeSelected = function onNodeSelected(selectedNode) {
    // Loop through the nodes
    for (let i = 0; i < this.nodeControllers.length; i++) {
        const nodeController = this.nodeControllers[i];
        if (nodeController !== selectedNode) {
            nodeController.selected = false;
            nodeController.applySelected();
        }
    }

    // Loop through the labels
    for (let j = 0; j < this.labelControllers.length; j++) {
        const labelController = this.labelControllers[j];
        labelController.selected = false;
        labelController.applySelected();
    }
};

// Deselect all nodes and labels
DomController.prototype.deselectAll = function unselectAll() {
    // Loop through the nodes
    for (let i = 0; i < this.nodeControllers.length; i++) {
        const nodeController = this.nodeControllers[i];
        nodeController.selected = false;
        nodeController.applySelected();
    }

    // Loop through the labels
    for (let j = 0; j < this.labelControllers.length; j++) {
        const labelController = this.labelControllers[j];
        labelController.selected = false;
        labelController.applySelected();
    }
};

DomController.prototype.onNodeSelectedForLink = function onNodeSelectedForLink(nodeController) {
    this.parent.onNodeSelectedForLink(nodeController.node);
};

DomController.prototype.onEditNode = function onEditNode(nodeController) {
    this.parent.onEditNode(nodeController.node);
};

DomController.prototype.onLinkNode = function onLinkNode(nodeController) {
    this.parent.onLinkNode(nodeController.node);
};

DomController.prototype.onRenameLabel = function onRenameLabel(from, to) {
    this.parent.onRenameLabel(from, to);
};

DomController.prototype.onRemoveConnection = function onRemoveConnection(from, to) {
    this.parent.onRemoveConnection(from, to);
};

export default DomController;
