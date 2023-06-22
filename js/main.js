const productList = document.querySelector(".product-list");

const API = "http://localhost:8000/toys";

async function getToys() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
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
          <div class="product-btn-loc">
            <button class="btn btn-dark">Edit</button>
            <button class="btn btn-danger delete-btn">Delete</button>
          </div>
        </div>
      `;
  });
}
