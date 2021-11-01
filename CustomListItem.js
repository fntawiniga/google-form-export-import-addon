class CustomListItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('list-item');

    return childXml;
  }
}