function DomNodeController(parent, node) {
    this.parent = parent;
    this.node = node;
    this.element = null;
    this.actions = [
        {
            title: 'Edit'
        },
        {
            title: 'Link'
        }
    ]
}

DomNodeController.prototype.render = function() {
    var element = document.createElement('div');
    element.classList.add('node');
    
    const innerElement = document.createElement('div');
    innerElement.classList.add('inner');
    element.appendChild(innerElement);

    innerElement.appendChild(this.renderActions());

    // Render and add information elements
    innerElement.appendChild(this.renderInfo());

    // Set initial position
    element.style.top = this.node.y + 'px';
    element.style.left = this.node.x + 'px';
    
    // Start the drag/drop logic on the mouse down event
    const self = this;
    element.addEventListener('mousedown', (e) => {
        self.startDragDrop(e, element);
    });

    this.element = element;
    return element;
}

DomNodeController.prototype.renderInfo = function() {
    // Create elements
    var element = document.createElement('div');
    var titleElement = document.createElement('div');
    var descriptionElement = document.createElement('div');

    // Add classes
    element.classList.add('info');
    titleElement.classList.add('title');
    descriptionElement.classList.add('description');

    // Combine elements
    element.appendChild(titleElement);
    element.appendChild(descriptionElement);

    // Set elements text
    titleElement.innerText = this.node.title;
    descriptionElement.innerText = this.node.description;

    return element;
}

DomNodeController.prototype.renderActions = function() {
    const actionsElement = document.createElement('div');
    actionsElement.classList.add('actions');

    for (var i = 0; i < this.actions.length; i++) {
        var actionElement = document.createElement('div');
        actionElement.innerText = this.actions[i].title;
        actionsElement.appendChild(actionElement);
    }

    return actionsElement;
}

// Apply the position on the element
DomNodeController.prototype.applyPosition = function applyPosition() {
    // Set the position properties
    this.element.style.top = `${this.node.y}px`;
    this.element.style.left = `${this.node.x}px`;

    // Signal to the parent DOM controller that the position of a node changed
    this.parent.onNodePositionChanged();
};

// Start the drag/drop logic(from mousedown event)
DomNodeController.prototype.startDragDrop = function startDragDrop(e) {
    const self = this;
    this.parent.dragDropEngine.start(e, {
        init(session) {
            // Store the initial tile position
            session.setInitialPosition(self.node.x, self.node.y);
        },
        transform(session, dx, dy, x, y, first, completed) {
            // First transform
            if (first) {
                // Make sure that the movement animation is disabled
                if (self.element.classList.contains('animate-position')) {
                    self.element.classList.remove('animate-position');
                }
            }

            // Update the position
            self.node.x = session.initialX + dx;
            self.node.y = session.initialY + dy;

            // Apply the new position
            self.applyPosition();           
        },
    });
};

export default DomNodeController;