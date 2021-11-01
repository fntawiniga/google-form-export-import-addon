class CustomDurationItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('duration-item');

    return childXml;
  }
}