const productList = document.querySelector(".product-list");
const titleInp = document.querySelector("#title");
const priceInp = document.querySelector("#price");
const imageInp = document.querySelector("#image");
const selectInp = document.querySelector("#select");
const addForm = document.querySelector("#add-form");

const API = "http://localhost:8000/toys";

async function getToys() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}


async function addToys(newData) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },

//! DELETE

async function deleteProduct(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",

  });
  render();
}

render();

async function render() {
  const data = await getToys();

  productList.innerHTML = "";
  data.forEach((item) => {
    productList.innerHTML += `

        <div class="card" style="--rating: 90">
            <div class="icon">
              <img
                src="${item.image}"
                alt=""
              />
            </div>
            <div class="product-title">${item.title}</div>
            <div class="product-price">${item.price}</div>
            <div class="product-price">${item.category}</div>
            <div class="product-btn-loc">
              <button class="btn btn-dark edit-btn">Edit</button>
              <button id="${item.id}" class="btn btn-danger delete-btn">Delete</button>
            </div>

          </div>
        `;
  });
}


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
    select: selectInp.value,
  };
  addToys(newToy);

  titleInp.value = "";
  priceInp.value = "";
  imageInp.value = "";
});



document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteProduct(e.target.id);
  }
});

