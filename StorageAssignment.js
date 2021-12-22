var localStorageDisplay = document.getElementById('ls');
var sessionStorageDisplay = document.getElementById('ss');
if(localStorage.getItem('Local')===null) {
    localStorage.setItem('Local',0);
    localStorageDisplay.textContent = '0';
}
else {
    localStorageDisplay.textContent = localStorage.getItem('Local');
}
if(sessionStorage.getItem('Session')===null) {
    sessionStorage.setItem('Session',0);
    sessionStorageDisplay.textContent = '0';
}
else {
    sessionStorageDisplay.textContent = sessionStorage.getItem('Session');
}

//variables
var localStorageButton = document.getElementById('localStorageButton');
var sessionStorageButton = document.getElementById('sessionStorageButton');



localStorageButton.addEventListener('click', () => {
    let currentStoredValue = parseInt(localStorage.getItem('Local'));
    currentStoredValue++;
    localStorage.setItem('Local',currentStoredValue);
    localStorageDisplay.textContent = currentStoredValue;
});

sessionStorageButton.addEventListener('click', () => {
    let currentStoredValue = parseInt(sessionStorage.getItem('Session'));
    currentStoredValue++;
    sessionStorage.setItem('Session',currentStoredValue);
    sessionStorageDisplay.textContent = currentStoredValue;
})

document.getElementById('deleteLS').addEventListener('click',() => {
    localStorage.setItem('Local',0);
    localStorageDisplay.textContent = '0';
});

document.getElementById('deleteSS').addEventListener('click',() => {
    sessionStorage.setItem('Session',0);
    sessionStorageDisplay.textContent = '0';
});