class CustomCheckboxGridItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('checkbox-grid-item');

    return childXml;
  }
}