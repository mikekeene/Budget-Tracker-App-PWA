let db; 
const request = indexedDB.open("budget_db", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('budget_store', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    if(navigator.onLine) {
        uploadNewBudget();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

function saveRecord(record) {

};

function uploadNewBudget(){

};

window.addEventListener("online", uploadNewBudget);