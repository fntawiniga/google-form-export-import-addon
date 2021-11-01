class CustomVideoItem {
  import(node, zipFileId, form) {
    
  }

  export(item, folder) {
    var childXml = XmlService.createElement('video-item');

    return childXml;
  }
}