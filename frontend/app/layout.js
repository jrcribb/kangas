// import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import ConfigProvider from './contexts/ConfigContext';
import config from '../config';

const RootLayout = ({ children }) => {
    return (
        <html>
            <ConfigProvider value={{
                config: {
                    apiUrl: config.apiUrl,
                    isColab: config.isColab
                }
            }}>
                <body>
                    { children }
                </body>
            </ConfigProvider>
        </html>
    );
};

export default RootLayout;