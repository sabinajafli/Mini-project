function cartItem() {
    let cartContent = JSON.parse(localStorage.getItem("basket"));
    let cartHtml = "";
    let totalUniqueItems = 0;
    let totalPrice = 0;
    if (cartContent) {
        const uniqueItems = new Set();
        cartContent.forEach((item, index) => {
            const itemTotalPrice = item.count * item.price;
            cartHtml += `
                <tr>
                    <td>
                        <img src="${item.img}" alt="" />
                    </td>
                    <td>
                        <p>${item.name}</p>
                        <div>
                            <span>${item.option}</span>
                        </div>
                    </td>
                    <td>
                        <p class="price">${item.price}<span>USD</span></p>
                    </td>
                    <td>
                        <div class="quantity">
                            <button id="minus-${index}">-</button>
                            <span>${item.count}</span>
                            <button id="plus-${index}">+</button>
                        </div>
                    </td>
                    <td>
                        <div class="remove">
                            <p class="total-price">${itemTotalPrice.toFixed(2)}<span>USD</span></p>
                            <i class="far fa-trash-alt" data-index="${index}"></i>
                        </div>
                    </td>
                </tr>
            `;
            uniqueItems.add(item.name);
            totalPrice += itemTotalPrice; 
        });

        totalUniqueItems = uniqueItems.size;
    }

    document.getElementById("tableBody").innerHTML = cartHtml;

    let removeButtons = document.querySelectorAll(".far.fa-trash-alt");

    removeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const index = button.getAttribute("data-index");
            removeItemFromCart(index);
        });
    });

    function removeItemFromCart(index) {
        cartContent.splice(index, 1);
        localStorage.setItem("basket", JSON.stringify(cartContent));
        cartItem();
    }

    let minusBtns = document.querySelectorAll("[id^='minus-']");
    let plusBtns = document.querySelectorAll("[id^='plus-']");

    minusBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const index = parseInt(btn.id.split("-")[1]);
            if (cartContent[index].count > 1) {
                cartContent[index].count -= 1;
            } else {
                cartContent.splice(index, 1);
            }
            localStorage.setItem("basket", JSON.stringify(cartContent));
            cartItem();
        });
    });

    plusBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const index = parseInt(btn.id.split("-")[1]);
            cartContent[index].count += 1;
            localStorage.setItem("basket", JSON.stringify(cartContent));
            cartItem();
        });
    });

    const cartCountElement = document.querySelector(".cart-count");
    cartCountElement.innerHTML = `${totalPrice.toFixed(2)}`;
    document.querySelector(".count-1").textContent = totalUniqueItems;

    const totalElement = document.getElementById("total");
    totalElement.innerHTML = `${totalPrice.toFixed(2)} <span>USD</span>`;
}

cartItem();