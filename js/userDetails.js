const userId = localStorage.getItem("userId");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userRole = document.getElementById("userRole");
const userPassword = document.getElementById("userPassword");
const userPasswordCnfrm = document.getElementById("userPasswordCnfrm");

window.addEventListener("load", async () => {
  const userData = await getUserFromServer();
  //   console.log(userData);
  populateUIForm(userData);
});

async function getUserFromServer() {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/users/${userId}`
    );
    return response.data.data;
  } catch (ex) {
    console.log(ex.response.data.message);
    showAlert("error", ex.response.data.message);
  }
}

function populateUIForm(data) {
  userName.value = data.name;
  userEmail.value = data.email;
  userPassword.value = data.passowrd;
  userPasswordCnfrm.value = data.passowrdConfirm;
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
