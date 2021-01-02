import MouseDragDropTracker from './util/MouseDragDropTracker';
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

    // Start the drag/drop logic on the mouse down event
    const self = this;
    this.canvas.addEventListener('mousedown', (e) => {
        self.startDragDrop(e, self.canvas);
    });

    window.addEventListener('resize', function() {
        self.render();
    });
}

CanvasController.prototype.render = function() {
    const context = this.context;

    // Set height and width
    this.canvas.width = this.parent.container.clientWidth;
    this.canvas.height = this.parent.container.offsetHeight;

    // Clear the canvas
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);  

    // Set stroke and fill style
    context.lineWidth = 2;
    context.strokeStyle = '#e4e4e4';
    context.fillStyle = '#e4e4e4';

    // Arrow radius option
    const radius = 8;

    // Loop through the nodes
    const nodes = this.parent.nodes;
    for (var i = 0; i < nodes.length; i++)
    {
        const from = this.getNodeElementBottom(nodes[i]);        
        
        for (var t = 0; t < nodes[i].connections.length; t++) {
            const targetNode = this.parent.getNodeForId(nodes[i].connections[t].id);
            const to = this.getNodeElementTop(targetNode);

            // -- Line
            context.beginPath();
            context.moveTo(from.x, from.y);
            context.lineTo(to.x, to.y);
            context.stroke();   
                  
            // -- Arrowhead

            // Calculate the angles used to calculate the points of the arrowhead
            const angle1 = Math.atan2(to.y - from.y, to.x - from.x);
            const angle2 = angle1 + (1.0/3.0) * (2 * Math.PI)
            const angle3 = angle1 + (2.0/3.0) * (2 * Math.PI)

            // Calculate the arrowhead center
            const x_center = to.x - (radius * Math.cos(angle1));
            const y_center = to.y - (radius * Math.sin(angle1));

            // Calculate the points of the arrowhead
            const x1 = radius * Math.cos(angle1) + x_center;
            const y1 = radius * Math.sin(angle1) + y_center;
            const x2 = radius * Math.cos(angle2) + x_center;
            const y2 = radius * Math.sin(angle2) + y_center;
            const x3 = radius *Math.cos(angle3) + x_center;
            const y3 = radius *Math.sin(angle3) + y_center;

            // Draw the arrowhead
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.lineTo(x3, y3);
            context.closePath();
            context.fill();
        }        
    }
}


// Start the drag/drop logic(from mousedown event)
CanvasController.prototype.startDragDrop = function startDragDrop(e) {
    const self = this;
    this.parent.dragDropEngine.start(e, {
        init(session) {            
            // Store the initial offset
            session.setInitialPosition(self.parent.offset.x, self.parent.offset.y);          
        },
        transform(session, dx, dy, x, y, first, completed) {
            // Update the offset    
            self.parent.offset.x = session.initialX + dx;
            self.parent.offset.y = session.initialY + dy;

            // Call onOffsetChanged to update the positions of the elements and render the lines again
            self.parent.onOffsetChanged();
        },
    });
};

CanvasController.prototype.getNodeElementBottom = function(node) {
    return {
        x: node.x + (NODE_ELEMENT_WIDTH / 2) + + this.parent.offset.x,
        y: node.y + NODE_ELEMENT_HEIGHT + this.parent.offset.y
    };
}

CanvasController.prototype.getNodeElementTop = function(node) {
    return {
        x: node.x + (NODE_ELEMENT_WIDTH / 2) + this.parent.offset.x,
        y: node.y + this.parent.offset.y
    };
}

/*
CanvasController.prototype.getNodeElementCenter = function(node) {
    return {
        x: node.x + (NODE_ELEMENT_WIDTH / 2),
        y: node.y + (NODE_ELEMENT_HEIGHT / 2)
    };
}
*/

export default CanvasController;