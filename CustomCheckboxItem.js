class CustomCheckboxItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('checkbox-item');

    return childXml;
  }
}