
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

flowchart.init();