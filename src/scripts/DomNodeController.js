function DomNodeController(parent, node) {
    this.parent = parent;
    this.node = node;
    this.element = null;
    this.selected = false;
}

DomNodeController.prototype.render = function () {
    const element = document.createElement('div');
    element.classList.add('node');

    const innerElement = document.createElement('div');
    innerElement.classList.add('inner');
    element.appendChild(innerElement);

    innerElement.appendChild(this.renderActions());

    // Render and add information elements
    innerElement.appendChild(this.renderInfo());

    // Set initial position
    element.style.top = `${this.node.y + this.parent.parent.offset.y}px`;
    element.style.left = `${this.node.x + this.parent.parent.offset.x}px`;

    // Start the drag/drop logic on the mouse down event
    const self = this;
    element.addEventListener('mousedown', (e) => {
        // Only allow drag/drop in editor mode
        if (self.parent.parent.mode === 'editor') {
            self.startDragDrop(e, element);
        }
    });

    this.element = element;
    return element;
};

DomNodeController.prototype.renderInfo = function () {
    // Create elements
    const element = document.createElement('div');
    const titleElement = document.createElement('div');
    const descriptionElement = document.createElement('div');

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

    const self = this;
    element.addEventListener('click', () => {
        self.onNodeSelected();
    });

    return element;
};

DomNodeController.prototype.renderActions = function () {
    const actionsElement = document.createElement('div');
    const editElement = document.createElement('div');
    const linkElement = document.createElement('div');

    actionsElement.classList.add('actions');

    editElement.innerText = 'Edit';
    linkElement.innerText = 'Link';

    actionsElement.appendChild(editElement);
    actionsElement.appendChild(linkElement);

    const self = this;
    editElement.addEventListener('click', () => {
        self.onEditNode();
    });
    linkElement.addEventListener('click', () => {
        self.onLinkNode();
    });

    return actionsElement;
};

// Apply the position on the element
DomNodeController.prototype.applyPosition = function applyPosition() {
    // Set the position properties
    this.element.style.top = `${this.node.y + this.parent.parent.offset.y}px`;
    this.element.style.left = `${this.node.x + this.parent.parent.offset.x}px`;

    // Signal to the parent DOM controller that the position of a node changed
    this.parent.onNodePositionChanged();
};

DomNodeController.prototype.applySelected = function applySelected() {
    const hasClass = this.element.classList.contains('selected');
    if (hasClass != this.selected) {
        if (this.selected) {
            this.element.classList.add('selected');
        }
        else {
            this.element.classList.remove('selected');
        }
    }
};

// Start the drag/drop logic(from mousedown event)
DomNodeController.prototype.startDragDrop = function startDragDrop(e) {
    const self = this;
    this.parent.dragDropEngine.start(e, {
        init(session) {
            // Store the initial node position
            session.setInitialPosition(self.node.x, self.node.y);

            // Ensure that the node is selected
            self.onNodeSelected();
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

DomNodeController.prototype.getNodeId = function getNodeId() {
    return this.node.id;
};

DomNodeController.prototype.onEditNode = function onEditNode() {
    this.parent.onEditNode(this);
};

DomNodeController.prototype.onLinkNode = function onLinkNode() {
    this.parent.onLinkNode(this);
};

DomNodeController.prototype.onNodeSelected = function onNodeSelected() {
    if (this.parent.parent.mode === 'editor') {
        if (!this.selected) {
            this.selected = true;
            this.applySelected();
            if (this.selected) {
                this.parent.onNodeSelected(this);
            }
        }
    }
    else if (this.parent.parent.mode === 'select-for-link') {
        this.parent.onNodeSelectedForLink(this);
    }
};

export default DomNodeController;
