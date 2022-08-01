export const fetchCategories = () => {
    const categoriesS = `
    {
      categories {
        name
      }
    }`;
  
    const categories = fetch(`http://localhost:4000/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: categoriesS }),
    }).then((res) => res.json());
  
    return categories;
}

export const fetchProducts = props => {
  const productsS = `
        {
          category(input: { title: "${props || "all"}" }){
            name
              products {
              id
              name
              attributes {
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              inStock
              gallery
              category
              brand
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
            }
          }
        }`;

  const response = fetch(`http://localhost:4000/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: productsS }),
  }).then((res) => res.json());

  return response;
}


export const fetchProductInfo = (id) => {
  const productDataS = `
        {
          product(id: "${id}") {
            id
            name
            inStock
            description
            category
            gallery
            attributes {
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            brand
            prices {
              currency {
                label
                symbol
              }
              amount
            }
          }
        }`;

  const response = fetch(`http://localhost:4000/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: productDataS }),
  }).then((res) => res.json());
  return response;
}