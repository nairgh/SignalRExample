//create a connection

var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//connect to method that will receive the count of users from the server

connection.on("UpdateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connection.on("UpdateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});
// invoke hub method to start connection

function newWindowLoadedOnClient() {
    connection.send("NewWindowLoaded");
}

//start connection

function fullfilled() {
    console.log("Connection to UserHub successful");
    newWindowLoadedOnClient();
}
function rejected(err) {
    console.log("Connection failed: " + err);
}
connection.start().then(fullfilled, rejected);
