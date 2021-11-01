class CustomFormItem {
  import(node, zipFileId, form) {
    let childNode = null;
    let bValue = false;
    let strValue = "";

    childNode = node.getChild("can-edit-response");
    bValue = getBoolean(childNode);
    form.setAllowResponseEdits(bValue);

    childNode = node.getChild("collects-email");
    bValue = getBoolean(childNode);
    form.setCollectEmail(bValue);

    childNode = node.getChild("is-accepting-responses");
    bValue = getBoolean(childNode);
    form.setAcceptingResponses(bValue);

    childNode = node.getChild("is-quiz");
    bValue = getBoolean(childNode);
    form.setIsQuiz(bValue);

    childNode = node.getChild("has-limit-one-response-per-user");
    bValue = getBoolean(childNode);
    form.setLimitOneResponsePerUser(bValue);

    childNode = node.getChild("has-progress-bar");
    bValue = getBoolean(childNode);
    form.setProgressBar(bValue);

    childNode = node.getChild("has-respond-again-link");
    bValue = getBoolean(childNode);
    form.setShowLinkToRespondAgain(bValue);

    childNode = node.getChild("is-publishing-summary");
    bValue = getBoolean(childNode);
    form.setPublishingSummary(bValue);

    childNode = node.getChild("shuffle-questions");
    bValue = getBoolean(childNode);
    form.setShuffleQuestions(bValue);

    childNode = node.getChild("requires-login");
    bValue = getBoolean(childNode);
    form.setRequireLogin(bValue);

    childNode = node.getChild("confirmation-message");
    strValue = getString(childNode);
    form.setConfirmationMessage(strValue);

    childNode = node.getChild("title");
    strValue = getString(childNode);
    form.setTitle(strValue);

    childNode = node.getChild("description");
    strValue = getString(childNode);
    form.setDescription(strValue);

    childNode = node.getChild("custom-closed-form-message");
    strValue = getString(childNode);
    form.setCustomClosedFormMessage(strValue);
  }

  export(item, folder) {
    let childXml = XmlService.createElement('form-item');

    let strValue = "";
    let bValue = false;
    let grandChildXml = null;

    bValue = item.canEditResponse();    
    grandChildXml = XmlService.createElement('can-edit-response').setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.collectsEmail();    
    grandChildXml = XmlService.createElement("collects-email").setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.isAcceptingResponses();    
    grandChildXml = XmlService.createElement("is-accepting-responses").setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.isQuiz();    
    grandChildXml = XmlService.createElement("is-quiz").setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.hasLimitOneResponsePerUser();    
    grandChildXml = XmlService.createElement("has-limit-one-response-per-user").setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.hasProgressBar();    
    grandChildXml = XmlService.createElement("has-progress-bar").setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.hasRespondAgainLink();    
    grandChildXml = XmlService.createElement("has-respond-again-link").setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.isPublishingSummary();    
    grandChildXml = XmlService.createElement("is-publishing-summary").setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.getShuffleQuestions();    
    grandChildXml = XmlService.createElement("shuffle-questions").setText(bValue.toString());
    childXml.addContent(grandChildXml);

    bValue = item.requiresLogin();    
    grandChildXml = XmlService.createElement("requires-login").setText(bValue.toString());
    childXml.addContent(grandChildXml);
    
    strValue = item.getConfirmationMessage();    
    grandChildXml = XmlService.createElement('confirmation-message').setText(strValue);
    childXml.addContent(grandChildXml);
    
    strValue = item.getTitle();
    grandChildXml = XmlService.createElement('title').setText(strValue);
    childXml.addContent(grandChildXml);

    strValue = item.getDescription();
    grandChildXml = XmlService.createElement('description').setText(strValue);
    childXml.addContent(grandChildXml);

    strValue = item.getCustomClosedFormMessage();
    grandChildXml = XmlService.createElement('custom-closed-form-message').setText(strValue);
    childXml.addContent(grandChildXml);

    return childXml;
  }
}