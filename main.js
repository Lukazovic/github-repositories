var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button')

function addRespositoriesToScreen(listRepositories) {
    listElement.innerHTML = '';

    for (repository of listRepositories) {
        var repositoryElement = document.createElement('li');
        var repositoryText = document.createTextNode(repository.name);

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', repository.html_url);

        linkElement.appendChild(repositoryText);

        repositoryElement.appendChild(linkElement);

        listElement.appendChild(repositoryElement);
    }
}

function showErrorMessage () {
    listElement.innerHTML = '';

    var errorElement = document.createElement('p');

    var errorMessage = document.createTextNode('Unexistent user!');
    errorElement.appendChild(errorMessage);
    
    errorElement.style.color = "#ff0000";

    listElement.appendChild(errorElement);
}

function showSearchingMessage () {
    listElement.innerHTML = '';

    var searchingElement = document.createElement('p');

    var searchingMessage = document.createTextNode('Searching user...');
    searchingElement.appendChild(searchingMessage);

    listElement.appendChild(searchingElement);
}

function seachGithubUser() {
    showSearchingMessage();

    var nickname = inputElement.value;

    axios.get('https://api.github.com/users/' + nickname + '/repos', {function() {
    }})
        .then(function (response) {
            addRespositoriesToScreen(response.data);
        })
        .catch(function (error) {
            showErrorMessage();
        });
}

buttonElement.onclick = seachGithubUser;
