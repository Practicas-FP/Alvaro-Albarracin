import React from 'react';
import ReactDOM from 'react-dom/client';
import { GifApp } from './GifApp';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <div className='subbody'>
    <GifApp />
    </div>
    <footer>© algonal 2022</footer>
    </>
);
