//addAProduct
let products = [
    { id: 1, name: "apple", price: 3000 },
  ];
  const addproducts = (product) => {
    if (!products.find((i) => i.id == product.id)) {
      products.push(product);
      return true;
    } else {
      return false;
    }
  };
  
  //view products
  function viewProducts(productArray) {
    const productList = document.getElementById("view-products");
    productList.innerHTML = "";
  
    productArray.forEach((product) => {
      const liout = document.createElement("li");
      liout.textContent = `Product ID : ${product.id} - Product Name : ${product.name} - Product Price : ${product.price}`;
      productList.appendChild(liout);
    });
  }
  
  //update product
  const updateproducts = (productid) => {
    let productToBeFound = products.find((i) => i.id == productid);
    if (productToBeFound) {
      const curname = document.querySelector(
        'input[name = "pdtname"]'
      ).value;
      const curprice = document.querySelector(
        'input[name = "pdtprice"]'
      ).value;
      console.log(curname, curprice, "abcd");
      if (curname.length > 0 && curprice.length > 0) {
        console.log("herewe come");
        productToBeFound.name = curname;
        productToBeFound.price = curprice;
      } else if (curname === "") {
        console.log("hi");
        //productToBeFound.name = products[i].name;
        productToBeFound.price = curprice;
      } else {
        console.log("hiiiiii");
        productToBeFound.name = curname;
        //productToBeFound.price = products[i].price;
      }
    }
  };
  
  //add discount
  const addDiscount = (discount) => {};
  
  document.addEventListener("DOMContentLoaded", () => {
    const addbtn = document.getElementById("addbutton");
    addbtn.addEventListener("click", () => {
      let newid = document.querySelector('input[name="pdtid"]').value;
      let newname = document.querySelector('input[name="pdtname"]').value;
      let newprice = document.querySelector('input[name="pdtprice"]').value;
      addproducts({ id: newid, name: newname, price: newprice });
    });
  
    const viewbtn = document.getElementById("viewbutton");
    viewbtn.addEventListener("click", () => {
      viewProducts(products);
    });
  
    const updatebtn = document.getElementById("updatebutton");
    updatebtn.addEventListener("click", () => {
      const curid = document.querySelector('input[name="pdtid"]').value;
      updateproducts(curid);
    });
  });