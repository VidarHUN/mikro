const url = "/api/jobs" //prod
// const url = "http://127.0.0.1:3000/api/jobs"

function sendJSON(){         
    let result = document.querySelector('.result');

    let user = document.querySelector('#user'); 
    let content = document.querySelector('#content');
    let expiration = document.querySelector('#expiration');
       
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
            result.innerHTML = this.responseText; 

        } 
    };

    // Converting JSON data to string 
    var data = JSON.stringify({ 
        "user": user.value, 
        "content": content.value, 
        "expiration": expiration.value }); 

    // Sending data with the request 
    xhr.send(data); 
}

function getJobs() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        posts = JSON.parse(this.responseText);
        createJobs(posts);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function createJobs(posts){
    var out = "";
    var i;
    var list = document.getElementById("jobs");
    for(i = 0; i < posts.length; i++){
        var item = document.createElement("li");
        item.classList.add("w3-bar");

        var br = document.createElement("br");
        
        var card = document.createElement("div")
        card.classList.add("w3-bar-item");

        let name = document.createElement("span");
        name.classList.add("w3-large");
        name.innerHTML = posts[i].user;

        let job = document.createElement("span");
        job.innerHTML = posts[i].content;

        card.appendChild(name);
        card.appendChild(br);
        card.appendChild(job);

        item.appendChild(card);

        let exp = document.createElement("span");
        exp.classList.add("w3-bar-item");
        exp.classList.add("w3-right");
        exp.classList.add("w3-large");
        exp.innerHTML = posts[i].expiration;

        item.appendChild(exp);
        list.appendChild(item);
    }
}

function getJobsPatch() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        posts = JSON.parse(this.responseText);
        createJobsPatch(posts);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function createJobsPatch(posts){
    var i;
    var list = document.getElementById("jobs");
    for(i = 0; i < posts.length; i++){
        let form = document.createElement("form");
        form.classList.add("w3-container");

        form.innerHTML = `
        <p>
            <label class="w3-text-black"><b>User</b></label>
            <input class="w3-input w3-border" type="text" name="user" id="user${i}" placeholder="${posts[i].user}">
        <p>
            <label class="w3-text-black"><b>Content</b></label>
            <input class="w3-input w3-border" type="text" name="content" id="content${i}" placeholder="${posts[i].content}">
        </p>
        <p>
            <label class="w3-text-black"><b>Expiration</b></label>
            <input class="w3-input w3-border" type="text" name="expiration" id="expiration${i}" placeholder="${posts[i].expiration}">
        </p>

        <p id="id${i}" hidden>${posts[i]._id}</p> 
        
        <button class="w3-btn w3-black" style="margin-bottom: 10px;" onclick="patchJobs(${i})">Update job</button>
        `
        list.appendChild(form);
    }
}

function patchJobs(num) {
    let user = document.querySelector('#user' + num.toString()); 
    let content = document.querySelector('#content' + num.toString());
    let expiration = document.querySelector('#expiration' + num.toString());
    let id = document.querySelector('#id' + num.toString());

    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 

    // open a connection 
    xhr.open("PATCH", url + "/" + id.innerHTML, true); 

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    // Create a state change callback 
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 

            console.log("OK");

        } 
    };

    let data = {
        user: user.value,
        content: content.value,
        expiration: expiration.value
    };

    // Sending data with the request 
    xhr.send(JSON.stringify(data)); 
}

function deleteJobs(num) {
    let id = document.querySelector('#id' + num.toString());
    let xhr = new XMLHttpRequest(); 
    xhr.open("DELETE", url + "/" + id.innerHTML, true); 
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 
            console.log("OK");
        } 
    };
    xhr.send();
}

function getJobsDelete() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        posts = JSON.parse(this.responseText);
        createJobsDelete(posts);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function createJobsDelete(posts){
    var i;
    var list = document.getElementById("jobs");
    for(i = 0; i < posts.length; i++){
        let item = document.createElement("li");
        item.classList.add("w3-bar");

        item.innerHTML = `
        <div class="w3-bar-item">
            <span class="w3-large">${posts[i].user}</span><br>
            <span>${posts[i].content}</span>
        </div>
        <span class="w3-bar-item w3-right w3-large">${posts[i].expiration}</span>
        <p id="id${i}" hidden>${posts[i]._id}</p>
        <button class="w3-btn w3-black w3-bar-item w3-right" style="margin-bottom: 10px;" onclick="deleteJobs(${i})">Delete Job</button>
        `
        list.appendChild(item);
    }
}