if (localStorage.getItem("basket") == null) {
  localStorage.setItem("basket", JSON.stringify([])); 
}

fetch("src/js/data.json")
  .then((response) => response.json())
  .then((data) => {
    let html = " ";
    data.products.forEach(item => {
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
                <a href="/product.html" data-product-id=${item.id} id="product-detail">${item.title}</a>
              </h4>
            </div>
            <p class="type">TYPE: ${item.type}</p>
            <div class="product-img">
              <img src="${item.img}" alt="" />
              <div class="btns">
                <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="white">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1335 2.95108C16.73 4.16664 16.9557 6.44579 15.6274 7.93897L8.99983 15.3894L2.37233 7.93977C1.04381 6.44646 1.26946 4.167 2.86616 2.95128C4.50032 1.70704 6.87275 2.10393 7.99225 3.80885L8.36782 4.38082C8.59267 4.72325 9.05847 4.82238 9.40821 4.60224C9.51777 4.53328 9.60294 4.44117 9.66134 4.33666L10.0076 3.80914C11.1268 2.10394 13.4993 1.70679 15.1335 2.95108ZM8.99998 2.653C7.31724 0.526225 4.15516 0.102335 1.94184 1.78754C-0.33726 3.52284 -0.659353 6.77651 1.23696 8.90805L8.4334 16.9972C8.7065 17.3041 9.18204 17.3362 9.49557 17.0688C9.53631 17.0341 9.57231 16.996 9.60351 16.9553L16.7628 8.90721C18.6589 6.77579 18.3367 3.52246 16.0579 1.78734C13.8446 0.102142 10.6825 0.526185 8.99998 2.653Z" fill="white"></path>
              </svg>
              </button>
              <button type="button" class="modal">
                <svg id="Layer_1" enable-background="new 0 0 32 32" height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="m16 21.693c3.14 0 5.693-2.554 5.693-5.693s-2.553-5.693-5.693-5.693-5.693 2.553-5.693 5.693 2.553 5.693 5.693 5.693zm0-9.386c2.036 0 3.693 1.657 3.693 3.693s-1.657 3.693-3.693 3.693-3.693-1.657-3.693-3.693 1.657-3.693 3.693-3.693z"></path><path d="m16 25.326c8.138 0 14.531-8.368 14.799-8.725.269-.356.269-.847 0-1.203-.268-.356-6.661-8.724-14.799-8.724s-14.531 8.368-14.799 8.724c-.269.356-.269.847 0 1.203.268.357 6.661 8.725 14.799 8.725zm0-16.652c5.958 0 11.132 5.476 12.709 7.326-1.577 1.851-6.751 7.326-12.709 7.326s-11.132-5.475-12.709-7.326c1.577-1.851 6.751-7.326 12.709-7.326z" fill="white"></path></svg>
              </button>
              <button type="button" >
                <svg fill="white" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m17.2929 4.29289c-.3905.39053-.3905 1.02369 0 1.41422l1.2929 1.29289h-5.5858c-2.2091 0-4 1.79086-4 4v1c0 .5523.44772 1 1 1 .5523 0 1-.4477 1-1v-1c0-1.10457.8954-2 2-2h5.5858l-1.2929 1.2929c-.3905.3905-.3905 1.0237 0 1.4142s1.0237.3905 1.4142 0l3-2.99999c.3905-.39053.3905-1.02369 0-1.41422l-3-3c-.3905-.39052-1.0237-.39052-1.4142 0zm-3.2929 6.70711c-.5523 0-1 .4477-1 1v1c0 1.1046-.8954 2-2 2h-5.58579l1.2929-1.2929c.39052-.3905.39052-1.0237 0-1.4142-.39053-.3905-1.02369-.3905-1.41422 0l-3 3c-.39052.3905-.39052 1.0237 0 1.4142l3 3c.39053.3905 1.02369.3905 1.41422 0 .39052-.3905.39052-1.0237 0-1.4142l-1.2929-1.2929h5.58579c2.2091 0 4-1.7909 4-4v-1c0-.5523-.4477-1-1-1z" fill="white" fill-rule="evenodd"></path></svg>
              </button>
              </div>
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
              ${
                item.available
                  ? `<a href="#" class="btn-primary" data-product-id=${item.id} data-product-image=${item.img} data-product-title=${item.title} data-product-price=${item.price} data-product-option=${item.options.first}>Add to cart</a>`
                  : `<button class="btn-primary" style="cursor: not-allowed;" disabled>Sold Out</button>`
              }
            </div>
          </div>
        </swiper-slide>
      `;
    });
    document.querySelector(".mySwiper").innerHTML = html;

    let addButton = document.querySelectorAll(".btn-primary");
    let basket = JSON.parse(localStorage.getItem("basket"));

    let total = 0;
    basket.forEach(item => {
        total += parseFloat(item.price) * item.count;
    });

    document.querySelector(".total-price").innerHTML = total.toFixed(2);
    document.querySelector(".count-1").innerHTML = basket.length;
    addButton.forEach(btn => {
      
        btn.addEventListener("click", function(event) {
          event.preventDefault()
            if(localStorage.getItem("basket") == null) {
                localStorage.setItem("basket", JSON.stringify([]));
            }
            

            let data_id = btn.getAttribute("data-product-id");
            let data_price = Number(btn.getAttribute("data-product-price")).toFixed(2);
            let data_name = btn.getAttribute("data-product-title");
            let data_img = btn.getAttribute("data-product-image");
            let data_option = btn.getAttribute("data-product-option")

            let element = basket.find(a => {
                return a.id == data_id;
            })

            if( element === undefined){
                 let item = {
                    id: data_id,
                    count: 1,
                    price: data_price,
                    name: data_name,
                    img: data_img,
                    option: data_option
            }
            basket.push(item)
            }else {
                element.count++;
            }
            localStorage.setItem("basket", JSON.stringify(basket));
            
            total += parseFloat(data_price);
            document.querySelector(".total-price").innerHTML = total.toFixed(2);
            document.querySelector(".count-1").innerHTML = basket.length;
        });
        document.querySelector(".count-1").innerHTML = basket.length; 
    });
  

    const modalButton = document.querySelectorAll(".modal");
    const modalContainer = document.querySelector(".modal-container");
    const closeModalButton = document.querySelector(".close-modal");
    const modalProductDetails = document.getElementById("modal-product-details");

    modalContainer.style.display = "none";

    modalButton.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        modalContainer.style.display = "flex";

        const product = data.products[index];
        if (product.oldPrice !== undefined) {
          oldPriceHTML = `<del>${product.oldPrice}<span>USD</span></del>`;
        }

        if (product.options.second !== undefined) {
          optionSecondHTML = `<option value="">${product.options.second}</option>`;
        }

        const dynamicContentHTML = `
              <div class="product-info">
              <h2>${product.title}</h2>
              <p class="info">${product.description}</p>
              <p class="size">${product.label}:</p>
              <div class="options">
              <select name="" id="">
                <option value="">${product.options.first}</option>
                ${product.options.second ? `<option value="">${product.options.second}</option>` : ''}
              </select>
              <img src="./src/image/dropdown.png" alt="" />
              </div>
              <div class="price">
              <p>
              ${product.price}<span>USD</span>
              ${product.oldPrice ? `<del>${product.oldPrice}USD</del>` : ''}
              </p>
                  <div class="buttons">
                      <button class="btn-primary">Add to Cart</button>
                  </div>
                </div>
          </div>
          <div class="product-image">
              <img src="${product.img}" alt="">
          </div>
        `;

        modalProductDetails.innerHTML = dynamicContentHTML;
      });
    });

    closeModalButton.addEventListener("click", function () {
      modalContainer.style.display = "none";
    });
    
  });
  

// --------------------------------------------



let langBtn = document.getElementById("languageBtn");

langBtn.addEventListener("click", function() {
    let langToggle = document.getElementById("langToggle");
    if (langToggle.style.display === "none" || langToggle.style.display === '') {
        langToggle.style.display = "block"
    } else {
        langToggle.style.display = "none"
    }
});



// -------------------------------------------

fetch("src/js/data.json")
  .then((response) => response.json())
  .then((data) => {
    const gamingButton = document.querySelector("#gamingButton");
    const speakersButton = document.querySelector("#speakersButton");
    const powerButton = document.querySelector("#powerButton");
    const productsContainer = document.querySelector(".products");

    gamingButton.classList.add("active");

  gamingButton.addEventListener("click", () => {
    toggleActiveClass(gamingButton);
    filterAndRenderProducts(data.products, "gaming");
  });

  speakersButton.addEventListener("click", () => {
    toggleActiveClass(speakersButton);
    filterAndRenderProducts(data.products, "spikers");
  });

  powerButton.addEventListener("click", () => {
    toggleActiveClass(powerButton);
    filterAndRenderProducts(data.products, "power");
  });

  function toggleActiveClass(button) {

    const categoryButtons = [gamingButton, speakersButton, powerButton];
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

  button.classList.add("active");
}

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




// -------------------------------------------


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