class CustomTimeItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('time-item');

    return childXml;
  }
}