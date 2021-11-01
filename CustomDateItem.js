class CustomDateItem {
  import(node, zipFileId, form) {
    let childNode = null;
    let strValue = "";
    let bValue = false;
    let nbrValue = 0;
    let dateItem = form.addDateItem();

    childNode = node.getChild("title");
    strValue = getString(childNode);
    dateItem.setTitle(strValue);

    childNode = node.getChild("help-text");
    strValue = getString(childNode);
    dateItem.setHelpText(strValue);

    childNode = node.getChild("points");
    nbrValue = getNumber(childNode);
    dateItem.setPoints(nbrValue);

    childNode = node.getChild("includes-year");
    bValue = getBoolean(childNode);
    dateItem.setIncludesYear(bValue);

    childNode = node.getChild("required");
    bValue = getBoolean(childNode);
    dateItem.setRequired(bValue);

    var feedback = getGeneralFeedbackFromXml(node);
    if(feedback !== null) {
      dateItem.setGeneralFeedback(feedback);
    }
  }
  
  export(item, folder) {
    var childXml = XmlService.createElement('date-item');

    var strValue = ""
    var nbrValue = 0;
    var bValue = false;
    
    strValue = item.getTitle();
    var grandChildXml = XmlService.createElement('title').setText(strValue);
    childXml.addContent(grandChildXml);

    strValue = item.getHelpText();
    grandChildXml = XmlService.createElement('help-text').setText(strValue);
    childXml.addContent(grandChildXml);

    nbrValue = item.getPoints();
    grandChildXml = XmlService.createElement('points').setText(nbrValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.includesYear();
    grandChildXml = XmlService.createElement('includes-year').setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.isRequired();
    grandChildXml = XmlService.createElement('required').setText(bValue.toString());
    childXml.addContent(grandChildXml);
    
    var feedback = item.getGeneralFeedback();
    grandChildXml = getGeneralFeedbackFromForm(feedback);
    if(grandChildXml !== null) {
      childXml.addContent(grandChildXml);
    }

    return childXml;
  }
}