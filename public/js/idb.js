let db; 
const request = indexedDB.open("budget_db", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("budget_store", { autoIncrement: true });
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
    const trans = db.trans(["budget_store"], "readwrite");
    const bgtObjectStore = trans.objectStore("budget_store");
    bgtObjectStore.add(record);
};

function uploadNewBudget(){
    const trans = db.trans(["budget_store"], "readwrite");
    const bgtObjectStore = trans.objectStore("budget_store");
    const getAll = bgtObjectStore.getAll();
    getAll.onsuccess = function(){
        if(getAll.result.length > 0) {
            fetch("api/transaction", {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(serverResponse => {
                if(serverResponse.message) {
                    throw new Error(serverResponse);
                }
                const trans = db.trans(["budget_store"], 'readwrite');
                const bgtObjectStore = trans.objectStore("budget_store");
                bgtObjectStore.clear();
            })
            .catch(err => console.log(err));
        };
    }; 
};

window.addEventListener("online", uploadNewBudget);