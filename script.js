// 1. Global variables

let apiKey = '';
const rootPath = 'https://mysite.itvarsity.org/api/ContactBook/';

// 2. Check if API key exists when the page loads.

function checkApiKey() {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
        apiKey = storedApiKey;
        // Show contacts (Show page)
        showContacts();
        // Get contacts (API call)
        getContacts()
    }
}

// 3. Setup the API Key and Store it.

function setApiKey() {
    const inputApiKey = document.getElementById('apiKeyInput').value.trim();

    if (!inputApiKey) {
        alert ('Please enter an API Key!');
        return;
    }

    // Validate the API Key first.
    // Example: 'https://mysite.itvarsity.org/api/ContactBook/ "+" controller/api-key/?apiKey + "lerato.nkhatho@gmail.com"
    // Drives the whole API key validation

    fetch(rootPath + "controller/api-key/?apiKey=" + inputApiKey)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            if (data == "1") {
                apiKey = inputApiKey;
                localStorage.setItem("apiKey", apiKey);
                showContacts();
                getContacts();
            } else {
                alert("Invalid API Key entered!");
            }
        })
        .catch(function (error){
            alert('Error validating your API key. Please try again.');
        });
}

// 4. Show different pages

function showPage(pageId) {
    // First - Hide all pages.
    const pages = document.querySelectorAll('.page');
    pages.forEach(pages => pageId.classList.remove('active'));

    // Second - Show selected page
    document.getElementById(pageId).classList.add('active');
}

function showContacts() {
    showPage('contactsPage');
}

function showAddContacts() {
    showPage('addContactsPage');
    // Clear the form.
    document.getElementById('addContactForm').reset();
}

function showEditContacts() {
    showPage('editContactPage');

    // Load contact data for editing.
    loadContactForEdit(contactId);
}

