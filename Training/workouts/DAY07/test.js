//To add a product
let products = [
    { id: 1, name: "TV", price: 25000 },
    { id: 2, name: "Mobile", price: 10000 },
    { id: 3, name: "Watch", price: 500 },
  ];
  const addproducts = (product) => {
    if (!products.find((i) => i.id == product.id)) {
      products.push(product);
      return true;
    } else {
      return false;
    }
  };
  
  //To view all products
  function viewProducts(productArray) {
    const productList = document.getElementById("view-products");
    productList.innerHTML = "";
  
    productArray.forEach((product) => {
      const liout = document.createElement("li");
      liout.textContent = `productID : ${product.id} - Product Name : ${product.name} - Product Price : ${product.price}`;
      productList.appendChild(liout);
    });
  }
  
  //To update products
  const updateproducts = (productid) => {
    let productToBeFound = products.find((i) => i.id == productid);
    if (productToBeFound) {
      const curname = document.querySelector(
        'input[name = "product-name"]'
      ).value;
      const curprice = document.querySelector(
        'input[name = "product-price"]'
      ).value;
      console.log(curname, curprice, "abcd");
      if (curname.length > 0 && curprice.length > 0) {
        productToBeFound.name = curname;
        productToBeFound.price = curprice;
      } else if (curname === "") {
        //productToBeFound.name = products[i].name;
        productToBeFound.price = curprice;
      } else {
        productToBeFound.name = curname;
        //productToBeFound.price = products[i].price;
      }
    }
  };
  
  //add discount
  const addDiscount = (discount) => {};
  
  document.addEventListener("DOMContentLoaded", () => {
    const addbtn = document.getElementById("add-product-btn");
    addbtn.addEventListener("click", () => {
      let newid = document.querySelector('input[name="product-id"]').value;
      let newname = document.querySelector('input[name="product-name"]').value;
      let newprice = document.querySelector('input[name="product-price"]').value;
      addproducts({ id: newid, name: newname, price: newprice });
    });
  
    const viewbtn = document.getElementById("view-product-btn");
    viewbtn.addEventListener("click", () => {
      viewProducts(products);
    });
  
    const updatebtn = document.getElementById("update-product-btn");
    updatebtn.addEventListener("click", () => {
      const curid = document.querySelector('input[name="product-id"]').value;
      updateproducts(curid);
    });
  });