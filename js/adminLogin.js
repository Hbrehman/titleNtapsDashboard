const loginBtn = document.getElementById("BtnLogIn");
const adminEmail = document.getElementById("adminEmail");
const adminPassword = document.getElementById("adminPassword");

loginBtn.addEventListener("click", () => {
  const userData = getLoginInputData();
  if (validateLoginInput()) {
    loginUser(userData);
  }
});

// Get users input for registration
function getLoginInputData() {
  const email = adminEmail.value;
  const password = adminPassword.value;
  return { email, password };
}

// Validation of login input

function validateLoginInput() {
  if (adminEmail.value.length < 1) {
    showAlert("error", "Please provide valid Email");
  } else if (adminPassword.value.length < 1) {
    showAlert("error", "Please provide valid Password");
  } else {
    return true;
  }
}
// Loggin in users
async function loginUser(userData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:4000/api/v1/users/adminLogin",
      userData
    );
    if (response.status === 200) {
      //   showAlert("success", "You are successfully logged In.");
      window.location = "index.html";
    }
  } catch (ex) {
    console.log(ex);
    console.log(ex.response.data);
    showAlert("error", ex.response.data.message);
  }
}

const hideAlert = () => {
  $(".alert").alert("close");
};
const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};
