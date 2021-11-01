if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./serviceWorker.js")
        .then(() => console.log("Register successfully"))
        .catch(error => console.log(error))
}