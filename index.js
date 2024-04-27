
const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    let companyTitle = document.getElementById('company-title');
    let productName = document.getElementById("product-name");
    let discountedPrice = document.getElementById('discounted-price');
    let discountPercent = document.getElementById('discount-percent');
    let actualPrice = document.getElementById('actual-price');
    let description = document.getElementById('description');
    let colorPalette = document.getElementById('color-pallete');
    let sizePills = document.getElementById('size-pills');
    let addCartButton = document.getElementById('add-cart');
    let selectedProduct = document.getElementById('selected-product');
    let increment = document.getElementById('increment');
    let decrement = document.getElementById('decrement');
    let productCount = document.getElementById('product-count');
    let currentProductCount = 1;
    productCount.innerHTML = currentProductCount;


    companyTitle.innerHTML = data.product.vendor;
    productName.innerHTML = data.product.title;
    discountedPrice.innerHTML = data.product.price;
    let perscentage = 100 - Math.ceil(parseInt(data.product.price.slice(1)) / parseInt(data.product.compare_at_price.slice(1)) * 100);
    discountPercent.innerHTML = `${perscentage}% off`;
    actualPrice.innerHTML = data.product.compare_at_price;
    description.innerHTML = data.product.description;
    let colorData = data.product.options[0].values;
    let selectedColorPalette = '';
    let selectedSize = '';

    colorData.forEach((singleColor, index) => {
      let colorElement = document.createElement('div');
      let key = Object.keys(singleColor)[0];
      colorElement.style.backgroundColor = singleColor[key];
      colorElement.classList.add('single-color-pallete');
      colorElement.addEventListener('click', () => {
        selectedColorPalette = key;
        let tickSVG = document.getElementById('tick');
        if (tickSVG) {
          tickSVG.parentElement.removeChild(tickSVG);
        }
        colorElement.innerHTML = '<svg id="tick" fill="#000000" width="20px" height="20px" viewBox="0 0 23 27" id="check" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><polyline id="primary" points="5 12 10 17 19 8" style="fill: none; stroke: rgb(256, 256, 256); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline></svg>';
      })
      colorPalette.append(colorElement);
    });

    let sizeData = data.product.options[1].values;

    sizeData.forEach((singleSize, index) => {
      let sizeElement = document.createElement('div');
      var x = document.createElement("INPUT");
      x.setAttribute("type", "radio");

      sizeElement.innerHTML = `<input type="radio" id="html" name="size" value="${singleSize}"></input><span>${singleSize}</span>`;
      sizeElement.classList.add('single-size-pill');
      sizePills.append(sizeElement);
      sizeElement.addEventListener('click', (event) => {
        selectedSize = event.target.value;
      })
    });

    addCartButton.addEventListener('click', () => {
      if (selectedSize && selectedColorPalette)
        selectedProduct.innerHTML = `${data.product.title} with color ${selectedColorPalette} and Size ${selectedSize} added to cart`;
      else if (!selectedSize && selectedColorPalette) {
        selectedProduct.innerHTML = `Please select a size.`;
      } else if (selectedSize && !selectedColorPalette) {
        selectedProduct.innerHTML = `Please select a color`;
      } else {
        selectedProduct.innerHTML = `Please select a color and size`;
      }
      selectedProduct.style.display = 'block';
    });

    increment.addEventListener('click', () => {
      currentProductCount++;
      productCount.innerHTML = currentProductCount;
    });

    decrement.addEventListener('click', () => {
      if (currentProductCount > 1) {
        currentProductCount--;
        productCount.innerHTML = currentProductCount;
      }
    })

  })
  .catch(error => {
    console.error('Error:', error);
  });

