function updateCells() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var sourceRange = sheet.getSheetByName("api").getRange("B2:B6");
    var destinationRange = sheet.getActiveSheet().getRange("D30:D34");
    
    destinationRange.setValues(sourceRange.getValues()); // Copy values only
}
