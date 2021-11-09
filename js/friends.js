let inputField = document.getElementById("friend-add-input");
let autocompleteDiv = document.getElementById("autocomplete-div");
let data;
inputField.onkeyup = function() {getPossibleFriends()};


function getPossibleFriends() {
    let url = window.chatServer + "/" + window.chatCollectionId + "/user";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            data = JSON.parse(xmlhttp.responseText);
            if (inputField.value) {
                let suggestions = [];
                data.forEach(name => {
                    if (name.startsWith(inputField.value)) {
                        suggestions.push(name);
                    }
                });
                showSuggestions(suggestions);
                autocompleteDiv.style.display = "inline-block";
            } else {
                autocompleteDiv.style.display = "none";
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Authorization", "Bearer " + window.authToken);
    xmlhttp.send();
}

function showSuggestions(suggestions) {
    autocompleteDiv.innerText = "";
    let sugggestionList = document.createElement("ul");
    sugggestionList.classList.add("suggestion-list");
    autocompleteDiv.appendChild(sugggestionList);
    suggestions.forEach(item => {
        let listItem = document.createElement("li");
        listItem.classList.add("suggestion-item");
        listItem.innerText = item;
        listItem.setAttribute("onclick", "selectSuggestion(this)");
        sugggestionList.appendChild(listItem);
    })
}

function selectSuggestion(item) {
    inputField.value = item.innerText;
    autocompleteDiv.style.display = "none";
}

function checkForm() {
    if (data.includes(inputField.value)) {
        return true;
    } else {
        alert("Input must be a valid username!")
        return false;
    }
}

