fetch("src/js/db.json")
  .then((response) => response.json())
  .then((data) => {
    let html = " ";
    const productsContainer = document.querySelector(".products");
    const inStockFilter = document.getElementById("inStockFilter");
    const outOfStockFilter = document.getElementById("outOfStockFilter");
    const minPriceInput = document.getElementById("minPriceInput");
    const maxPriceInput = document.getElementById("maxPriceInput");
    const resetButton = document.getElementById("resetFilters");
    const resetStock = document.getElementById("resetStock");
    const brandCheckboxes = document.querySelectorAll(".brandFilter");
    const colorCheckboxes = document.querySelectorAll(".colorFilter");
    const resetColor = document.getElementById("resetColor");

    function renderProducts() {
      html = " ";
      data.products.forEach((item) => {
        if (
          (!inStockFilter.checked || item.available) &&
          (!outOfStockFilter.checked || !item.available)
        ) {
          const price = parseFloat(item.price);

          const selectedBrands = Array.from(brandCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

          const selectedColors = Array.from(colorCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

          if (
            (!minPriceInput.value || price >= parseFloat(minPriceInput.value)) &&
            (!maxPriceInput.value || price <= parseFloat(maxPriceInput.value)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(item.type)) &&
            (
            selectedColors.length === 0 ||
            selectedColors.includes(item.options.first) ||
            (item.options.second && selectedColors.includes(item.options.second))
            )) 
           {
            html += `
              <div class="product">
              <div class="product-title">
                <h4>
                  <a href="">${item.title}</a>
                </h4>
              </div>
              <p class="type">TYPE: ${item.type}</p>
              <div class = "product-img">
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
                ${item.available ? `<a href="" class="btn-transparent">Add to cart</a>` : `<button class="btn-transparent" style= "
                  cursor: not-allowed;" disabled>Sold Out</button>`}
              </div>
            </div>
            `;
          }
        }
      });
      productsContainer.innerHTML = html;
    }

    renderProducts();

    inStockFilter.addEventListener("change", renderProducts);
    outOfStockFilter.addEventListener("change", renderProducts);
    minPriceInput.addEventListener("input", renderProducts);
    maxPriceInput.addEventListener("input", renderProducts);

    resetButton.addEventListener("click", function () {
      minPriceInput.value = "";
      maxPriceInput.value = "";
      renderProducts();
    });

    resetStock.addEventListener("click", function () {
      inStockFilter.checked = false;
      outOfStockFilter.checked = false;
      renderProducts();
    });

    brandCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", renderProducts);
    });

    resetBrand.addEventListener("click", function () {
      brandCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      renderProducts();
    });

    colorCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", renderProducts);
    });

    resetColor.addEventListener("click", function () {
      colorCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      renderProducts();
    });
  });