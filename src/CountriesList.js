import React from 'react';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import { Link } from 'react-router-dom';

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

// create a component that renders a select input for coutries
const CountriesList = () => {
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

  if (loading || error) {
    return(
      <>
        <center>
          <br/>
          <h1>{error ? error.message : 'Loading...'}</h1>;
        </center>
      </>
    )
  }


  return (
    <>
      <br/>
      <center><h1>Countries List</h1></center>
      <hr/>  

      {data.countries.map( (country => {
        return(
          <div className="card card-body mb-3" key={country.code}>
            <div className="row">
              <div className="col-md-9 d-flex justify-content-between">
                {country.name}
                <Link to={`/details/${country.code}`} className="btn btn-secondary">
                  Country Details
                </Link>
              </div>
            </div>
          </div>
        )
      }))}
    </>
  );
}

export default CountriesList;