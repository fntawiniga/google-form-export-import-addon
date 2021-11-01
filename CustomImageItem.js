class CustomImageItem {
  import(node, zipFileId, form) {
    let childNode = null;
    let strValue = "";
    let nbrValue = 0;
    let imageItem = form.addImageItem();

    childNode = node.getChild("title");
    strValue = getString(childNode);
    imageItem.setTitle(strValue);

    childNode = node.getChild("help-text");
    strValue = getString(childNode);
    imageItem.setHelpText(strValue);

    childNode = node.getChild("alignement");
    strValue = getString(childNode);
    var alignement = getAlignementFromText(strValue);
    imageItem.setAlignment(alignement);

    childNode = node.getChild("width");
    nbrValue = getNumber(childNode);
    imageItem.setWidth(nbrValue);

    childNode = node.getChild("image");
    strValue = getString(childNode);
    getFileBlobFromZip(zipFileId, strValue, function(imageBlob, zipFile) {
      imageItem.setImage(imageBlob);
    });
  }
  
  export(item, folder) {
    var childXml = XmlService.createElement('image-item');

    var strValue = "";
    var nbrValue = 0;
    
    strValue = item.getTitle();
    var grandChildXml = XmlService.createElement('title').setText(strValue);
    childXml.addContent(grandChildXml);

    strValue = item.getHelpText();
    grandChildXml = XmlService.createElement('help-text').setText(strValue);
    childXml.addContent(grandChildXml);

    var alignement = item.getAlignment();
    strValue = getAlignementFromObject(alignement);
    grandChildXml = XmlService.createElement('alignement').setText(strValue);
    childXml.addContent(grandChildXml);

    nbrValue = item.getWidth();
    grandChildXml = XmlService.createElement('width').setText(nbrValue.toString());
    childXml.addContent(grandChildXml);

    var blob = item.getImage();
    var file = folder.createFile(blob);
    var imageFilename = getImageByMimeType(file);    
    file.setName(imageFilename);

    grandChildXml = XmlService.createElement('image').setText(imageFilename);
    childXml.addContent(grandChildXml);      

    return childXml;
  }
}