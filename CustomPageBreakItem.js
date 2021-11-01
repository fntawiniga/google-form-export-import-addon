class CustomPageBreakItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('page-break-item');

    var text = item.getTitle();
    var grandChildXml = XmlService.createElement('title').setText(text);
    childXml.addContent(grandChildXml);

    text = item.getHelpText();
    grandChildXml = XmlService.createElement('help-text').setText(text);
    childXml.addContent(grandChildXml);

    return childXml;
  }
}