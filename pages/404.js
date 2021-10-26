import React from 'react';
import MainLayout from "../layouts/MaintLayout";

const Error
    = () => {
    return (
        <MainLayout pageTitle={"404 Error"}>
            <h1>404</h1>
            <p>¯\_(ツ)_/¯</p>
        </MainLayout>
    );
};

export default Error;