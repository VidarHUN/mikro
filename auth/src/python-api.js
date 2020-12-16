const url = "/api/users"

function checkUser() {
    let username = document.querySelector('#username'); 
    let password = document.querySelector('#password');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        user = JSON.parse(this.responseText);

        if (user.password == password.value) {
            console.log("Access granted!");
        } else {
            console.log("Access denied!");
        }
      }
    };
    xhttp.open("GET", url + "?username=" + username.value, true);
    xhttp.send();
}

function addUser(){
    let username = document.querySelector('#username'); 
    let password = document.querySelector('#password');
    let confirmPassword = document.querySelector('#confirmPassword');

    if (password.value != confirmPassword.value) {
        console.log("Two password not match!");
        return;
    }
       
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 

    // open a connection 
    xhr.open("POST", url, true); 

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    // Create a state change callback 
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 

            // Print received data from server 
            console.log("User added!");
        } 
    };

    // Converting JSON data to string 
    var data = JSON.stringify({ 
        "username": username.value, 
        "password": password.value }); 

    // Sending data with the request 
    xhr.send(data); 
}