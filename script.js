// How our calculator might work:
// - Create string --> each button creates string.
// display string on display on keypress

// on-button-press, check if it's [1-9]; if so, add number to string. 
// we will need a global integer!!! global variables must be outside of .ready


$(document).ready(function() {
	

	$(".button").click(function() {
		var buttonVal = $(this).text().toString();
		// add digit or operator!
		handleButton(buttonVal);
	});

	$("#back").click(function() {
		var displayValue = $(".display").text().toString();
		displayValue = displayValue.substring(0, displayValue.length-1);
		$(".display").html(displayValue);


	});



});

// adds either a digit or operator
function handleButton(buttonVal) {
	addDigit(buttonVal);
	addOperator(buttonVal);
}



// String button
function addDigit(buttonVal) {
	if(isLastIndexDigit(buttonVal))
		$(".display").append(buttonVal);

}

// String button
// Adds operator to display if its last char is a digit.
// Clears display if button is "CE".
function addOperator(buttonVal) {
	display = $(".display").text();
	
	// invariant: numbers will have only one operator to its right at most.
	// invariant: only one decimal can exist in display
	if(buttonVal === "C") {
		$(".display").html("");
	} else if(buttonVal === ".") {
		if(!display.includes('.'))
			$(".display").append(buttonVal);
	} else if (buttonVal === "=") {
		// a lot of work here: cycle through every char, perform operation.
		sumDisplay(display);
	} else if(isLastIndexDigit(display) && (!isLastIndexDigit(buttonVal))) {
		$(".display").append(buttonVal);
	} 
}

// how do we want operators to work --> grab operator and next digit and add it to value
// error scenario: operator without a digit following it
// we need to grab all numbers before using operator; only handling single operations right now
function sumDisplay(str) {
	var answer = eval(str);
	$(".display").html("");
	$(".display").append(answer);
}

// see if last digit of string is a number
function isLastIndexDigit(str) {
	var lastIndex = str.length - 1;
	var lastChar = str.substring(lastIndex);
	return isDigit(lastChar);
}

// see if input is a digit
function isDigit(str) {
	var patt = /\d/g;
	var result = patt.test(str);
	return result;
}


function hasNumber(myString) {
  return (
    /\d/.test(
      myString));
}