const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userRole = document.getElementById("userRole");
const userPassword = document.getElementById("userPassword");
const userPasswordCnfrm = document.getElementById("userPasswordCnfrm");

const btnCreateUser = document.getElementById("createUserBtn");
const usersTable = document.getElementById("userTableBody");
window.addEventListener("load", () => {
  updateUsersList();
});

async function updateUsersList() {
  const users = await getDocsFromServer();
  renderUsers(users.data.data);
}

btnCreateUser.addEventListener("click", async () => {
  const inputData = getInputData();
  if (validateInput(inputData)) {
    console.log(inputData);
    try {
      let response = await axios.post(
        `http://localhost:4000/api/v1/users`,
        inputData
      );
      console.log(response);
      if (response.data.status === "success") {
        showAlert("success", "User created Successfully");
        $("#addUserModal").modal("hide");
        updateUsersList();
      }
    } catch (ex) {
      console.log(ex);
      console.log(ex.response.data.message);
      showAlert("error", ex.response.data.message);
    }
  }
});

async function getDocsFromServer() {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/users");
    return response;
  } catch (ex) {
    console.log(ex);
  }
}

function renderUsers(docs) {
  usersTable.innerHTML = "";
  let markup = "";
  docs.forEach((el) => {
    markup += `<tr>
    <th scope="row">
        <img src="./img/avatar.png" width="64" height="64" alt="" />
    </th>
    <td>${el.name}</td>
    <td>${el.email}</td>
    <td><button id="BtnUserDetails" class="btn btn-secondary" data-id="${el._id}">
    <i class="fas fa-angle-double-right" ></i> Details
  </button></td>
  </tr>`;
  });
  usersTable.insertAdjacentHTML("beforeend", markup);
}

usersTable.addEventListener("click", (e) => {
  if (e.target.id === "BtnUserDetails") {
    const userId = e.target.attributes.getNamedItem("data-id").value;
    localStorage.setItem("userId", userId);
    window.location = "userDetails.html";
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
  const name = userName.value;
  const email = userEmail.value;
  const password = userPassword.value;
  const passwordConfirm = userPasswordCnfrm.value;
  const role = userRole.value;
  return { name, email, password, passwordConfirm, role };
}
