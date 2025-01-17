// Sample Array of Product objects
const products = [
    { id: 1, name: 'Screwdriver', category: 'Tools', price: 10.5, quantity: 150, dateAdded: new Date('2023-01-01') },
    { id: 2, name: 'Hammer', category: 'Tools', price: 12.75, quantity: 120, dateAdded: new Date('2023-02-15') },
    { id: 3, name: 'Wrench', category: 'Tools', price: 15.0, quantity: 200, dateAdded: new Date('2023-03-10') },
    { id: 4, name: 'Drill', category: 'Power Tools', price: 55.0, quantity: 80, dateAdded: new Date('2023-05-25') },
    { id: 5, name: 'Nail Gun', category: 'Power Tools', price: 90.0, quantity: 50, dateAdded: new Date('2023-06-30') },
    { id: 6, name: 'Saw', category: 'Tools', price: 20.0, quantity: 100, dateAdded: new Date('2023-04-20') },
    { id: 7, name: 'Laser Cutter', category: 'Machines', price: 500.0, quantity: 15, dateAdded: new Date('2023-07-15') },
    { id: 8, name: 'Band Saw', category: 'Machines', price: 250.0, quantity: 25, dateAdded: new Date('2023-08-05') }
  ];
  
  // 1. Sorting by Price (ascending) spread operator to create a new array 
  function sortElementsByPrice(){
  const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
  // console.log('Sorted by Price (Ascending):', sortedByPrice);
  return sortedByPrice;
  }
  // sortElementsByPrice();//Should be called when it is clicked in the page.
  
  // 2. Sorting by Quantity (descending)
  function sortElementsByQuantity(){
  const sortedByQuantity = [...products].sort((a, b) => b.quantity - a.quantity);
  // console.log('Sorted by Quantity (Descending):', sortedByQuantity);
  return sortedByQuantity;
  }
  // sortElementsByQuantity();//Should be called when it is clicked in the page.
  
  // 3. Sorting by Date Added (ascending)
  function sortElementByDateAdded(){
  const sortedByDateAdded = [...products].sort((a, b) => a.dateAdded - b.dateAdded);
  // console.log('Sorted by Date Added (Ascending):', sortedByDateAdded);
  return sortedByDateAdded;
  }
  // sortElementByDateAdded();//Should be called when it is clicked in the page.
  
  // 4. Search: Find all products in a specific category (e.g., 'Tools')
  function categoryTools(category){
    const toolsCategory = products.filter(product => product.category === category);
    // console.log('Products in Tools Category:', toolsCategory);
    return toolsCategory;
  }
  // categoryTools();//Should be called when it is clicked in the page.
  
  // 5. Search: Find products with price less than a certain value (e.g., 30)
  function productAffordable(maxval){
  const affordableProducts = products.filter(product => product.price < maxval);//maxval is the price we set to find affordable items.
  // console.log('Affordable Products :', affordableProducts);
  return affordableProducts;
  }
  
  // 6. Search: Find product by name (e.g., 'Hammer')
  function productFind(productName){
  const findProduct = products.filter(product => product.name === productName);
  // console.log(`Product with name ${productName}:`, findProduct);
  return findProduct;
  }
  
  // 7. Search: Find products with quantity greater than a certain value (e.g., 100)
  function highQtyProducts(qty1){
  const highQuantityProducts = products.filter(product => product.quantity > qty1);
  // console.log('Products with Quantity > 100:', highQuantityProducts);
  return highQuantityProducts;
  }


    document.addEventListener("DOMContentLoaded",()=>{

      function searchOperation(){
        const search = document.getElementById('criteria');
        const category = document.getElementById('category');
        const name = document.getElementById('name');
        const price = document.getElementById('price');
        const qty = document.getElementById('qty');
        if(search.value!=''){
          if(category.checked == true){
            console.log(search.value,"Category selected");
            return categoryTools(search.value);
          }
          else if(name.checked == true){
            return productFind(search.value);
          }
          else if(price.checked == true){
            return productAffordable(search.value);
          }
          else if(qty.checked == true){
            return highQtyProducts(search.value);
          }
          else{
            return [];
          }
          
        }else{
          console.log("Search Field is empty");
          return [];
          
        }
      
      }

      function sortOption(criteria){
        if(criteria == 'price1'){
          return sortElementsByPrice();
  
        }
        else if(criteria == 'quantity'){
          return sortElementsByQuantity();
        }
        else if(criteria == 'dateAdded'){
          return sortElementByDateAdded();
        }
        else{
          return "Select any sort";

        }
      }
  
      const search = document.getElementById('search');
      search.addEventListener('click',()=>{
        console.log('searchb');
        displayResults(searchOperation());
      });
      const sort = document.getElementById('sort');
      sort.addEventListener('click',()=> {
        const option = document.getElementById('type').value;
        let sortedProducts = sortOption(option);
        console.log(sortedProducts);
        displayResults(sortedProducts);
      });
    })

    function displayResults(arr){

      const list = document.getElementById("result");
      console.log(arr);
      list.innerHTML="";
      if(arr.length==0){
        displayErrorMessage();
        return;
      }
      arr.forEach(product => { 
        const listItem = document.createElement("li");
        listItem.textContent = `${product.name} ${product.price}`
        list.appendChild(listItem);
      });

      function displayErrorMessage(){
        const list = document.getElementById("result");
        list.innerHTML="";
        const spanItem = document.createElement('span');
        spanItem.textContent="No Elements or Invalid Inputs";
        list.appendChild(spanItem);
      }
      
    }

  
  // // 8. Complex Search: Find products by category and price range
  // const powerToolsUnder100 = products.filter(product => product.category === 'Power Tools' && product.price < 100);
  // console.log('Power Tools under 100:', powerToolsUnder100);
  