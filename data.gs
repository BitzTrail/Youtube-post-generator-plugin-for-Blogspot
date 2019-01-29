function doGet() {
  return HtmlService.createHtmlOutputFromFile('datas')
  
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function processForm(myForm) {
  var search = myForm.search
  var blogId = myForm.blogId
  var ss = SpreadsheetApp.openById('1-xh3wze1DhiJ3FaFJd8FAw8wN3jTYCXBHfqG2kv-pkA'); 
  var sheet = ss.getSheetByName('Sheet1');
  
  sheet.getRange(sheet.getLastRow()+1, 1, 1,3).setValues([[Date(),search, blogId]]);  

 
  var ss1 = SpreadsheetApp.openById('1-xh3wze1DhiJ3FaFJd8FAw8wN3jTYCXBHfqG2kv-pkA'); 
  var sheet1 = ss1.getSheetByName('Sheet1');
  var values1 = sheet1.getRange(sheet.getLastRow(), 2,1).getValue();
  var blog1 =sheet1.getRange(sheet.getLastRow(), 3, 1).getValue();
    Logger.log(values1)
 Logger.log(blog1)
 



  
  var results = YouTube.Search.list("id,snippet", {q :values1 , maxResults: "1",type: "video"});
   // Logger.log(' search results: %s', results.items);
  
 for(var i in results.items) {
   var item = results.items[i];
   Logger.log("[%s] Title: %s", item.id.videoId, item.snippet.title);
 }
  var item = results.items[i];
 
 var results = YouTube.Videos.list("id,snippet",{'id': item.id.videoId });
 for(var i in results.items) {
    var item = results.items[i];
   Logger.log('%s Description: %s', item.snippet.title, item.snippet.description);

 }
  var kind ='#blogger#post';
 var BLOG_ID = blog1
    
  /** blog ID **/

   
  //  var blogId = BLOG_ID
    
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
  
  
