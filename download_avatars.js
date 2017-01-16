var request = require('request');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

var GITHUB_USER = `theoryofchao`;
var GITHUB_TOKEN = `ee332f8ba77bb666bdf4e99ddbdba563146ce545`;

var getRepoContributors = function(repoOwner, repoName, callback) {
  callback();  
};

getRepoContributors(repoOwner, repoName, (err, result) => {
  console.log(repoOwner);
  console.log(repoName);
  console.log(err);
  console.log(result);
});
