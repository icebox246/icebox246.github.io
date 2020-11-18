const getNodeContentObject = node => {
  const moves = [];
  let currentNode = node;
  let contentObject = currentDocument.root;
  while (!currentNode.classList.contains("root")) {
    if (currentNode.classList.contains("first")) {
      moves.push("first");
    } else {
      moves.push("second");
    }
    currentNode = currentNode.parentElement;
  }

  while (moves.length > 0) {
    if (moves.pop() == "first") contentObject = contentObject.firstChild;
    else contentObject = contentObject.secondChild;
  }

  return contentObject;
}

const swapNodeChildren = () => {
  hideContextMenu();
  const contentObject = getNodeContentObject(selectedNode);
  if (contentObject.parent == false) return;
  const tempNode = contentObject.firstChild;
  contentObject.firstChild = contentObject.secondChild;
  contentObject.secondChild = tempNode;
  renderSubtree(selectedNode, contentObject);
}

const copyContent = node => {
  return {
    leaf: node.leaf,
    horizontal: node.horizontal || false,
    text: node.text,
    firstChild: node.firstChild,
    secondChild: node.secondChild
  }
};

const flipSplitDirection = () => {
  hideContextMenu();
  let contentObject = getNodeContentObject(selectedNode);
  if (contentObject.horizontal == true) contentObject.horizontal = false;
  else contentObject.horizontal = true;
  renderSubtree(selectedNode, contentObject);
}

const attachNewNodeBefore = () => {
  hideContextMenu();
  let contentObject = getNodeContentObject(selectedNode);
  if (contentObject.leaf == false) return;
  const tempObject = copyContent(contentObject);
  contentObject.leaf = false;
  contentObject.horizontal = tempObject.horizontal;
  contentObject.text = "";
  contentObject.firstChild = {
    leaf: true,
    text: "<p>new</p>"
  };
  contentObject.secondChild = tempObject;
  renderSubtree(selectedNode, contentObject);
}

const attachNewNodeAfter = () => {
  hideContextMenu();
  let contentObject = getNodeContentObject(selectedNode);
  if (contentObject.leaf == false) return;
  const tempObject = copyContent(contentObject);
  contentObject.leaf = false;
  contentObject.horizontal = tempObject.horizontal;
  contentObject.text = "";
  contentObject.firstChild = tempObject;
  contentObject.secondChild = {
    leaf: true,
    text: "<p>new</p>"
  };

  renderSubtree(selectedNode, contentObject);
}

const deleteSiblingNode = () => {
  hideContextMenu();
  let contentObject = getNodeContentObject(selectedNode);
  if (contentObject.leaf == false) return;
  let parentNode = selectedNode.parentElement;
  if(!parentNode.classList.contains("node")) {
    return;
  }
  parentContent = getNodeContentObject(parentNode);
  parentContent.leaf = true;
  parentContent.horizontal = !contentObject.horizontal;
  parentContent.text = contentObject.text;
  parentContent.firstChild = null 
  parentContent.secondChild = null;
  renderSubtree(parentNode, parentContent);
}