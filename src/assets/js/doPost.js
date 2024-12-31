function doPost(e) {
    const sheet = SpreadsheetApp.openById("YOUR_SPREAD_SHEETID").getSheetByName("Sheet1");
    const data = e.parameter;

    // Append row in the correct column order
    sheet.appendRow([
        data.fullName,
        data.email,
        data.phone,
        data.company,
        data.role,
        data.location,
        data.password
    ]);

    return ContentService.createTextOutput(
        JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
}