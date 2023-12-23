
    async function fetchProductData() {
      try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching product data:', error);
        return null;
      }
    }

    
    async function getProducts(category) {
      const productContainer = document.getElementById('product-container');
      productContainer.innerHTML = '';

      const apiResponse = await fetchProductData();

      if (!apiResponse || !apiResponse.categories) {
   
        productContainer.innerHTML = '<p>No products available</p>';
        return;
      }

      const selectedCategory = apiResponse.categories.find(cat => cat.category_name === category);

      if (!selectedCategory) {
       
        productContainer.innerHTML = '<p>No products available for this category</p>';
        return;
      }



      function truncateString(str, maxLength) {
        if (str.length > maxLength) {
          return str.substring(0, maxLength) + '...';
        }
        return str;
      }


      const categoryProducts = selectedCategory.category_products;

      categoryProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
          <img class="product-image" src="${product.image}" alt="${product.title}">
          <h3>${truncateString(product.title, 15)}</h3>
          <p>Vendor: ${product.vendor}</p>
          <p>Price: $${product.price}</p>
          <p>Compare at Price: $${product.compare_at_price}</p>
          <p>Badge: ${product.badge_text}</p>
          <button class="add-to-cart-button" onclick="addToCart()">Add to Cart</button>
        `;

        productContainer.appendChild(productCard);
      });
    }

    function addToCart() {
     
      alert(`Product successfully added to cart`);
    }


    getProducts('Men');
