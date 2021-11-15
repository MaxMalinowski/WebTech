var inputField = null;
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
            data = JSON.parse(xmlhttp.responseText)
            extractFriends(inputField.value) 
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Authorization", "Bearer " + window.authToken);
    xmlhttp.send();
}

/**
 * Function to extract possible users into a list
 */
function extractFriends(input) {
    if (input) {
        let suggestions = [];
        data.forEach(name => {
            if (name.startsWith(input)) {
                suggestions.push(name);
            }
        });
        showSuggestions(suggestions);
        setAutocompleteDiv("inline-block");
    } else {
        setAutocompleteDiv("none");
    }
}

/**
 * Function to show suggestions under input field
 */
function showSuggestions(suggestions) {
    let sugggestionList = document.createElement("ul");
    sugggestionList.classList.add("suggestion-list");
    
    autocompleteDiv.innerText = "";
    autocompleteDiv.appendChild(sugggestionList);
    
    suggestions.forEach(item => {sugggestionList.appendChild(createAutocompleteListItem(item))})
}

/**
 * Function to create suggestion list elements
 */
function createAutocompleteListItem(suggestion) {
    let listItem = document.createElement("li");
    listItem.classList.add("suggestion-item");
    listItem.innerText = suggestion;
    listItem.setAttribute("onclick", "selectSuggestion(this)");
    return listItem
}

/**
 * Function so select suggestion and display it in the input field
 */
function selectSuggestion(item) {
    inputField.value = item.innerText;
    setAutocompleteDiv("none");
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

/**
 * Function so set the autosuggestion visability 
 */
function setAutocompleteDiv(display) {
    autocompleteDiv.style.display = display
}