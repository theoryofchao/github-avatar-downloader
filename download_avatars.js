var request = require('request');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

var GITHUB_USER = `theoryofchao`;
var GITHUB_TOKEN = `ee332f8ba77bb666bdf4e99ddbdba563146ce545`;



var getRepoContributors = function(repoOwner, repoName, callback) {
  var requestUrl = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestHeaders = { 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
    'Content-Type' : 'application/x-www-form-urlencoded' 
  };
  console.log(requestUrl);
  request.get({url: requestUrl, headers: requestHeaders}, callback);
};


getRepoContributors(repoOwner, repoName, (err, result) => {
  console.log("Results:",result);  
});
