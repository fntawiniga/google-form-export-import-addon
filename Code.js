/**
 * A global constant String holding the title of the add-on. This is
 * used to identify the add-on in the notification emails.
 */

var ADDON_TITLE = 'Form Export/Import';
var APP_TEMP_FOLDER  = 'FORM_EXPORT_IMPORT_TEMP';

/**
 * Adds a custom menu to the active form to show the add-on sidebar.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  FormApp.getUi()
      .createAddonMenu()
      .addItem('Export', 'showExportPicker')  
      .addItem('Import', 'showImportPicker')   
      .addItem('About',  'showAbout')
      .addToUi();
}

/**
 * Create app temp foler
 */
function createAppTempFolder() {
  var userProperties = PropertiesService.getUserProperties();
  var folders = DriveApp.getFoldersByName(APP_TEMP_FOLDER);
  var found = false;
  while (folders.hasNext()) {
    found = true;
    var folder = folders.next();    
    userProperties.setProperty('APP_TEMP_FOLDER', folder.getId());  
    break;
  }

  if(!found) {
    var folder = DriveApp.createFolder(APP_TEMP_FOLDER);
    userProperties.setProperty('APP_TEMP_FOLDER', folder.getId());  
  }
}

/**
 * Opens a purely-informational dialog in the form explaining details about
 * this add-on.
 */
function showExportPicker() {
  var htmlTemplate = HtmlService.createTemplateFromFile('index');
  htmlTemplate.dataFromServerTemplate = { mode: "export"};
    
  var ui = htmlTemplate.evaluate()
      .setWidth(900)
      .setHeight(500)      
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  FormApp.getUi().showModalDialog(ui, 'Export');
}

/**
 * Opens a purely-informational dialog in the form explaining details about
 * this add-on.
 */
function showImportPicker() {
  var htmlTemplate = HtmlService.createTemplateFromFile('index');
  htmlTemplate.dataFromServerTemplate = { mode: "import"};
    
  var ui = htmlTemplate.evaluate()
      .setWidth(900)
      .setHeight(500)      
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  FormApp.getUi().showModalDialog(ui, 'Import');
}

/**
 * Opens a purely-informational dialog in the form explaining details about
 * this add-on.
 */
function showAbout() {
  var ui = HtmlService.createHtmlOutputFromFile('about')
      .setWidth(420)
      .setHeight(270);
  FormApp.getUi().showModalDialog(ui, 'About Form Export/Import');
}

/**
 * Include the content of the file in the html code
 *
 * @param {string} filename The file to include
 * 
 * @return {string} The file content
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}
