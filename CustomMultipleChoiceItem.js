class CustomMultipleChoiceItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('multiple-choice-item');

    var text = item.getTitle();
    var grandChildXml = XmlService.createElement('title').setText(text);
    childXml.addContent(grandChildXml);

    return childXml;
  }
}