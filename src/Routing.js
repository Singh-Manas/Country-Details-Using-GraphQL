import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CountriesList from './CountriesList';
import CountryDetails from './CountryDetails';

const Routing  = () => {
    return(
        <Router>
            <div className="container">
                <Route exact path="/" component={CountriesList} />
                <Route exact path="/details/:countryID" component={CountryDetails} />
            </div>
        </Router>
    )
}

export default Routing;