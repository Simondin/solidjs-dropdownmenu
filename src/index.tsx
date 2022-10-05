/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import _App from './_app';

render(() => <_App />, document.getElementById('root') as HTMLElement);
