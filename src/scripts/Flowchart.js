import MouseDragDropTracker from './util/MouseDragDropTracker';
import CanvasController from './CanvasController';
import DomController from './DomController';

// TODO:
// - Prevent selecting invalid node links.
// - Allow custom handlers for the linking process.
// - Create optimal positions for node relations with one click.
// - Allow setting a start node
// - Add preview line when linking nodes
// - Create vue.js component

function Flowchart(selector) {
    this.parentContainer = document.querySelector(selector);

    this.container = document.createElement('div');
    this.container.classList.add('flowchart');
    this.container.classList.add('editor-mode');
    this.parentContainer.appendChild(this.container);

    this.dragDropEngine = new MouseDragDropTracker();

    this.offset = { x: 0, y:0 };
    this.nodes = [];
    this.canvas = new CanvasController(this);
    this.dom = new DomController(this);
    this.mode = 'editor'; // editor | view | select-for-link
    this.linkFrom = null;    

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

Flowchart.prototype.setMode = function setMode(mode) {
    const availableModes = [ 'editor', 'view', 'select-for-link' ];
    if (availableModes.indexOf(mode) === -1) {
        throw 'Invalid mode name';
    }

    if (this.mode !== mode) {
        this.mode = mode;

        // Remove all mode classes from the container
        for (var i = 0; i < availableModes.length; i++) {
            const className = availableModes[i] + '-mode';
            if (this.container.classList.contains(className)) {
                this.container.classList.remove(className);
            }
        }

        // Add the new mode class
        this.container.classList.add(mode + '-mode');
    }
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

Flowchart.prototype.onNodeSelectedForLink = function onNodeSelectedForLink(node) {
    var canLink = this.mode === 'select-for-link' && this.linkFrom !== null && this.linkFrom != node;    

    if (canLink) {
        for (var i = 0; i < this.linkFrom.connections.length; i++) {
            if (this.linkFrom.connections[i].id === node.id) {
                canLink = false;

                // TODO: move to custom handler
                alert('There is already a connection between these nodes.');

                break;
            }
        }
    }

    var label = null;
    if (canLink) {
        // TODO: move to custom handler
        label = prompt('Label', 'yes');
        canLink = label !== null;
    }

    if (canLink) {    
        // Add the connection
        this.linkFrom.connections.push({
            'id': node.id,
            'label': label
        });        
    }
    
    this.setMode('editor');
    this.render();
}

Flowchart.prototype.onEditNode = function onEditNode(node) {
    if (this.editNodeHandler !== null) {
        this.editNodeHandler(node);
    }
}

Flowchart.prototype.onLinkNode = function onLinkNode(node) {
    this.linkFrom = node;
    this.setMode('select-for-link');
}

Flowchart.prototype.onOffsetChanged = function onOffsetChanged() {
    if (this.mode === 'editor') {
        // Deselect all nodes and labels
        this.dom.deselectAll();
    }

    // Render canvas again
    this.canvas.render();

    // Update positions of DOM elements
    this.dom.updateLabelPositions();
    this.dom.updateNodePositions();
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