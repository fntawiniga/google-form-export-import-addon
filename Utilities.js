/**
 * Get files as blobs in a folder
 *
 * @param {object} rootFolder the root folder
 * @param {string} path the root folder
 * 
 * @return {object} the list of files as blob
 */
function getBlobs(rootFolder, path) {
  var blobs = [];
  var files = rootFolder.getFiles();
  while (files.hasNext()) {
    var file = files.next().getBlob();
    file.setName(path+file.getName());
    blobs.push(file);
  }
  var folders = rootFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    var fPath = path+folder.getName()+'/';
    blobs.push(Utilities.newBlob([]).setName(fPath)); //comment/uncomment this line to skip/include empty folders
    blobs = blobs.concat(getBlobs(folder, fPath));
  }
  return blobs;
}

/**
 * Get file name without extension
 *
 * @param {string} fileWithExtension filename with extension
 * 
 * @return {string} the filename without extension
 */
function getFilename(fileWithExtension) {
  return fileWithExtension.split('.').slice(0, -1).join('.');
}

function getBoolean(node) {
  return node !== null ? node.getText() === "true" : true;
}

function getString(node) {
  return node !== null ? node.getText(): "";
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function getNumber(node) {
  return node !== null && isNumeric(node.getText())? Number(node.getText()): 0;
}

function getImageByMimeType(file) {
  var ftype = file.getMimeType();

    var imageName = file.getName();

    switch(ftype) {
      case MimeType.JPEG:
        imageName = imageName + ".jpg";
      break;
      case MimeType.PNG:
        imageName = imageName + ".png";
      break;
      case MimeType.BMP:
        imageName = imageName + ".bmp";
      break;
      case MimeType.GIF:
        imageName = imageName + ".gif";
      break;
      case MimeType.SVG:
        imageName = imageName + ".svg";
      break;
    }
  
  return imageName;
}

function getAlignementFromObject(object) {
  var strValue = "";
  switch(object) {
    case FormApp.Alignment.LEFT:
      strValue = "left";
    break;
    case FormApp.Alignment.CENTER:
      strValue = "center";
    break;
    case FormApp.Alignment.RIGHT:
      strValue = "right";
    break;
  }

  return strValue;
}

function getAlignementFromText(text) {
  var value = null;
  switch(text) {
    case "left":
      value = FormApp.Alignment.LEFT;
    break;
    case "center":
      value = FormApp.Alignment.CENTER;
    break;
    case "right":
      value = FormApp.Alignment.RIGHT;
    break;
  }

  return value;
}

function getFileBlobFromZip(zipFileId, filename, callback) {
  var zipFile = DriveApp.getFileById(zipFileId);

  var fileBlobs = Utilities.unzip(zipFile.getBlob());

  for(var i=0;i < fileBlobs.length; i++) {
    var fileBlob = fileBlobs[i];
    var name = fileBlob.getName();
    if(name == filename) {
      callback(fileBlob, zipFile);
      break;
    }
  }
}

function getGeneralFeedbackFromXml(node) {  
    var feedback = null;
    var strValue = "";

    var childNode = node.getChild("general-feedback");
    if(childNode !== null) {      
      feedback = FormApp.createFeedback();

      var linkUrlsNode = childNode.getChild("link-urls");
      if(linkUrlsNode !== null) {
        var linkUrlNodes = linkUrlsNode.getChildren();
        linkUrlNodes.forEach(function(linkUrlNode, index) {
          strValue = getString(linkUrlNode);
          feedback.addLink(strValue);
        });
      }

      var textNode = childNode.getChild("text");
      strValue = getString(textNode);
      feedback.setDisplayText(strValue);
    }

    return feedback;
}

function getGeneralFeedbackFromForm(feedback) {
  var feedbackNodeXml = null;
  var childNodeXml = null;
  var strValue = "";

  if(feedback !== null) {
    feedbackNodeXml = XmlService.createElement('general-feedback');

    var linkUrls = feedback.getLinkUrls();
    childNodeXml = XmlService.createElement('link-urls');
    linkUrls.forEach(function(linkUrl, index) {
      grandChildNodeXml = XmlService.createElement('link-url');
      childNodeXml.addContent(grandChildNodeXml);
    });
    feedbackNodeXml.addContent(childNodeXml);

    strValue = feedback.getText();
    childNodeXml = XmlService.createElement('text');
    feedbackNodeXml.addContent(childNodeXml);
  }   

  return feedbackNodeXml;
}

    