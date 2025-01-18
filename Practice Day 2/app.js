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
    if (Products.length == 0) {

        const div = document.createElement("div");
        div.classList.add("innerDiv");

        div.innerHTML = `
            <h4 style="text-align: center;">NOT FOUND</h4>
                        `;
        ProductContainer.append(div);
    }
    else {
        Products.forEach((Product) => {
            const div = document.createElement("div");
            div.classList.add("innerDiv");

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
            <button data-modal-target="#modal", onclick="details('${Product.id}')", class="btn1">Details</button>
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                            </div>
                            </div>
                            `;
            ProductContainer.append(div);
        });
    }
};


allProduct();


const searchProduct = () => {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const filteredProducts = AllProductsData.filter(Product => Product.name.toLowerCase().includes(searchTerm));
    if (filteredProducts.length == 0) {
        console.log("Not Found");
        displayProduct([]);
    }
    else {
        displayProduct(filteredProducts);
    }

};


const details = (data) => {

    fetch(`https://jsonplaceholder.typicode.com/users/${data}`)
        .then(res => res.json())
        .then(Product => {
            const ID = document.getElementById("play");
            ID.innerHTML = '';
            console.log(Product);

            const div = document.createElement("div");
            div.classList.add("innerDiv");
            div.innerHTML = `
       <h4>Id: ${Product.id}</h4>
                            <p><b> Phone numbers: </b>${Product.phone}</p>
                            <p><b>Website link : </b>${Product.website}</p>
                            <p><b>Company name: </b>${Product.company.name}
                            ${Product.company.catchPhrase}
                            ${Product.company.bs}</p>
                            
                            <p><b>Address : </b>${Product.address.street},${Product.address.suite},
                            ${Product.address.city}, ${Product.address.zipcode},
                              ${Product.address.geo.lat}, ${Product.address.geo.lng},</p>
                            </div>
  `;
            ID.append(div);

        });

};

allProduct();