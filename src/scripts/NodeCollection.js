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
        x: 450,
        y: 200,
        connections: [
            {
                'id': 'b',
                'label': 'yes'
            },
            {
                'id': 'c',
                'label': 'no'
            },        
        ]
    });

    this.items.push({
        id: 'b',
        title: "Hello world B",
        description: "Question",
        x: 200,
        y: 500,
        connections: [
            {
                'id': 'd',
                'label': 'yes'
            },
            {
                'id': 'c',
                'label': 'no'
            },        
        ]   
    });

    this.items.push({
        id: 'c',
        title: "Hello world C",
        description: "Question",
        x: 700,
        y: 500,
        connections: [
            {
                'id': 'd',
                'label': 'yes'
            },             
        ]
    });

    this.items.push({
        id: 'd',
        title: "Hello world D",
        description: "Question",
        x: 450,
        y: 800,
        connections: [ ]
    });
}

export default NodeCollection;