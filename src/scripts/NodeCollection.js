function NodeCollection() {
    this.items = [];
}

NodeCollection.prototype.getForId = function(id) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
            return this.items[i];
        }
    }
    return null;
}

NodeCollection.prototype.addTestData = function() {
    this.items.push({
        id: 'a',
        title: "Hello world A",
        description: "Question",
        x: 50,
        y: 50,
        connections: [ ]
    });

    this.items.push({
        id: 'b',
        title: "Hello world B",
        description: "Question",
        x: 500,
        y: 50,
        connections: [ ]        
    });

    this.items.push({
        id: 'c',
        title: "Hello world C",
        description: "Question",
        x: 500,
        y: 500,
        connections: [
            {
                'id': 'a',
                'label': 'yes'
            },
            {
                'id': 'b',
                'label': 'no'
            }
        ]
    });
}

export default NodeCollection;