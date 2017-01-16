var request = require('request');
var fs = require('fs');

var owner = process.argv[2];
var repo = process.argv[3];

if (typeof owner === "undefined" || typeof repo === "undefined"){
  console.log("Please input valid Owner and Repo in Command!");
  return false;
}

var GITHUB_USER = `theoryofchao`;
var GITHUB_TOKEN = `ee332f8ba77bb666bdf4e99ddbdba563146ce545`;


/**
  * Get Repository Contributors and pass the results to Callback
  * @param {String} repoOwner 
  * @param {String} repoName
  * @return {}
  */
var getRepoContributors = function(repoOwner, repoName, callback) {
  //Generates the Request Url for the Github Repository with the Repository Owner and Repository Name as Parameters
  var requestUrl = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //Adds request header for User-Agent to bypass Github Issue
  var requestHeaders = { 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
    'Content-Type' : 'application/x-www-form-urlencoded' 
  };
  request.get({url: requestUrl, headers: requestHeaders}, callback);
};

/**
  * Callback function that gets of the Avatar Urls and saves them to the avatar directory
  * @param {Number} a 
  * @param {Number} b
  * @return {Number} sum
  */
var getAvatarUrl = function(err,result) {
  var body = JSON.parse(result.body);
  body.forEach( (result) => {
    //Saves Avatars to File
    downloadImageByUrl(result[`avatar_url`], `./avatars/${result.login}`);
  });
};


/**
  * Download Images By Url to Specified Filepath
  * @param {String} url
  * @param {String} url
  * @return {}
  */
var downloadImageByUrl = function(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode, response.headers['content-type']);
    if(response.statusCode == '200') {
      console.log('Downloading image...');
    }
  })
  .pipe(fs.createWriteStream(filePath))
  .on('close', function() {
    console.log('Download Complete');
  });
};

getRepoContributors(owner, repo, getAvatarUrl);
