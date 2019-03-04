
//var cache = CacheService.getPrivateCache();

function doGet() {
  return HtmlService.createHtmlOutputFromFile('v5')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}





function userActionRun(myForm) {
  
  var ss = SpreadsheetApp.openById('1IANEefOZ95jifwD3M1c93HIRXp0MNgg1Im1TqkKL_nU'); 
  
  
  
  var CLIENT_ID = ""
var CLIENT_SECRET = ""  
   var search = myForm.search
  var blogId = myForm.blogId
  var sheet2 = ss.getSheetByName('Sheet2');
  sheet2.getRange(sheet2.getLastRow()+1, 1, 1,3).setValues([[Date(),search, blogId]]); 
  var values1 = sheet2.getRange(sheet2.getLastRow(), 2,1).getValue();
 // var blog1 =sheet.getRange(sheet.getLastRow(), 3, 1).getValue();
  
  
  
  
  
  //values1 search keyword
  //blog1 blog id 
  
  
  
  
    var sheet = ss.getSheetByName('Sheet1');

  var data = [];
  var nextPageData = sheet.getRange(sheet.getLastRow(), 1, 1,3).getValues();
  if(nextPageData[0][0] !== undefined)
  {
    var res = searchByKeyword_(values1, nextPageData[0][0]);
  }
  else 
  {
    var res = searchByKeyword_(values1);
  }
  
  for(var i in res.items)
  {
    var item = res.items[i];
    getFullDescr_(item.id.videoId);
  }
  if(typeof res.nextPageToken !== 'undefined')
  {
    sheet.getRange(sheet.getLastRow(), 1, 1,3).setValues([[res.nextPageToken, '1', '2']]);
  }
  data = data.concat(res.items);
  Logger.log("We got this after initial call: " + data.length);
  var maximumItems = 1;
  while (typeof res.nextPageToken !== 'undefined' && res.items.length) {
    sheet.getRange(sheet.getLastRow(), 1, 1,3).setValues([[res.nextPageToken, '1', '2']]);  
    if(data.length >= maximumItems)
    {
      Logger.log("Max number reached, bye! " + data.length);
      break;
    }
    res = searchByKeyword_(values1, res.nextPageToken);
    for(var i in res.items)
    {
      var item = res.items[i];
      getFullDescr_(item.id.videoId);
    }
    data = data.concat(res.items);
  }
  for (i = 0; i < data.length; i++) { 
    Logger.log("Our result: " + data[i].snippet.title);
  }
  }

function getFullDescr_(videoId)
{
  var results = YouTube.Videos.list("id,snippet",{'id': videoId }); // here passing that id for a full description //
  for(var i in results.items) {
    var item = results.items[i];
    Logger.log('%s Description: %s',item.snippet.title,  item.snippet.description);
    }
 
     
    
  
    
  var kind ='#blogger#post';
  
var ss1 = SpreadsheetApp.openById('1IANEefOZ95jifwD3M1c93HIRXp0MNgg1Im1TqkKL_nU'); 
  var sheet11 = ss1.getSheetByName('Sheet2');  
var blog1 =sheet11.getRange(sheet11.getLastRow(), 3, 1).getValue();
var BLOG_ID = blog1
    
  //var BLOG_ID = '2106552003059755771'; /** blog ID **/

   
  //    
  var blogId = BLOG_ID
    
    var title = item.snippet.title
  var content = item.snippet.description
  var image = item.snippet.thumbnails
  var images = image.high.url
  
  
  
  
  var videoid= item.id
  Logger.log(videoid)
  
  var video =  "<iframe width=320 height=266 src=https://www.youtube.com/embed/"+videoid+" frameborder=0 allow=accelerometer;autoplay; encrypted-media; gyroscope; picture-in-picture allowfullscreen</iframe>"



  
  
  
  
 var imgbody = "<img  src=\""+images+"\">"+content+""+video+">"
 var body = JSON.stringify({
    'kind': kind,
    'blog': {
      'id': blogId
    },
    'title': title,
   'content': imgbody,
 "images": [
    {
      "url": images
    }
  ],
        
   
   
  
  });
  
  Logger.log(body);
var service = ScriptApp.getService();



var token = ScriptApp.getOAuthToken();

    var api = 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/posts/';
 
    
  var headers = {
  'Authorization': 'Bearer ' + token //ScriptApp.getOAuthToken() //contains Blogger scope always
}; 
    
    
 
    
    var options = {
      'headers': headers,
      'method' : 'post',
      'contentType': 'application/json',
      'payload': body,
      'muteHttpExceptions': false
    };
    
    try {
      var response = UrlFetchApp.fetch(api, options);
      
      var responseCode = response.getResponseCode();
      Logger.log(responseCode);
      var json = JSON.parse(response.getContentText());
      Logger.log(json);
    }
    catch(err) {
      Logger.log(err); // error with url fetch call
    }

    var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
    var authorizationUrl = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
    
 
  } 
function searchByKeyword_(keyword, nextPageToken) {
  var q = { q: keyword, maxResults: '1', type: 'video' };
  if (nextPageToken) q.pageToken = nextPageToken;

  var results = YouTube.Search.list('id,snippet', q);

  return results;

}
  

