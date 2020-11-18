let selectedNode = null;

const handleSelectedNode = () => {
  if(selectedNode==null) return;
  selectedNode.classList.add("hover");
}
const handleDeselectedNode = () => {
  if(selectedNode==null) return;
  selectedNode.classList.remove("hover");
}

const clickNode = () => {
  hideContextMenu();
  if(selectedNode==null) return;
  console.log(getNodeContentObject(selectedNode).text);
}

const hoverHandler = e => {
  if(menuShown) return;
  let currentNode = e.target;
  while(currentNode!=null && !currentNode.classList.contains("node")) {
    currentNode = currentNode.parentElement;
  }
  if(selectedNode==currentNode) return;
  handleDeselectedNode();
  selectedNode = currentNode;
  handleSelectedNode();
}

const contextMenuElement = document.querySelector("#context-menu");
let menuShown =false;

const showContextMenu = e => {
  contextMenuElement.classList.add("active");
  contextMenuElement.style.top= (e.pageY-5) + "px";
  contextMenuElement.style.left= (e.pageX-5) +"px";
  if(selectedNode.classList.contains("leaf")){
    contextMenuElement.classList.add("leaf-selected");
  } else {
    contextMenuElement.classList.remove("leaf-selected");
  }
  e.preventDefault();
  menuShown = true;
}

const hideContextMenu = () => {
  contextMenuElement.classList.remove("active");
  menuShown = false;
}

const addRootHandlers = node => {
  node.addEventListener("mousemove",hoverHandler);
  node.addEventListener("click",clickNode);
  node.addEventListener("contextmenu",showContextMenu);
}