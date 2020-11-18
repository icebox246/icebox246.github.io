const editNodeText = () => {
  hideContextMenu();
  selectedNode.innerHTML = "";
  const currentlySelectedNode = selectedNode;
  const contentObject = getNodeContentObject(currentlySelectedNode);
  const textField = document.createElement("textarea");
  textField.value = contentObject.text;
  textField.classList.add("node-editor");
  textField.addEventListener("keyup", function (e) {
    contentObject.text = this.value;
    if (e.keyCode == 27) {
      renderSubtree(currentlySelectedNode, contentObject);
    }
  });
  selectedNode.appendChild(textField);
}