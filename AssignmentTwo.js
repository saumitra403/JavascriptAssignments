function getData(uId) {
    return new Promise(function(resolve){
        setTimeout(() => {
            console.log("Fetched the data!");
            return resolve(uId+"@gmail.com");
        }, 4000);
    });
}
console.log("start");
getData("skc").then(function(email){
    console.log("Email id of the user id is: " + email);
    return new Promise(function(resolve){
        resolve();
    });
}).then(() => console.log("end"));
