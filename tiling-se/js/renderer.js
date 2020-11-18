const renderSubtree = (element, content) => {
    element.innerHTML="";
  if(content.horizontal) {
    element.classList.add("horizontal");
  } else {
    element.classList.remove("horizontal");
  }
  if (content.leaf) {
    element.classList.add("leaf");
    element.classList.remove("parent");
    element.innerHTML = content.text;
    return;
  }

  element.classList.remove("leaf")
  element.classList.add("parent");
  const firstChild = element.appendChild(document.createElement('div'));
  firstChild.classList.add("node","first");
  renderSubtree(firstChild, content.firstChild);

  const secondChild = element.appendChild(document.createElement('div'));
  secondChild.classList.add("node","second");
  renderSubtree(secondChild, content.secondChild);
}

const renderDocument = (element, doc) => {
  rootNode = element.appendChild(document.createElement('div'));
  rootNode.classList.add("node","root")
  renderSubtree(rootNode, doc.root);
};