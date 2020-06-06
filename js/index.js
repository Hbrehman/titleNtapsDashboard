const url = "https://tilentaps.herokuapp.com/";

const logoutLink = document.getElementById("logoutLink");

logoutLink.addEventListener("click", async () => {
  try {
    const response = await axios.get(`${url}api/v1/users/logout`);
    if (response.data.status === "success") {
      localStorage.clear();
      window.location = "index.html";
    }
  } catch (ex) {
    console.log(ex);
    console.log(ex.response);
    showAlert(ex.response.data);
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
