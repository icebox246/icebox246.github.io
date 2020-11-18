const rootElement = document.querySelector('#root');
let currentDocument = {
  root : {
    leaf : false,
    text: "",
    horizontal : false,
    firstChild : {
     leaf : true,
     text : "Hello",
    },
    secondChild : {
      leaf: false,
      text : "",
      horizontal : true,
      firstChild : {
        leaf : true,
        text : "up"
      },
      secondChild : {
        leaf : true,
        text : "down"
      }
    },
  }
};


addRootHandlers(rootElement);
renderDocument(rootElement,currentDocument);