import React from "react";
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

// initialize a GraphQL client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });

const CountryDetails = (props) => {

    // write a GraphQL query that asks for details for a specific country
    const COUNTRY_DETAILS = gql`
    {
        country(code: "${props.match.params.countryID}") {
            name
            native
            capital
            emoji
            currency
            languages {
            code
            name
            }
        }
    }
    `;

    const {data, loading, error} = useQuery(COUNTRY_DETAILS, {client});

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

    return(
        <>
            <br/>
            <center>
                <h1>{data.country.name} ({data.country.native}) {data.country.emoji}</h1>
                <hr/>
                <div className="d-flex justify-content-around">
                    <h4>Capital: <p className="text-success">{data.country.capital}</p></h4>
                    <h4>Currency: <p className="text-danger">{data.country.currency}</p></h4>
                </div>
                <hr/>
                <div className="container">
                    <h3>Languages</h3>
                    <br/>   
                    <div className="d-flex justify-content-around">
                    {data.country.languages.map( (language) => {
                        return(
                            <div className="btn btn-primary" key={language.name}>
                                {language.name}
                            </div>
                        )
                    })}
                </div>
                </div>
            </center>
        </>
    )
}

export default CountryDetails;