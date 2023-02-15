import React, { Suspense }from 'react'
import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button component={Link} to="/" color="inherit">{t('Home')}</Button>
                    <br />
                    <Button component={Link} to="/about" color="inherit">{t('About')}</Button>
                    <br />
                    <Button id="en" sx={{ marginLeft: "auto" }} onClick={() => changeLanguage('en')} color="inherit">EN</Button>
                    <Button id="fi" onClick={() => changeLanguage('fi')} color="inherit">FI</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default function App() {

    return (
        <Suspense fallback="loading">
            <Header />
        </Suspense>
    );
}