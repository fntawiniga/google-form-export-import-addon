class CustomGridItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('grid-item');

    return childXml;
  }
}