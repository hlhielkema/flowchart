
var flowchart = new Flowchart('.flowchar-container');

flowchart.setEditNodeHandler(function (node) {
    alert('Click \'Edit\' on for node with id: ' + node.id);
})

flowchart.setRenameLabelHandler(function(currentName, rename) {
    var newName = prompt('Enter a new name', currentName);
    if (newName !== null) {
        rename(newName);
    }
});

flowchart.setNodes([
    {
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
    },
    {
        id: 'b',
        title: "Hello world B",
        description: "Question",
        x: 200,
        y: 500,
        connections: [
            {
                'id': 'd',
                'label': 'yes'
            }    
        ]   
    },
    {
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
    },
    {
        id: 'd',
        title: "Hello world D",
        description: "Question",
        x: 450,
        y: 800,
        connections: [ ]
    },
    {
        id: 'e',
        title: "Hello world E",
        description: "Question",
        x: 800,
        y: 800,
        connections: [ ]
    }
]);