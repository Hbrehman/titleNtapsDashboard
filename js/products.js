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
    const response = await axios.get("http://127.0.0.1:4000/api/v1/products");
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
      let response = await axios.post(
        `http://127.0.0.1:4000/api/v1/products`,
        inputData
      );
      if (response.data.status === "success") {
        // console.log(response);
        showAlert("success", "Product created Successfully");
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
                <img src="./img/tile1.jpg" width="64" height="64" alt="" />
            </th>
            <td>${el.name}</td>
            <td>${el.type}</td>
            <td>${el.price}</td>
            <td>${el.category}</td>
                                      <!-- anchor in line below should be changed to button -->
            <td><a href="productDetails.html" class="btn btn-secondary" data-id="${el._id}">
            <i class="fas fa-angle-double-right" ></i> Details
          </a></td>
        </tr>
  `;
  });
  tableBody.insertAdjacentHTML("beforeend", markup);
}

tableBody.addEventListener("click", (e) => {
  const prodId = e.target.attributes.getNamedItem("data-id").value;
  localStorage.setItem("prodId", prodId);
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
