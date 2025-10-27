// register page behavior

var box = document.querySelector("div.box")
var signUpButton = document.querySelector(".signup-button")
if (box) {
    var userName = box.firstElementChild
    var userEmail = box.children[1]
    var userPassword = box.children[2]
}

// intalze array to store all users
var allUsers = [];

// restore old data 
if (localStorage.getItem("myUsers")) {
    allUsers = JSON.parse(localStorage.getItem("myUsers"));
}



// add user
function addUser() {

    var user =
    {
        nameOfUser: userName.value,
        emailOfUser: userEmail.value,
        password: userPassword.value
    }

    // search to check if the user try to add the same old registration
    if (registerValidation()) {
        if (search()) {
            // show that mail is exact
            signUpButton.previousElementSibling.classList.replace("d-none", "d-block")
            signUpButton.previousElementSibling.previousElementSibling.classList.replace("d-block", "d-none")
        }
        else {
            // append new user in array
            allUsers.push(user)

            // save local storage
            localStorage.setItem("myUsers", JSON.stringify(allUsers))

            // success message
            signUpButton.previousElementSibling.classList.replace("d-block", "d-none")
            signUpButton.previousElementSibling.previousElementSibling.classList.replace("d-none", "d-block")
        }
    }
    else
        window.alert("All Inputs Is required")
}

if (signUpButton) {
    signUpButton.addEventListener("click", function () {
        addUser()
    })
}

// return to login page
var signinanchor = document.querySelector("a.regis-a")
if (box) {
    signinanchor.addEventListener("click", function () {
        signinanchor.href = "./login.html"
    })
}






// login page behavior
//
//
//
var loginBox = document.querySelector("div.login-box")
if (loginBox) {
    var userEmailLogin = loginBox.querySelector("input[type='email']")
    var userPasswordLogin = loginBox.querySelector("input[type='password']")
    var loginButton = loginBox.querySelector("a.login")
}

//intialize variable to store the name of user
var currentUser;
//intialize variable to store the return value of search function
var state = false;
// search function
function search() {
    // get the last update to search corecctly before adding
    allUsers = JSON.parse(localStorage.getItem("myUsers"));

    for (var i = 0; i < allUsers.length; i++)

    // check the equality of usermail and password to know exist or not
    {
        if (userEmailLogin.value == allUsers[i].emailOfUser && userPasswordLogin.value == allUsers[i].password) {
            // store the session user name
            currentUser = allUsers[i].nameOfUser;
            localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
            state = true;
        }

    }
    return state;

}

if (loginBox) {
    loginButton.addEventListener("click", function () {
        if (loginValidation()) {
            if (search()) {
                loginButton.href = "./index.html"
            }
            else {
                loginButton.previousElementSibling.classList.replace("d-none", "d-block")
                loginButton.previousElementSibling.previousElementSibling.classList.replace("d-block", "d-none")
            }
        }
        else
            window.alert("All inputs Required")
    })
}

var signUpLink = document.querySelector("a.login-a")
if (loginBox) {
    signUpLink.addEventListener("click", function () {
        signUpLink.href = "./register.html"
    })
}


var helloElement = document.querySelector("#hello");

if (helloElement) {
    // ✅ جيب الـ user من localStorage
    var loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        helloElement.textContent = `Welcome ${loggedInUser}`;
    } else {
        // لو مفيش user، ارجع للـ login
        window.location.href = "./login.html";
    }
}

var logoutButton = document.querySelector("a.log")


if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser"); // امسح اليوزر الحالي
        window.location.href = "./login.html"; // ارجعه للوجين
    });
}

function registerValidation() {
    if (userName.value && userEmail.value && userPassword.value) {
        return true;
    }
    else
        return false;

}

function loginValidation() {
    if (userEmailLogin.value && userPasswordLogin.value) {
        return true;
    }
    else
        return false;

}

