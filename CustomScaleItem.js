class CustomScaleItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
     var childXml = XmlService.createElement('scale-item');

    return childXml;
  }
}