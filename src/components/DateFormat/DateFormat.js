import React from 'react';

const monthTable = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December'
];

const formatMonth = (month) => {
        
    return monthTable[month];
};

const DateFormat = (oldDate) => {      
    var newDate, month, day, year, monthLabel;

    month = oldDate.getMonth();
    monthLabel = formatMonth(month);
    day = oldDate.getDate();
    year = oldDate.getFullYear();
      
     newDate = `${monthLabel} ${day},${year}`;
     return newDate;
};

export default DateFormat;