import React from 'react';

const FAQ = () => (
    <div>
        <h2>FAQ</h2>
                <h3>Measurements</h3>
                    <ul className="list">
                        <li className="question">What are measurements?
                            <ul>
                            <li className="answer">Measurements are the weekly measurements that you track including weight, muscle mass, viseral fat, fat %, BMI, and water weight.</li>
                            </ul>
                        </li>
                        <li className="question">How do I add stats after a new measurement?
                            <ul>
                            <li className="answer">Click on the menu item "Enter Stats." This will take you to a screen allowing you to enter in the new measurements. Click Submit and they will be saved. You can then view your history.</li>
                            </ul>
                        </li>
                        <li className="question">How do I view my stats?
                            <ul>
                            <li className="answer">The menu item "User Stats" allows you to see your history. Your most recent measurements are also displayed on the left panel in the home page.</li>
                            </ul>
                        </li>
                    </ul>
                    <h3>Training Sessions</h3>
                    <ul className="list">
                    <li className="question">How do I add a new training session?
                        <ul>
                            <li>Click on the menu date box on your home page. This will bring up the date selector. Select the date and click "sumbit".</li>
                           
                            </ul>
                        </li>
                    </ul>
            </div>)

export default FAQ;