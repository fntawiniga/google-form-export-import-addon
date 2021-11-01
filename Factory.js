class Factory {
  export(item, folder) {
    var customItem = null;
    var typedItem = null;
    var type = item.getType();
    var name = type.toString();
    //Logger.log(name);

    var nodeContent = "";

    switch (type) {
      case FormApp.ItemType.CHECKBOX:
        customItem = new CustomCheckboxItem();
        typedItem = item.asCheckboxItem();
        break;
      case FormApp.ItemType.CHECKBOX_GRID:
        customItem = new CustomCheckboxGridItem();
        typedItem = item.asCheckboxGridItem();
        break;
      case FormApp.ItemType.DATE:
        customItem = new CustomDateItem();
        typedItem = item.asDateItem();
        break;
      case FormApp.ItemType.DATETIME:
        customItem = new CustomDateTimeItem();
        typedItem = item.asDateTimeItem();
        break;
      case FormApp.ItemType.DURATION:
        customItem = new CustomDurationItem();
        typedItem = item.asDurationItem();
        break;
      case FormApp.ItemType.GRID:
        customItem = new CustomGridItem();
        typedItem = item.asGridItem();
        break;
      case FormApp.ItemType.IMAGE:
        customItem = new CustomImageItem();
        typedItem = item.asImageItem();
        break;
      case FormApp.ItemType.LIST:
        customItem = new CustomListItem();
        typedItem = item.asListItem();
        break;
      case FormApp.ItemType.MULTIPLE_CHOICE:
        //Question
        customItem = new CustomMultipleChoiceItem();
        typedItem = item.asMultipleChoiceItem();
        break;
      case FormApp.ItemType.PAGE_BREAK:
        //Section
        customItem = new CustomPageBreakItem();
        typedItem = item.asPageBreakItem();
        break;
      case FormApp.ItemType.SCALE:
        customItem = new CustomScaleItem();
        typedItem = item.asScaleItem();
        break;
      case FormApp.ItemType.SECTION_HEADER:
        //text
        customItem = new CustomSectionHeaderItem();
        typedItem = item.asSectionHeaderItem();
        break;
      case FormApp.ItemType.TEXT:
        //Question
        customItem = new CustomTextItem();
        typedItem = item.asTextItem();
        break; 
      case FormApp.ItemType.TIME:
        customItem = new CustomTimeItem();
        typedItem = item.asTimeItem();
        break;
      case FormApp.ItemType.VIDEO:
        customItem = new CustomVideoItem();
        typedItem = item.asVideoItem();
        break;            
    }

    return customItem.export(typedItem, folder);
  }

  import(node, zipFileId, form) {
     var customItem = null;

    switch (node.getName()) {
      case 'form-item':
        customItem = new CustomFormItem();
      case 'checkbox-item':
        customItem = new CustomCheckboxItem();
        break;
      case 'checkbox-grid-item':
        customItem = new CustomCheckboxGridItem();
        break;
      case 'date-item':
        customItem = new CustomDateItem();
        break;
      case 'date-time-item':
        customItem = new CustomDateTimeItem();
        break;
      case 'duration-item':
        customItem = new CustomDurationItem();
        break;
      case 'grid-item':
        customItem = new CustomGridItem();
        break;
      case 'image-item':
        customItem = new CustomImageItem();
        break;
      case 'list-item':
        customItem = new CustomListItem();
        break;
      case 'multiple-choice-item':
        //Question
        customItem = new CustomMultipleChoiceItem();
        break;
      case 'page-break-item':
        //Section
        customItem = new CustomPageBreakItem();
        break;
      case 'scale-item':
        customItem = new CustomScaleItem();
        break;
      case 'section-header-item':
        //text
        customItem = new CustomSectionHeaderItem();
        break;
      case 'text-item':
        //Question
        customItem = new CustomTextItem();
        break; 
      case 'time-item':
        customItem = new CustomTimeItem();
        break;
      case 'video-item':
        customItem = new CustomVideoItem();
        break;            
    }
    
    customItem.import(node, zipFileId, form);
  }
}