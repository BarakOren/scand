import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export const getCategories = () => {
    const req = client.query({
        query: gql`
        {
            categories {
              name
            }
          }`
      })
    .then(res => {return res.data});
    return req

    // const req = await client.query({
    //     query: gql`
    //     {
    //         categories {
    //           name
    //         }
    //       }`
    //   })
    // const {data} = await req;
    // return data;
}

export const getProducts = (props) => {
    const req = client.query({
        query: gql`
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
          }`
      })
    .then(res => {return res.data});
    return req
}
  
export const getProductInfo = (id) => {
    const req = client.query({
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
                currency {
                  label
                  symbol
                }
                amount
              }
            }
          }`
      })
    .then(res => {return res.data});
    return req
}