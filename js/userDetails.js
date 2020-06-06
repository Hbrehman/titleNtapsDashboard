const url = "https://tilentaps.herokuapp.com/";
// const url = "http://127.0.0.1:4000/";

const userId = localStorage.getItem("userId");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userRole = document.getElementById("userRole");
const userPassword = document.getElementById("userPassword");
const userPasswordCnfrm = document.getElementById("userPasswordCnfrm");
const userHeadingName = document.getElementById("userHeadingName");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
window.addEventListener("load", async () => {
  const userData = await getUserFromServer();
  //   console.log(userData);
  populateUIForm(userData);
});

async function getUserFromServer() {
  try {
    const response = await axios.get(`${url}api/v1/users/${userId}`);
    return response.data.data;
  } catch (ex) {
    console.log(ex.response.data.message);
    showAlert("error", ex.response.data.message);
  }
}

function populateUIForm(data) {
  userName.value = data.name;
  userEmail.value = data.email;

  // update Users name in top heading
  userHeadingName.textContent = data.name;
}

// Get updated Input
updateBtn.addEventListener("click", async () => {
  if (validateInput()) {
    const inputData = getInputData();
    try {
      const response = await axios.put(
        `${url}api/v1/users/updateUser/${userId}`,
        inputData
      );
      console.log(response.data.status);
      if (response.data.status === "success") {
        window.location = "users.html";
      }
    } catch (ex) {
      console.log(ex);
      console.log(ex.response);
      showAlert("error", ex.response.message);
    }
  }
});

function validateInput() {
  if (userName.value.length < 1) {
    showAlert("error", "User Name is a required Field.");
  } else if (userEmail.value.length < 1) {
    showAlert("error", "User Email is a required Field.");
  } else if (userPassword.value.length < 1) {
    showAlert("error", "User Password is a required Field.");
  } else if (userPasswordCnfrm.value.length < 1) {
    showAlert("error", "Password confirm is a required Field.");
  } else if (userPasswordCnfrm.value !== userPassword.value) {
    showAlert("error", "Password & Password confirm should be same");
  } else {
    return true;
  }
}

function getInputData() {
  const form = new FormData();
  form.append("photo", document.querySelector("#user-avatar").files[0]);
  form.append("name", userName.value);
  form.append("email", userEmail.value);
  form.append("password", userPassword.value);
  form.append("passwordConfirm", userPasswordCnfrm.value);
  form.append("role", userRole.value);
  return form;
}

// Delete User
deleteBtn.addEventListener("click", async () => {
  try {
    const response = await axios.patch(
      `${url}api/v1/users/DeleteUser/${userId}`
    );
    if (response.data.status === "success") {
      window.location = "users.html";
    }
  } catch (ex) {
    console.log(ex.response);
    showAlert("error", ex.response.message);
  }
});

const hideAlert = () => {
  $(".alert").alert("close");
};
const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};
