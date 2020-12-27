import { NODE_ELEMENT_HEIGHT, NODE_ELEMENT_WIDTH } from './Constants';

function CanvasController(parent) {
    this.parent = parent;
    this.canvas = null;
    this.context = null;
}

CanvasController.prototype.init = function() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext("2d");
    this.parent.container.appendChild(this.canvas);
}

CanvasController.prototype.render = function() {
    const context = this.context;

    // Set height and width
    this.canvas.width = this.parent.container.clientWidth;
    this.canvas.height = this.parent.container.offsetHeight;

    // Clear the canvas
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);  

    // Set stroke style
    context.lineWidth = 2;
    context.strokeStyle = '#e4e4e4';

    // Loop through the nodes
    const nodes = this.parent.nodes;
    for (var i = 0; i < nodes.length; i++)
    {
        const from = this.getNodeElementCenter(nodes[i]);        
        
        for (var t = 0; t < nodes[i].connections.length; t++) {
            const targetNode = this.parent.getNodeForId(nodes[i].connections[t].id);
            const target = this.getNodeElementCenter(targetNode);

            context.beginPath();
            context.moveTo(from.x, from.y);
            context.lineTo(target.x, target.y);
            context.stroke();             
        }        
    }
}

CanvasController.prototype.getNodeElementCenter = function(node) {
    return {
        x: node.x + (NODE_ELEMENT_WIDTH / 2),
        y: node.y + (NODE_ELEMENT_HEIGHT / 2)
    };
}

export default CanvasController;