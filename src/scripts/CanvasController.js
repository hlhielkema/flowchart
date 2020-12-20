
// TODO: Move to one location
const NODE_ELEMENT_HEIGHT = 74;
const NODE_ELEMENT_WIDHT = 260;

function CanvasController(parentContainer, nodes) {
    this.parentContainer = parentContainer;
    this.nodes = nodes;
    this.canvas = null;
    this.context = null;
}

CanvasController.prototype.init = function() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext("2d");
    this.parentContainer.appendChild(this.canvas);
}

CanvasController.prototype.render = function() {
    const context = this.context;

    // Set height and width
    this.canvas.width = this.parentContainer.clientWidth;
    this.canvas.height = this.parentContainer.offsetHeight;

    // Clear the canvas
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);  

    // Set stroke style
    context.lineWidth = 2;
    context.strokeStyle = '#e4e4e4';

    // Loop through the nodes
    const nodes = this.nodes.items;
    for (var i = 0; i < nodes.length; i++)
    {
        const from = this.getNodeElementCenter(nodes[i]);        
        
        for (var t = 0; t < nodes[i].connections.length; t++) {
            const targetNode = this.nodes.getForId(nodes[i].connections[t].id);
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
        x: node.x + (NODE_ELEMENT_WIDHT / 2),
        y: node.y + (NODE_ELEMENT_HEIGHT / 2)
    };
}


export default CanvasController;