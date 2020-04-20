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
    const response = await axios.get(
      `http://localhost:4000/api/v1/products/${productId}`
    );
    const product = response.data.data.doc;
    updateUI(product);
  } catch (ex) {
    console.log(ex);
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
      `http://localhost:4000/api/v1/products/${productId}`,
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
    let response = await axios.delete(
      `http://localhost:4000/api/v1/products/${productId}`
    );
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
    showAlert("error", "Please select Appropriated Category for Product.");
  } else {
    return true;
  }
}

function gatInputData() {
  const name = productTitle.value;
  const price = productPrice.value;
  const company = productCompany.value;
  const type = productType.value;
  const summary = productSummary.value;
  const description = productDescription.value;
  const category = productCategory.value;
  console.log(category);
  //   if ()

  if (productSize.value.length > 1) {
    const size = productSize.value;
    if (productModel.value.length > 1) {
      const model = productModel.value;
      return {
        name,
        price,
        company,
        type,
        summary,
        description,
        category,
        model,
        size,
      };
    }
    return {
      name,
      price,
      company,
      type,
      summary,
      description,
      category,
      size,
    };
  }
  return {
    name,
    price,
    company,
    type,
    summary,
    description,
    category,
  };
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
