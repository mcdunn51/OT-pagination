import React from 'react';
import { Route } from 'react-router-dom';
import Index from './Components/Index';

const Router = () => {
    return (
        <div>
            <Route path="/:pathParam?" component={Index} />
            {/* <Route path="/page/:id"  /> */}
        </div>
    )
}

export default Router; 
