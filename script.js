let CURRENT_NODE_ID = 1;
let HIGHLIGHTED_CLASS_NAME = 'highlighted-node'
let root;
     
class Node
{
    constructor(value) {
       this.left = null;
       this.right = null;
       this.value = value;
    }
}
 
// Function to insert nodes in level order
function getTreeByArray(arr, i)
{
    let root = null;
    // Base case for recursion
    if (i < arr.length) {
        root = new Node(arr[i]);

        // insert left child
        root.left = getTreeByArray(arr, 2 * i + 1);

        // insert right child
        root.right = getTreeByArray(arr, 2 * i + 2);
    }
    return root;
}

function getSubTree(node) {
    const subTreeContainer = document.createElement('ul');
    if(node.left) {
        const leftNodeContainer = document.createElement('li');
        const valueContainer = document.createElement('a');
        valueContainer.innerHTML = node.left.value;
        addIdToNode(valueContainer)
        leftNodeContainer.append(valueContainer);
        if(node.left.left || node.left.right) {
            const leftSubTree = getSubTree(node.left);
            leftNodeContainer.append(leftSubTree);
        };
        subTreeContainer.append(leftNodeContainer);
    }
    if(node.right) {
        const rightNodeContainer = document.createElement('li');
        const valueContainer = document.createElement('a');
        addIdToNode(valueContainer)
        valueContainer.innerHTML = node.right.value;
        rightNodeContainer.append(valueContainer);
        if(node.right.right || node.right.left) {
            const rightSubTree = getSubTree(node.right);
            rightNodeContainer.append(rightSubTree);
        }
        subTreeContainer.append(rightNodeContainer);

    }
    return subTreeContainer;
}

function addRootNodeToHTML(treeContainerElement,tree) {
    const rootContainer = document.createElement('ul');
    const rootValueContainer = document.createElement('li');
    const rootValue = document.createElement('a');
    addIdToNode(rootValue);
    rootValue.innerHTML = tree.value;
    rootValueContainer.append(rootValue);
    rootContainer.append(rootValueContainer);
    treeContainerElement.append(rootContainer);
    addClickListenerOnNode(rootContainer);
}

function addClickListenerOnNode(tree){
    tree.addEventListener('click',(e)=>{
        if(e.target.tagName == 'A') {
            onNodeClick(e.target.id)
        }
    }) 
}

function onNodeClick(currentNodeId){
    resetHighlightedNode(); // remove highlisted style if active
    let currentNode = document.getElementById(currentNodeId);
    highLightNode(currentNode);
    let parrentNode = checkParentNode(currentNode);
    while(parrentNode) {
        highLightNode(parrentNode);
        parrentNode = checkParentNode(parrentNode);
    }
    function highLightNode(node) {
        node.classList.add(HIGHLIGHTED_CLASS_NAME);
    }
    function checkParentNode(node){
    if(node.parentElement.parentElement.parentElement.tagName == 'LI'){
        return node.parentElement.parentElement.parentElement.children[0];
    }
    else {
        return false
    }
    }
}

function addIdToNode(node){
 node.id = `node-count-${CURRENT_NODE_ID}`;
 CURRENT_NODE_ID++;
}

function resetHighlightedNode (){
    const allHighLightedNode = document.querySelectorAll("."+HIGHLIGHTED_CLASS_NAME);
    allHighLightedNode.forEach(element=>{
        element.classList.remove(HIGHLIGHTED_CLASS_NAME);
    })
}

function onSubmit(){
    const inputValue = document.getElementById('node-input').value;
    if(inputValue) {
        const arrInput = inputValue.split(',');
        const tree = getTreeByArray(arrInput, 0); 
        displayTree(tree)
    }
}

function displayTree(tree){
    const treeContainerElement = document.getElementById('tree');
    treeContainerElement.innerHTML = ''; // reset Tree
    addRootNodeToHTML(treeContainerElement,tree);
    if(tree.left || tree.right) {
        const subTree = getSubTree(tree);
        const rootNodeElement = treeContainerElement.children[0].children[0];
        rootNodeElement.append(subTree);
    }
}



function MAIN(){
    const defaultTreeArray = [1,2,3,4,5,6];
    const tree = getTreeByArray(defaultTreeArray, 0);
    displayTree(tree)
}
MAIN();