function fetchPlayerData() {
  // Accessing the 'HomePage' sheet to get the username
  var homeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('HomePage');
  var username = homeSheet.getRange('G2').getValue();  // Get the username from cell G2 on the 'HomePage'

  if (!username) {
    homeSheet.getRange('G3').setValue('Please enter a username in cell G2.');
    return;  // Stop execution if no username is provided
  }

  // Accessing the 'API' sheet to update data
  var apiSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('API');
  
  var discordName = 'YOUR_DISCORD_NAME';  // Replace with your actual Discord name
  var url = 'https://api.wiseoldman.net/v2/players/' + encodeURIComponent(username); // Build URL with dynamic username
  var response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': discordName
    }
  });
  var json = JSON.parse(response.getContentText());

  // Clear previous messages
  homeSheet.getRange('G3').clearContent();

  // Continue with your existing data processing logic...
  // Mapping of skills to their respective cells for experience, rank, and level on the 'API' sheet
  var cellMapping = {
    'Fishing': {exp: 'B2', rank: 'C2', level: 'D2'},
    'Runecrafting': {exp: 'B3', rank: 'C3', level: 'D3'},
    'Agility': {exp: 'B4', rank: 'C4', level: 'D4'},
    'Mining': {exp: 'B5', rank: 'C5', level: 'D5'},
    'Smithing': {exp: 'B6', rank: 'C6', level: 'D6'},
    'Hunter': {exp: 'B7', rank: 'C7', level: 'D7'}
  };

  if (json && json.latestSnapshot && json.latestSnapshot.data && json.latestSnapshot.data.skills) {
    Object.keys(cellMapping).forEach(function(skill) {
      var skillData = json.latestSnapshot.data.skills[skill.toLowerCase()];
      if (skillData) {
        apiSheet.getRange(cellMapping[skill].exp).setValue(skillData.experience || 'No data');
        apiSheet.getRange(cellMapping[skill].rank).setValue(skillData.rank || 'No data');
        apiSheet.getRange(cellMapping[skill].level).setValue(skillData.level || 'No data');
      }
    });
  } else {
    Logger.log('No data or incorrect JSON structure');
    homeSheet.getRange('G3').setValue('No data or incorrect JSON structure');
  }
}
