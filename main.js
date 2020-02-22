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

    var errorMessage = document.createTextNode('Nonexistent user!');
    errorElement.appendChild(errorMessage);
    
    errorElement.style.color = "#ff0000";

    listElement.appendChild(errorElement);
}

function seachGithubUser() {
    var nickname = inputElement.value;

    axios.get('https://api.github.com/users/' + nickname + '/repos')
        .then(function (response) {
            addRespositoriesToScreen(response.data);
        })
        .catch(function (error) {
            showErrorMessage();
            // console.warn(error);
        });
}

buttonElement.onclick = seachGithubUser;
