const productList = document.querySelector(".product-list");
const titleInp = document.querySelector("#title");
const priceInp = document.querySelector("#price");
const imageInp = document.querySelector("#image");
const selectInp = document.querySelector("#select");
const addForm = document.querySelector("#add-form");
const descInp = document.querySelector("#description");

const descContainer = document.querySelector("#description-desc");

//? edit modal
const editForm = document.querySelector("#edit-form");
const editTitleInp = document.querySelector("#edit-title");
const editPriceInp = document.querySelector("#edit-price");
const editImageInp = document.querySelector("#edit-image");
const editSelectInp = document.querySelector("#edit-select");

//? description modal
const descImg = document.querySelector("#description-image");
const desctitle = document.querySelector("#description-title");
const descprice = document.querySelector("#description-price");
const descDesc = document.querySelector("#description-desc");

const descModal = document.querySelector(".card-block");

// ? search
const searchInp = document.querySelector("#search");
let searchVal = "";

//? Pagination

const pagList = document.querySelector(".pagination-list");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const limit = 8;
let currentPage = 1;
let pageTotalCount = 1;

// ?toggle-switch
const toggleSwitches = document.querySelectorAll(".toggle-switch");

// ? filter
const radios = document.querySelectorAll("input[type='radio']");
let category = "";

// ? register
const logInBTN = document.querySelector(".flip-card__btn1");
const RegBTN = document.querySelector(".flip-card__btn2");
const boss = document.querySelector(".boss");
const loginModal = document.querySelector("#edit-modal1");
const emailLoginInp = document.querySelector("#email-login");
const passLoginInp = document.querySelector("#pass-login");
const nameRegInp = document.querySelector("#register-name");
const emailRegInp = document.querySelector("#register-email");
const passRegInp = document.querySelector("#register-pass");

const API = "http://localhost:8000/toys";
const APIcustomer = "http://localhost:8000/customer";

// !
async function getToys() {
  const res = await fetch(
    `${API}?_limit=${limit}&_page=${currentPage}&q=${searchVal}&category_like=${category}`
  );
  const data = await res.json();
  const count = res.headers.get("x-total-count");
  pageTotalCount = Math.ceil(count / limit);
  return data;
}

// !get for customer

async function getCustomer() {
  const res = await fetch(APIcustomer);
  const data = await res.json();
  return data;
}
// ! post for customer
async function addCustomer(newData) {
  await fetch(APIcustomer, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// !CREATE
async function addToys(newData) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//! EDIT

async function editProduct(newData, id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  render();
}

async function getOneToy(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  return data;
}

//! DELETE

async function deleteProduct(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}

render();

// ! READ
async function render() {
  const data = await getToys();

  productList.innerHTML = "";
  data.forEach((item) => {
    productList.innerHTML += `

        <div class="card-block">
            <div class="icon">
              <img
                src="${item.image}"
                alt=""
              />
            </div>
            <div class="product-title title-name">${item.title}</div>
            <div class="product-price item-end">${item.price}</div>
            <div class="product-price item-end">${item.category}</div>
            <div class="product-btn-loc">
              <button id="${item.id}" class="boss btn btn-dark edit-btn " data-bs-toggle="modal"
              data-bs-target="#exampleModal">Edit</button>
              <button class="btn btn-dark desc-btn" data-bs-toggle="modal" id="${item.id}"
               data-bs-target="#exampleModal1" id="${item.id}">description</button>
              <button id="${item.id}" class="basket-btn delete-btn">
            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" 
            id="${item.id}"
            class="icon delete-btn">
            <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
            </svg>
            </button>
            </div>
          </div>
        `;
  });
  renderPagination();
}
// ! CREATE

//? AddForm
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !titleInp.value.trim() ||
    !priceInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("fill all");
    return;
  }

  const newToy = {
    title: titleInp.value,
    price: priceInp.value,
    image: imageInp.value,
    category: selectInp.value,
    description: descInp.value,
  };

  titleInp.value = "";
  priceInp.value = "";
  imageInp.value = "";
  addToys(newToy);
  render();
});
//? AddForm ends

// ! DELETE

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteProduct(e.target.id);
  }
});

//? Edit form starts

let id = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    id = e.target.id;
    const toy = await getOneToy(id);

    editTitleInp.value = toy.title;
    editPriceInp.value = toy.price;
    editImageInp.value = toy.image;
    editSelectInp.value = toy.category;
  }
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !editTitleInp.value.trim() ||
    !editPriceInp.value.trim() ||
    !editImageInp.value.trim()
  ) {
    alert("fill all");
    return;
  }

  const toysList = {
    title: editTitleInp.value,
    price: editPriceInp.value,
    image: editImageInp.value,
    category: editSelectInp.value,
  };

  editProduct(toysList, id);
});
//? Edit form ends

//? Pagination
function renderPagination() {
  pagList.innerHTML = "";
  for (let i = 1; i <= pageTotalCount; i++) {
    pagList.innerHTML += `
		<li class="page-item ${
      i === currentPage ? "active" : ""
    }"><button class="page-link page-number">${i}</button></li>
		`;
  }

  if (currentPage <= 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }

  if (currentPage >= pageTotalCount) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}

next.addEventListener("click", () => {
  if (currentPage >= pageTotalCount) {
    return;
  }
  currentPage++;
  render();
});

prev.addEventListener("click", () => {
  if (currentPage <= 1) {
    return;
  }
  currentPage--;
  render();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-number")) {
    currentPage = +e.target.innerText;
    render();
  }
});
//? Pagination end

//? search

searchInp.addEventListener("input", (e) => {
  searchVal = searchInp.value;
  currentPage = 1;
  render();
});

// ? toggle switch

toggleSwitches.forEach((item) => {
  let count = 0;
  item.addEventListener("click", (e) => {
    if (count % 2 === 0) {
      document.body.classList.remove("body1");
      count++;
    } else {
      document.body.classList.add("body1");
      count++;
    }
  });
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("desc-btn")) {
    id = e.target.id;

    const toy = await getOneToy(id);
    console.log(toy);

    descContainer.innerText = `
    ${toy.description}
    `;
  }
});

// ? фильтрация
radios.forEach((item) => {
  item.addEventListener("change", (e) => {
    category = e.target.id;
    render();
  });
});

// ? register
logInBTN.addEventListener("click", async (e) => {
  customer = await getCustomer();

  customer.forEach((item) => {
    if (item.login == emailLoginInp.value && item.pass == passLoginInp.value) {
      loginModal.style.visibility = "hidden";
      if (item.type == "admin") {
        boss.style.display = "block";
        document.querySelectorAll(".edit-btn").forEach((item) => {
          item.style.visibility = "visible";
        });
        document.querySelectorAll(".delete-btn").forEach((item) => {
          item.style.visibility = "visible";
        });
      }
    } else {
      // alert("WRONG LOGIN OR PASSWORD");
    }
  });
});

RegBTN.addEventListener("click", (e) => {
  if (
    !nameRegInp.value.trim() ||
    !emailRegInp.value.trim() ||
    !passRegInp.value.trim()
  ) {
    return;
  }
  const user = {
    login: emailRegInp.value,
    pass: passRegInp.value,
    name: nameRegInp.value,
    type: "user",
  };
  addCustomer(user);
  loginModal.style.visibility = "hidden";
});

// ? modal description
