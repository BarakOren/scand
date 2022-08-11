import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export const getCategories = async () => {
    const { data } = await client.query({
          query: gql`
          {
              categories {
                name
              }
          }
            `
      }) 
      return data
  }

export const getProducts = async category => {
    const { data } = await client.query({
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
    return data;
}
  
export const getProductInfo = async id => {
    const { data } = await client.query({
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
    return data
}

export const getCurrencies = async () => {
    const { data } = await client.query({
      query: gql`
          {
            currencies {
              label
              symbol
            }
          }`
    })
    return data;
}