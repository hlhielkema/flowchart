import CanvasController from './CanvasController';
import DomController from './DomController';

function Flowchart(selector) {
    this.parentContainer = document.querySelector(selector);

    this.container = document.createElement('div');
    this.container.classList.add('flowchart');
    this.parentContainer.appendChild(this.container);

    this.nodes = [];
    this.canvas = new CanvasController(this);
    this.dom = new DomController(this);

    // Handlers
    this.editNodeHandler = null; // function(node : object)
    this.renameLabelHandler = null; // function(currentName : string, rename : function(name : string)) { ... };

    // Init
    this.canvas.init();
    this.dom.init();
}

Flowchart.prototype.render = function render() {
    this.canvas.render();
    this.dom.render();
}

Flowchart.prototype.setNodes = function setNodes(nodes) {
    this.nodes = nodes;
    this.render();
}

Flowchart.prototype.getNodes = function getNodes() {
    return this.nodes;
}

Flowchart.prototype.onNodePositionChanged = function() {
    this.canvas.render();
}

Flowchart.prototype.onRenameLabel = function onRenameLabel(from, to) {
    var connection = null;
    for (var i = 0; i < from.connections.length; i++) {
        if (from.connections[i].id === to.id) {
            connection = from.connections[i];
        }
    }
    if (connection === null) {
        throw 'Connection not found';
    }

    const self = this;
    this.renameLabelHandler(connection.label, function(newName) { 
        if (newName.length > 0 && connection.label !== newName) {                
            connection.label = newName;
            self.render();
        }
     });
}

Flowchart.prototype.onRemoveConnection = function(from, to) {
    for (var i = 0; i < from.connections.length; i++) {
        if (from.connections[i].id === to.id) {
            from.connections.splice(i, 1);
            break;
        }
    }    
    this.render();
}

Flowchart.prototype.onEditNode = function(node) {
    if (this.editNodeHandler !== null) {
        this.editNodeHandler(node);
    }
}

Flowchart.prototype.onLinkNode = function(node) {
    alert('link node: ' + node.id);
}

Flowchart.prototype.setEditNodeHandler = function setEditNodeHandler(handler) {
    this.editNodeHandler = handler;
}

Flowchart.prototype.setRenameLabelHandler = function setRenameLabelHandler(handler) {
    this.renameLabelHandler = handler;
}

Flowchart.prototype.getNodeForId = function(id) {
    for (var i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].id === id) {
            return this.nodes[i];
        }
    }
    return null;
}

export default Flowchart;