fetch("src/js/data.json")
  .then((response) => response.json())
  .then((data) => {
    let html = " ";
    data.products.forEach((item) => {
      let oldPriceHTML = "";
      let optionSecondHTML = "";

      if (item.oldPrice !== undefined) {
        oldPriceHTML = `<del>${item.oldPrice}<span>USD</span></del>`;
      }

      if (item.options.second !== undefined) {
        optionSecondHTML = `<option value="">${item.options.second}</option>`;
      }
      html += `
        <swiper-slide>
          <div class="product">
            <div class="product-title">
              <h4>
                <a href="">${item.title}</a>
              </h4>
            </div>
            <p class="type">TYPE: ${item.type}</p>
            <div class="product-img">
              <img src="${item.img}" alt="" />
            </div>
            <p class="size">${item.label}:</p>
            <div class="options">
              <select name="" id="">
                <option value="">${item.options.first}</option>
                ${item.options.second ? `<option value="">${item.options.second}</option>` : ''}
              </select>
              <img src="./src/image/dropdown.png" alt="" />
            </div>
            <div class="price">
              <p>
                ${item.price}<span>USD</span>
                ${item.oldPrice ? `<del>${item.oldPrice}<span>USD</span></del>` : ''}
              </p>
              ${item.available ? `<a href="#" class="btn-primary">Add to cart</a>` : `<button class="btn-primary" style="cursor: not-allowed;" disabled>Sold Out</button>`}
            </div>
          </div>
        </swiper-slide>
      `;
    });
    document.querySelector(".mySwiper").innerHTML = html;

    const addButtons = document.querySelectorAll(".btn-primary");
    let cart = [];
    let cartCount = 0;

    addButtons.forEach((btn, id) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        if (data.products[id].available) {
          
          cart.push(data.products[id]);
          cartCount++;
          document.querySelector(".count-1").textContent = cartCount;

          
          updateCartDisplay();
        }
      });
    });

  })

let langBtn = document.getElementById("languageBtn");

langBtn.addEventListener("click", function() {
    let langToggle = document.getElementById("langToggle");
    if (langToggle.style.display === "none" || langToggle.style.display === '') {
        langToggle.style.display = "block"
    } else {
        langToggle.style.display = "none"
    }
});


fetch("src/js/data.json")
  .then((response) => response.json())
  .then((data) => {
    const gamingButton = document.querySelector("#gamingButton");
    const speakersButton = document.querySelector("#speakersButton");
    const powerButton = document.querySelector("#powerButton");
    const productsContainer = document.querySelector(".products");

    gamingButton.addEventListener("click", () => {
      filterAndRenderProducts(data.products, "gaming");
    });

    speakersButton.addEventListener("click", () => {
      filterAndRenderProducts(data.products, "spikers");
    });

    powerButton.addEventListener("click", () => {
      filterAndRenderProducts(data.products, "power");
    });

    function filterAndRenderProducts(products, category) {
      const filteredProducts = products.filter((product) => product.category === category);
      const filteredHTML = generateProductHTML(filteredProducts);
      productsContainer.innerHTML = filteredHTML;
    }

    function generateProductHTML(products) {
      let html = "";
      products.forEach((item) => {
            html += `
          <div class="product">
            <h4>
              <a href="">${item.title}</a>
            </h4>
            <p class="type">TYPE: ${item.type}</p>
            <div class="productImg">
              <img src="${item.img}" class="product-img" />
            </div>
            <p class="size">${item.label}</p>
            <div class="options">
              <select name="" id="">
                <option value="">${item.options.first}</option>
                ${item.options.second ? `<option value="">${item.options.second}</option>` : ""}
              </select>
              <img src="./src/image/dropdown.png" alt="" />
            </div>
            <div class="price">
              <p>
                ${item.price}<span>USD</span>
                ${item.oldPrice ? `<del>${item.oldPrice}<span>USD</span></del>` : ""}
              </p>
              <a href="" class="btn-transparent"> Add to cart </a>
            </div>
          </div>
    `;
      });

      return html;
    }
    filterAndRenderProducts(data.products, "gaming");
  })
  .catch((error) => {
    console.error(error);
  });







  fetch("src/js/db.json")
  .then((response) => response.json())
  .then((data) => {
    let html = " ";
    data.products.forEach((item) => {
      let oldPriceHTML = "";
      let optionSecondHTML = "";

      if (item.oldPrice !== undefined) {
        oldPriceHTML = `<del>${item.oldPrice}<span>USD</span></del>`;
      }

      if (item.options.second !== undefined) {
        optionSecondHTML = `<option value="">${item.options.second}</option>`;
      }
      html += `
        <swiper-slide>
          <div class="product">
            <div class="product-title">
              <h4>
                <a href="">${item.title}</a>
              </h4>
            </div>
            <p class="type">TYPE: ${item.type}</p>
            <div class="product-img">
              <img src="${item.img}" alt="" />
            </div>
            <p class="size">${item.label}:</p>
            <div class="options">
              <select name="" id="">
                <option value="">${item.options.first}</option>
                ${item.options.second ? `<option value="">${item.options.second}</option>` : ''}
              </select>
              <img src="./src/image/dropdown.png" alt="" />
            </div>
            <div class="price">
              <p>
                ${item.price}<span>USD</span>
                ${item.oldPrice ? `<del>${item.oldPrice}<span>USD</span></del>` : ''}
              </p>
              ${item.available ? `<a href="#" class="btn-primary">Add to cart</a>` : `<button class="btn-primary" style="cursor: not-allowed;" disabled>Sold Out</button>`}
            </div>
          </div>
        </swiper-slide>
      `;
    });
    const swiper = document.querySelector(".mySwiperjs").innerHTML =html;
  })