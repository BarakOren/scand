
export const fetchCategories = async () => {
    const categoriesS = `
    {
      categories {
        name
      }
    }`;
  
      const categories = await fetch(`http://localhost:4000/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: categoriesS }),
      }).then((res) => res.json());

      return categories;
    } 
    

export const fetchProducts = props => {
  const productsS = `
        {
          category(input: { title: "${props}" }){
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
            description
            brand
            category
            gallery
            inStock
            attributes {
              name
              type
              items {
                displayValue
                value
                id
              }
            }
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