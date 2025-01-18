const allProduct = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            AllProductsData = data;
            displayProduct(data);
            console.log(data);

        });
};



let AllProductsData = [];

const displayProduct = (Products) => {
    const ProductContainer = document.getElementById("Product-container");
    ProductContainer.innerHTML = '';

    Products.forEach((Product) => {
        const div = document.createElement("div");
        div.classList.add("innerDiv");
        // <img class="image" src=${Product.strMealThumb} alt="" />
        // <p>Product Tags: ${Product.strTags}</p>
        div.innerHTML = `
            <h4>Player Name: ${Product.name}</h4>
            <h4>Id : ${Product.id}</h4>
            <div style="display: flex;">
                <i class="fa-solid fa-envelope"></i>
                <p>Email: ${Product.email}</p>
            </div>
            <div style="display: flex;">
            <i class="fa-solid fa-dice"></i>
            <p>User Name: ${Product.username}</p>
            </div>

            <div class="btn">
                <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${Product.id}"
                        class="btn1">Details</button>
                <button onclick="AddToCart('${Product.name}','${Product.id}')" class="btn2">Add to cart</button>
            </div>

            <div class="modal fade" id="staticBackdrop-${Product.id}" data-bs-backdrop="static"
                 data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">${Product.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h4>Id: ${Product.id}</h4>
                            <p><b> Phone numbers: </b>${Product.phone}</p>
                            <p><b>Website link : </b>${Product.website}</p>
                            <p><b>Company name: </b>${Product.company.name}</p>
                            <p><b>Company catchPhrase: </b>${Product.company.catchPhrase}</p>
                            <p><b>Company bs: </b>${Product.company.bs}</p>
                            
                            <p><b>Address : </b> <b>Street : </b>${Product.address.street} <br>  <b>Suite : </b> ${Product.address.suite} <br>
                            <b>City : </b>${Product.address.city} <br><b>Zipcode : </b>  ${Product.address.zipcode} <br>
                            <b>Lat : </b>  ${Product.address.geo.lat} <br><b>Lot : </b> ${Product.address.geo.lng} <br></p>
                        </div>
                        <div class="modal-footer">
                            <button onclick="AddToCart('${Product.name}','${Product.id}')" class="btn2">Add to cart</button>
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

const AddToCart = (Name, id) => {
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
                id: id
            };
            updateCartCount();
            const container = document.getElementById("cart");
            const div = document.createElement("div");
            div.classList.add("cartProduct");
            div.innerHTML = `
          <p>${Name}</p>
          <h4>$${id}</h4>
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
    const filteredProducts = AllProductsData.filter(Product => Product.name.toLowerCase().includes(searchTerm));
    displayProduct(filteredProducts);
};

allProduct();