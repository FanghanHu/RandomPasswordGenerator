// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


//ask user for password criteria
let passwordLength = 8;

//lenth needs to be between 8 and 128

let hasLowercase = true;
let hasUppercase = false;
let hasNumeric = false;
let hasSpecialCharacters = false;

let alphabet = 'qwertyuiopasdfghjklzxcvbnm';
let numeric = '0123456789';
let specialCharacters = '!@#$%^&*()_+-=/?,.<>;:[]{}|';

function generatePassword() {

  if(!(hasLowercase || hasUppercase || hasNumeric || hasSpecialCharacters)) {
    alert("Password must contain at least one type of character.");
    return;
  }


  //possible characters
  let charPool = "";
  //picked characters
  let passwordArray = [];

  if(hasLowercase) {
    passwordArray.push(getRandomChar(alphabet));
    charPool+=alphabet;
  }

  if(hasUppercase) {
    passwordArray.push(getRandomChar(alphabet.toUpperCase()));
    charPool+=alphabet.toUpperCase();
  }

  if(hasNumeric) {
    passwordArray.push(getRandomChar(numeric));
    charPool+=numeric;
  }

  if(hasSpecialCharacters) {
    passwordArray.push(getRandomChar(specialCharacters));
    charPool+=specialCharacters;
  }

  //use random characters to fill in the rest of the passwords
  while(passwordArray.length < passwordLength) {
    passwordArray.push(getRandomChar(charPool));
  }

  //shuffle and join the characters into a password
  let result = '';
  for(let c of shuffle(passwordArray)) {
    result+=c;
  }
  return result;
}

/**
 * returns a shuffled copy of the original array
 * 
 * @param {[string]} arr 
 */
function shuffle(arr) {
  let charCount = arr.length;
  let result = [];
  for(let i=0; i<charCount; i++) {
    let index = Math.floor(Math.random()*arr.length);
    result.push(arr[index]);
    arr.splice(index, 1);
  }

  return result;
}

/**
 * 
 * @param {string} str 
 */
function getRandomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

function updatepasswordLength(str) {
  let num = parseInt(str);

  if(isNaN(num)) {
    alert("Length must be a valid number");
    document.getElementById('passwordLength').value = '8';
  } else if (num < 8 || num > 128) {
    alert("length must be between 8 and 128.");
    document.getElementById('passwordLength').value = '8';
  } else {
    passwordLength = num;
  }
}


/*

GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page

 */