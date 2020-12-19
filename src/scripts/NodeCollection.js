function NodeCollection() {
    this.items = [];
}

NodeCollection.prototype.addTestData = function() {
    this.items.push({
        title: "Hello world A",
        description: "Question",
        x: 50,
        y: 50
    });

    this.items.push({
        title: "Hello world B",
        description: "Question",
        x: 500,
        y: 50
    });

    this.items.push({
        title: "Hello world C",
        description: "Question",
        x: 500,
        y: 500
    });
}

export default NodeCollection;