function testImport() {
  var zipFileId = "1tmUhWIe0ouYEoQY5uX-z7xbv3IjzCZ1R";
  var size = startImportFunction(zipFileId);
  for(var i = 0;i < size;i++) {    
    processImportFunction(i);
  }
  endExportFunction();
}

/**
 * Start Export function
 *
 * @param {string} parentFolderId the parent folder id
 * 
 * @return {integer} the total number of Form items
 */
function startImportFunction(zipFileId) {  
  createAppTempFolder();

  var userProperties = PropertiesService.getUserProperties();
  var appTempFolderId = userProperties.getProperty('APP_TEMP_FOLDER');
  var appTempFolder  = DriveApp.getFolderById(appTempFolderId);

  var zipFile = DriveApp.getFileById(zipFileId);
  userProperties.setProperty('ZIP_FILE_ID', zipFile.getId());

  var formName = getFilename(zipFile.getName());
  var folder = appTempFolder.createFolder(formName);
  userProperties.setProperty('FOLDER_ID', folder.getId());

  var fileBlobs = Utilities.unzip(zipFile.getBlob());

  var xmlFile = null;

  for(var i=0;i < fileBlobs.length; i++) {
    var fileBlob = fileBlobs[i];
    var name = fileBlob.getName();
    if(name == (formName + ".xml")) {
      xmlFile = folder.createFile(fileBlob);
      userProperties.setProperty('XML_FILE_ID', xmlFile.getId());
      break;
    }
  }

  //var form = FormApp.getActiveForm();
  var form = FormApp.create(formName);
  userProperties.setProperty('FORM_ID', form.getId());


  if(xmlFile !== null) {
    var data = xmlFile.getBlob().getDataAsString();
    var xmlDocument = XmlService.parse(data);
    var rootXml = xmlDocument.getRootElement();
    var nodes = rootXml.getChildren();

    return nodes.length;
  }
  else {
    return 0;
  }
}

function processImportFunction(index) {
  var userProperties = PropertiesService.getUserProperties();
  var xmlFileId = userProperties.getProperty('XML_FILE_ID');
  var folderId = userProperties.getProperty('FOLDER_ID');  
  var formId = userProperties.getProperty('FORM_ID');
  var zipFileId = userProperties.getProperty('ZIP_FILE_ID');

  //var folder = DriveApp.getFolderById(folderId);

  var xmlFile = DriveApp.getFileById(xmlFileId);
  var data = xmlFile.getBlob().getDataAsString();
  var xmlDocument = XmlService.parse(data);
  var rootXml = xmlDocument.getRootElement();

  var nodes = rootXml.getChildren();
  var node = nodes[index];

  var form = FormApp.openById(formId);

  var factory = new Factory();
  factory.import(node, zipFileId, form);

  return nodes.length;
}

function endImportFunction() {
  var userProperties = PropertiesService.getUserProperties();
  var formId = userProperties.getProperty('FORM_ID');
  var folderId = userProperties.getProperty('FOLDER_ID');

  var form = FormApp.openById(formId);

  var folder = DriveApp.getFolderById(folderId);
  
  folder.setTrashed(true);

  return form.getTitle();
}
