const allProduct = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            AllProductsData = data;
            displayProduct(data);
        });
};

let AllProductsData = [];

const displayProduct = (Products) => {
    const ProductContainer = document.getElementById("Product-container");
    ProductContainer.innerHTML = '';

    Products.forEach((Product) => {
        const div = document.createElement("div");
        div.classList.add("innerDiv");
        div.innerHTML = `
            <img class="image" src=${Product.image} alt="" />
            <h4>Product Name: ${Product.title}</h4>
            <h4>Price: ${Product.price}</h4>
            <div style="display: flex;">
                <i class="fa-regular fa-star"></i>
                <p>Product Rating: ${Product.rating.rate}</p>
            </div>
            <div style="display: flex;">
            <i class="fa-solid fa-dice"></i>
            <p>Product Sold: ${Product.rating.count}</p>
            </div>

            <div class="btn">
                <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${Product.id}" 
                        class="btn1">Details</button> 
                <button onclick="AddToCart('${Product.title}','${Product.price}')" class="btn2">Add to cart</button>
            </div>

            <div class="modal fade" id="staticBackdrop-${Product.id}" data-bs-backdrop="static" 
                 data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">${Product.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img class="image" src=${Product.image} alt="" />
                            <h4>Price: ${Product.price}</h4>
                            <p><b>Product discriptions: </b> ${Product.description}</p>
                            <p><b>Product Rating: </b>${Product.rating.rate}</p>
                            <p><b>Product Sold: </b>${Product.rating.count}</p>
                            <p><b>Product Category: </b>${Product.category}</p>
                        </div>
                        <div class="modal-footer">
                            <button onclick="AddToCart('${Product.title}','${Product.price}')" class="btn2">Add to cart</button> 
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        ProductContainer.append(div);
    });
};

// ... rest of the code (AddToCart, removeFromCart, updateCartCount, searchProduct)

allProduct();

let cart = {};

const AddToCart = (Name, price) => {
    let totalItems = 0;
    for (const product in cart) {
        totalItems += cart[product].quantity;
    }
    if (totalItems < 10) {
        if (cart[Name]) {
            alert("Already Added!")
        }
        else {
            cart[Name] = {
                quantity: 1,
                price: price
            };
            updateCartCount();
            const container = document.getElementById("cart");
            const div = document.createElement("div");
            div.classList.add("cartProduct");
            div.innerHTML = `
          <p>${Name}</p>
          <h4>$${price}</h4>
          <button class="remove" onclick="removeFromCart('${Name}')">Remove</button> 
        `;
            container.appendChild(div);
        }
    }
    else {
        alert("Cart limit(10) exceeded!")
    }
};

const removeFromCart = (Name) => {
    if (cart[Name]) {
        if (cart[Name].quantity > 1) {
            cart[Name].quantity--;
        } else {
            delete cart[Name];
        }
        updateCartCount();
        const cartItems = document.querySelectorAll('.cartProduct');
        cartItems.forEach(item => {
            if (item.querySelector('p').textContent == Name) {
                item.remove();
            }
        });
    }
};

const updateCartCount = () => {
    let totalItems = 0;
    for (const product in cart) {
        totalItems += cart[product].quantity;
    }
    document.getElementById("cartCount").innerHTML = totalItems;
};

const searchProduct = () => {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const filteredProducts = AllProductsData.filter(Product => Product.title.toLowerCase().includes(searchTerm));
    displayProduct(filteredProducts);
};

allProduct();

