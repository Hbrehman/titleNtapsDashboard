const usersTable = document.getElementById("userTableBody");
window.addEventListener("load", () => {
  listUsersOnUI();
});

async function listUsersOnUI() {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/users");
    console.log(response);
  } catch (ex) {
    console.log(ex);
  }

  usersTable.innerHTML = "";
  const markup = `<tr>
  <td>1</td>
  <td>John Doe</td>
  <td>jdoe@gmail.com</td>
  <td>
    <a href="details.html" class="btn btn-secondary">
      <i class="fas fa-angle-double-right"></i> Details
    </a>
  </td>
</tr>`;
}
