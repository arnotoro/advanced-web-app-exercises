import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next';

function MyContainer() {
    const { t } = useTranslation();

  return (
    <div>
        <h1>{t('homepage')}</h1>
    </div>
  )
}

export default function App() {
    
        return (
            <Suspense fallback="loading">
                <MyContainer />
            </Suspense>
        );
}