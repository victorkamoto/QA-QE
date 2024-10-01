# tickets-cart

Run:

```bash
pnpm serve
```

## Part 1

## Description

Use the provided JSON and build the webpage shown in the screenshot

**Instructions:**

- **DOM Manipulation Complexity:**
  - Utilize JavaScript to create a dynamic filtering mechanism for the events based on their properties like date, price, or location. Implement at least two filtering options.
  - Implement a feature that allows users to add events to their favorites list. Include functionality to add and remove events from this list dynamically.
- **Iteration and Data Manipulation:**
  - Use array methods such as map, filter, or reduce in addition to forEach to manipulate the event data in various ways. For example, you could create a new array with modified event objects or calculate aggregate statistics like the total revenue from all events.
  - Implement a feature that dynamically updates the event list based on user interactions, such as sorting the events by price or date in ascending or descending order.
- **Styling Complexity:**
  - Implement a responsive design that adapts gracefully to different screen sizes using CSS media queries. Ensure that the layout remains visually appealing and functional on both desktop and mobile devices.
  - Utilize advanced CSS techniques such as CSS animations or transitions to enhance the user experience. For example, you could animate the appearance of event cards when they are dynamically added to the page.
- **Asynchronous Data Loading:**
  - Implement lazy loading for the event images to improve page loading performance. Load the images asynchronously as the user scrolls down the page to minimize initial load time.
  - Enhance the asynchronous data fetching process by implementing error handling and retry mechanisms in case the initial fetch request fails due to network issues or server errors.
- **Performance Optimization:**
  - Optimize the rendering performance by minimizing DOM manipulation operations and reducing reflows and repaints. Use techniques such as document fragment or virtual DOM to batch DOM updates and improve rendering efficiency.
  - Implement caching mechanisms to store previously fetched event data locally in the browser and only fetch updated data from the server when necessary. This can help reduce network traffic and improve overall application responsiveness.

## Part 2

- **Create a Function to Add Products:**
  - **Description:** Begin by creating a function named addProducts that will add a list of data object JSON to a global array. This function will be responsible for fetching product data from an API endpoint and populating it into your JavaScript application.
  - **Steps:**
    - Define the addProducts function.
    - Within the function, fetch data from the API endpoint asynchronously. You can use techniques like fetch() or axios to perform this task.
    - Once the data is fetched successfully, parse the JSON response.
    - Add the parsed data to a global array, which will serve as your product list.
    - Ensure error handling for any potential issues during data fetching or parsing.
- **Populate Data on the DOM:**
  - **Description:** After successfully retrieving product data and storing it in the global array, the next step is to populate this data onto the HTML page. This involves dynamically creating HTML elements and injecting them into the DOM to display product details.
  - **Steps:**
    - Define a function, let's call it populateProducts, responsible for populating product data onto the DOM.
    - Inside this function, access the global array containing product data.
    - Iterate through each product object in the array.
    - For each product, dynamically create HTML elements `(e.g., <div>, <img>, <h2>, <p>)` representing product details.
    - Append these elements to the appropriate container in the HTML document, such as a product grid or list.
- **Create Functions for Cart Management:**
  - **Description:** Implement functions to manage the shopping cart, including adding, deleting, increasing quantity, reducing quantity, and editing products in the cart.
  - **Steps:**
    - **Add Product to Cart:**
      - Define a function named addToCart that takes a product object as a parameter.
      - Within this function, add the product object to the cart array, which stores the items currently in the cart.
      - Update the cart UI to reflect the addition of the product, such as displaying the product in the cart preview or updating the cart total.
    - **Delete Product from Cart:**
      - Create a function called deleteProductFromCart that takes a product ID as a parameter.
      - Use array methods like filter() to remove the product with the specified ID from the cart array.
      - Update the cart UI to reflect the removal of the product.
    - **Increase Product Quantity in Cart:**
      - Implement a function named increaseProductQuantity that takes a product ID as a parameter.
      - Locate the product in the cart array and increment its quantity.
      - Update the cart UI to reflect the updated quantity.
    - **Reduce Product Quantity in Cart:**
      - Develop a function named reduceProductQuantity that accepts a product ID as input.
      - Find the product in the cart array and decrement its quantity.
      - Ensure appropriate handling for cases where the quantity becomes zero, potentially removing the product from the cart altogether.
    - **Edit Product in Cart:**
      - Create a function called editProductInCart that takes a product ID and new quantity as parameters.
      - Locate the product in the cart array and update its quantity with the new value.
      - Update the cart UI to reflect the changes made to the product.
