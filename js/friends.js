var inputField = null;
var autocompleteDiv = null;
var data = null;

/**
 * Function to get friends from server
 */
function getPossibleFriends() {
    inputField = document.getElementById("friend-add-input");
    autocompleteDiv = document.getElementById("autocomplete-div");

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

/**
 * Function to show suggestions under input field
 */
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

/**
 * Function so select suggestion and display it in the input field
 */
function selectSuggestion(item) {
    inputField.value = item.innerText;
    autocompleteDiv.style.display = "none";
}

/**
 * Function to check whether supplied input value is in suggestions list
 */
function checkForm() {
    if (data.includes(inputField.value)) {
        return true;
    } else {
        alert("Input must be a valid username!")
        return false;
    }
}

