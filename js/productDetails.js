const url = "https://tilentaps.herokuapp.com/";

const dataForm = document.getElementById("prodDataForm");
const prodHeadingName = document.getElementById("prodHeadingName");
const productId = localStorage.getItem("prodId");

const updateChangesBtn = document.getElementById("updateBtn");
const deleteProdBtn = document.getElementById("deleteBtn");
const productTitle = document.getElementById("prodTitle");
const productPrice = document.getElementById("prodPrice");
const productType = document.getElementById("prodType");
const productCompany = document.getElementById("prodCompany");
const productSize = document.getElementById("prodSize");
const productModel = document.getElementById("prodModel");
const productCategory = document.getElementById("prodCategory");
const productSummary = document.getElementById("prodSummary");
const productDescription = document.getElementById("prodDescription");
const productCoverImage = document.getElementById("coverImage");

// localStorage.setItem("prodId", "");

window.addEventListener("load", async () => {
  try {
    const response = await axios.get(`${url}api/v1/products/${productId}`);
    const product = response.data.data.doc;
    updateUI(product);
  } catch (ex) {
    console.log(ex);
    showAlert("error", ex.response.data.message);
  }
});

function updateUI(doc) {
  prodHeadingName.textContent = doc.name;
  productTitle.value = doc.name;
  productPrice.value = doc.price;
  productCompany.value = doc.company;
  productType.value = doc.type;
  productSize.value = doc.size || "";

  productSummary.value = doc.summary;
  productDescription.value = doc.description;
}

updateChangesBtn.addEventListener("click", async () => {
  if (validateInput()) {
    const inputData = gatInputData();
    const response = await patchToServer(inputData);
    console.log(response);
    if (response.data.status === "success") {
      showAlert("success", "Data Updated Successfully");
      window.location = "products.html";
    }
  }
});

async function patchToServer(inputData) {
  try {
    let response = await axios.patch(
      `${url}api/v1/products/${productId}`,
      inputData
    );
    return response;
  } catch (ex) {
    showAlert("error", ex.response.data.message);
    console.log(ex.response.data);
  }
}

deleteProdBtn.addEventListener("click", async () => {
  try {
    let response = await axios.delete(`${url}api/v1/products/${productId}`);
    if (response.status === 204) {
      showAlert("error", "Product delted Successfully");
      window.location = "products.html";
    }
  } catch (ex) {
    showAlert("error", ex.response.data.message);
    console.log(ex.response.data);
  }
});

function validateInput() {
  if (productTitle.value.length < 1) {
    showAlert("error", "Product Title is a required Field.");
  } else if (productPrice.value.length < 1) {
    showAlert("error", "Product Price is a required Field.");
  } else if (productCompany.value.length < 1) {
    showAlert("error", "Product Company is a required Field.");
  } else if (productType.value.length < 1) {
    showAlert("error", "Product Type is a required Field.");
  } else if (productSummary.value.length < 1) {
    showAlert("error", "Product Summary is a required Field.");
  } else if (productDescription.value.length < 1) {
    showAlert("error", "Product Description is a required Field.");
  } else if (productCategory.value.length < 1) {
    showAlert("error", "Please select Appropriate Category for Product.");
  } else if (!document.querySelector("#coverImage").files[0]) {
    showAlert("error", "Please Upload a Cover image for this Product.");
  } else if (document.querySelector("#prodImages").files.length < 3) {
    showAlert("error", "Please Upload at least three image of Product.");
  } else {
    return true;
  }
}

function gatInputData() {
  const form = new FormData();
  form.append("name", productTitle.value);
  form.append("price", productPrice.value);
  form.append("company", productCompany.value);
  form.append("type", productType.value);
  form.append("summary", productSummary.value);
  form.append("description", productDescription.value);
  form.append("category", productCategory.value);
  form.append("imageCover", document.querySelector("#coverImage").files[0]);
  form.append("images", document.querySelector("#prodImages").files[0]);
  form.append("images", document.querySelector("#prodImages").files[1]);
  form.append("images", document.querySelector("#prodImages").files[2]);

  if (productSize.value.length > 1) {
    form.append("size", productSize.value);
  }
  if (productModel.value.length > 1) {
    form.append("model", productModel.value);
  }
  return form;
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
