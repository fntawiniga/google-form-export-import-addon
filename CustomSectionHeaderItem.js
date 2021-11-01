class CustomSectionHeaderItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('section-header-item');

    return childXml;
  }
}