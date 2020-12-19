import Item from "./Item.js";

// constructor: ContextMenu
function List() {
    this.items = [];   
}

// Add an item
List.prototype.add = function(item) {
   this.items.push(item);
}

export default List;