function TestExport() {
  var size = startExportFunction("1tGUL0w8AH5tCg-juh_97TiUCW7yfEMZf");

  for(var i = 0; i < size; i++){    
    processExportFunction(i);
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
function startExportFunction(parentFolderId) {  
  createAppTempFolder();

  var userProperties = PropertiesService.getUserProperties();
  
  var rootXml = XmlService.createElement('google-form');

  var form = FormApp.getActiveForm();

  var appTempFolderId = userProperties.getProperty('APP_TEMP_FOLDER');

  var appTempFolder  = DriveApp.getFolderById(appTempFolderId);
  var formName = form.getTitle() !== "" ? form.getTitle() : "Form - No Name";

  var folder= appTempFolder.createFolder(formName);

  var customItem = new CustomFormItem();
  var childXml = customItem.export(form, folder);    
  rootXml.addContent(childXml);
  
  var xmlDocument = XmlService.createDocument(rootXml);
  var xml = XmlService.getPrettyFormat().format(xmlDocument);

  var xmlFilename = formName + ".xml";

  //create the xml file
  var xmlFile = folder.createFile(xmlFilename, xml);

  var items = form.getItems();

  // folder where to set the final .zip file
  var parentFolder  = DriveApp.getFolderById(parentFolderId);
  
  userProperties.setProperty('XML_FILE_ID', xmlFile.getId());  
  userProperties.setProperty('FOLDER_ID', folder.getId());
  userProperties.setProperty('PARENT_FOLDER_ID', parentFolder.getId());
  userProperties.setProperty('FORM_NAME', formName);

  return items.length;
}

function processExportFunction(index) {
  var userProperties = PropertiesService.getUserProperties();
  var xmlFileId = userProperties.getProperty('XML_FILE_ID');
  var folderId = userProperties.getProperty('FOLDER_ID');
  var folder = DriveApp.getFolderById(folderId);

  var xmlFile = DriveApp.getFileById(xmlFileId);
  var data = xmlFile.getBlob().getDataAsString();
  var xmlDocument = XmlService.parse(data);
  var rootXml = xmlDocument.getRootElement();

  var form = FormApp.getActiveForm();
  var items = form.getItems();
  var item = items[index];

  var factory = new Factory();
  var childXml = factory.export(item, folder);
  rootXml.addContent(childXml);

  var xml = XmlService.getPrettyFormat().format(xmlDocument);

  xmlFile.setContent(xml);

  return items.length;
}

function endExportFunction() {
  var userProperties = PropertiesService.getUserProperties();
  var folderId = userProperties.getProperty('FOLDER_ID');
  var folder = DriveApp.getFolderById(folderId);
  
  var parentFolderId = userProperties.getProperty('PARENT_FOLDER_ID');
  var parentFolder = DriveApp.getFolderById(parentFolderId);

  var formName = userProperties.getProperty('FORM_NAME');

  //zip the whole directory
  var zipFile = formName + ".frm";
  var zipBlob = Utilities.zip(getBlobs(folder, ''), zipFile);

  parentFolder.createFile(zipBlob);

  folder.setTrashed(true);

  return zipFile;
}
