// constructor: DragDropSession
// e:
//    document mousedown event arguments.
// events:
//    {
//       init: function (session) { ... },
//       transform: function (session, dx, dy, x, y, first, completed) { ... }
//    }
function DragDropSession(e, events) {
    this.target = e.target;
    this.initialPageX = e.pageX;
    this.initialPageY = e.pageY;
    this.first = true;
    this.transform = events.transform;
}

// Store the initial position
DragDropSession.prototype.setInitialPosition = function setInitialPosition(x, y) {
    this.initialX = x;
    this.initialY = y;
};

export default DragDropSession;