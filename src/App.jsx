/**
 * App.jsx
 */

// Node Modules
import {useEffect} from 'react';

// Constants
const WEB_COMPONENT_HTML = `
    <h1><code>edit-word</code> demo</h1>

<template id="person-template">
  <div>
    <h2>Personal ID Card</h2>
    <slot name="person-name">NAME MISSING</slot>
    <ul>
      <li><slot name="person-age">AGE MISSING</slot></li>
      <li><slot name="person-occupation">OCCUPATION MISSING</slot></li>
    </ul>
  </div>
</template>

    <person-details>
      <p slot="person-name"><edit-word>Morgan</edit-word> Stanley</p>
      <span slot="person-age">36</span>
      <span slot="person-occupation">Accountant</span>
    </person-details>

    <p>My name is <edit-word>Chris</edit-word>, the man said.</p>
`;

const WEB_COMPONENT_SCRIPT_URL =
  'https://drive.google.com/uc?export=view&id=1dOe7qxY3l3aUr39az3lW6-TZNlQu-ZoC';
export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = WEB_COMPONENT_SCRIPT_URL;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{__html: WEB_COMPONENT_HTML}}></div>;
}
