const url = "https://tilentaps.herokuapp.com/";

const tableBody = document.getElementById("prod-table-body");

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

window.addEventListener("load", () => {
  listProductsOnUI();
});

async function listProductsOnUI() {
  try {
    const response = await axios.get(`${url}api/v1/products`);
    result = response.data.data.doc;
    showProds(result);
  } catch (ex) {
    console.log(ex);
    console.log(ex.response.data.message);
  }
}

createProdBtn.addEventListener("click", async () => {
  if (validateInput()) {
    const inputData = gatInputData();
    // console.log(inputData);
    try {
      let response = await axios.post(`${url}api/v1/products`, inputData);
      if (response.data.status === "success") {
        // console.log(response);
        showAlert("success", "Product created Successfully");
        $("#addProdModal").modal("hide");
        listProductsOnUI();
      }
    } catch (ex) {
      console.log(ex);
      console.log(ex.response.data.message);
      showAlert("error", ex.response.data.message);
    }
  }
});

function showProds(docs) {
  tableBody.innerHTML = "";
  let markup = "";
  docs.forEach((el) => {
    markup += `
        <tr>
            <th scope="row">
                <img src="${url}img/products/${el.imageCover}" width="64" height="54" alt="" />
            </th>
            <td>${el.name}</td>
            <td>${el.type}</td>
            <td>${el.price}</td>
            <td>${el.category}</td>
                                   
            <td><button id="BtnProdDetails"  class="btn btn-secondary" data-id="${el._id}">
            <i class="fas fa-angle-double-right" ></i> Details
          </button></td>
        </tr>
  `;
  });
  tableBody.insertAdjacentHTML("beforeend", markup);
}

tableBody.addEventListener("click", (e) => {
  if (e.target.id === "BtnProdDetails") {
    const prodId = e.target.attributes.getNamedItem("data-id").value;
    localStorage.setItem("prodId", prodId);
    window.location = "productDetails.html";
  }
});

function validateInput() {
  console.log(productType.value);
  if (productTitle.value.length < 1) {
    showAlert("error", "Product Title is a required Field.");
  } else if (productPrice.value.length < 1) {
    showAlert("error", "Product Price is a required Field.");
  } else if (productCompany.value.length < 1) {
    showAlert("error", "Product Company is a required Field.");
  } else if (productType.value.length < 1) {
    showAlert("error", "Please select Appropriate Type for Product.");
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
