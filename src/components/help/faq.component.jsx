import React from 'react';

const FAQ = () => (
    <div>
        <h2>FAQ</h2>
                <h3>Measurements</h3>
                    <ul className="list">
                        <li className="question">What are measurements?
                            <ul>
                            <li className="answer">Measurements are the weekly measurements that you track including weight, muscle mass, viseral fat, fat %, BMI, and water %.</li>
                            </ul>
                        </li>
                        <li className="question">How do I add new measurements?
                            <ul>
                            <li className="answer">Click on the button in the "Add Measurements" area. This will take you to a screen allowing you to enter in the new measurements. Click Submit and they will be saved. You can then view your measurements history.</li>
                            </ul>
                        </li>
                        <li className="question">How do I view my measurements?
                            <ul>
                            <li className="answer">The menu item "Measurements" allows you to see your history. Your most recent measurements are also displayed on the left panel in the home page.</li>
                            </ul>
                        </li>
                    </ul>
                    <h3>Training Sessions</h3>
                    <ul className="list">
                    <li className="question">How do I add a new training session?
                        <ul>
                            <li>Click on the date selector box in the "Add a Training Session" area of your homepage. Select the date and select the "Self-training" option if this is not part of a training package. Click "submit".</li>
                           
                            </ul>
                        </li>
                    </ul>
            </div>)

export default FAQ;