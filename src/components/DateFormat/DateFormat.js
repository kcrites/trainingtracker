//import React from 'react';

const monthTable = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December'
];

const formatMonth = (month) => {
        
    return monthTable[month];
};

const DateFormat = (oldDate) => {      
    let newDate, month, day, year, monthLabel;
    let tempDate = new Date(oldDate);
    month = tempDate.getMonth();
    monthLabel = formatMonth(month);
    day = tempDate.getDate();
    year = tempDate.getFullYear();
      
     newDate = `${monthLabel} ${day}, ${year}`;
     return newDate;
};

export default DateFormat;