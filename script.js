var searchButton = $(".btn");
var searchCity = $(".first");
var showApi = $(".second");

searchButton.on("click", listCity);

function listCity() {
    var test = searchButton.val();
    console.log(test);
}




var getUserRepos = function (user) {
var apiUrl = 'https://api.github.com/users/' + user + '/repos';

fetch(apiUrl)
    .then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
        displayRepos(data, user);
        });
    } else {
        alert('Error: ' + response.statusText);
    }
    })
    .catch(function (error) {
    alert('Unable to connect to GitHub');
    });
};