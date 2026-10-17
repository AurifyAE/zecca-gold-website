// Paste into the Google Sheet: Extensions → Apps Script. Deploy as a Web app
// (Execute as: Me, Who has access: Anyone) and put the URL in GOOGLE_SHEET_WEBHOOK_URL.
// Set the same secret here and in GOOGLE_SHEET_SECRET so only your site can write.
const SECRET = "change-me";

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (sheet.getLastRow() === 0) sheet.appendRow(["Timestamp", "Email"]);
    sheet.appendRow([new Date(), body.email]);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
