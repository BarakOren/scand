import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export const getCategories = () => {
    return client.query({
        query: gql`
        {
            categories {
              name
            }
        }
          `
      })
    .then(res => { return res.data });
}

export const getProducts = (category) => {
    return client.query({
        query: gql`
        {
            category(input: { title: "${category}" }){
              name
                products {
                id
                name
                inStock
                gallery
                category
                brand
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
                  amount
                  currency {
                    label
                    symbol
                  }
                }
              }
            }
          }`
      })
    .then(res => {return res.data});
}
  
export const getProductInfo = (id) => {
    return client.query({
      query: gql`
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
                amount
                currency {
                  label
                  symbol
                }
              }
            }
          }`
      })
    .then(res => {return res.data});
}

export const getCurrencies = () => {
    return client.query({
      query: gql`
          {
            currencies {
              label
              symbol
            }
          }`
    })
    .then(res => {return res.data})
}