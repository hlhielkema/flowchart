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

    // Create default rename handler
    this.renameLabelHandler = function(currentName, rename) {
        var newName = prompt('Enter a new name', currentName);
        if (newName !== null) {
            rename(newName);
        }
    }    
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

Flowchart.prototype.onEditNode = function(nodeId) {
    alert('edit node: ' + nodeId);
}

Flowchart.prototype.onLinkNode = function(nodeId) {
    alert('link node: ' + nodeId);
}

export default Flowchart;