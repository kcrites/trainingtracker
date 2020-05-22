import React from 'react';
const web = 'https://www.karvesoftware.com';

const Tech = () => (
<div>
    <h2>Technical Help</h2>
    <h3>Website help</h3>
    <p>By accessing the website at <a href={web}>{web}</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p><h3>2. Use License</h3>
    <ol type="a">
    <li>Permission is granted to temporarily download one copy of the materials (information or software) on Karve Software's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
    <ol type="i">
        <li>modify or copy the materials;</li>
        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
        <li>attempt to decompile or reverse engineer any software contained on Karve Software's website;</li>
        <li>remove any copyright or other proprietary notations from the materials; or</li>
        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
    </ol>
        </li>
    <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Karve Software at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
    </ol>

</div>);

export default Tech;