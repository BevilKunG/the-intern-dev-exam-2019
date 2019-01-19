const categories = require('./categories');
const readlineSync = require('readline-sync');

//Select Category
console.log('Select Category:');
categories.forEach(category => console.log(category.name));
const which = parseInt(readlineSync.question());

//Random word
const n = categories[which-1].words.length;
const index = Math.floor(Math.random() * n);

//Show hint
const currentWord = categories[which-1].words[index];
console.log(`hint:"${currentWord.hint}"`);

//Create blank string
let uncount = 0;
let currentBlank = currentWord.word.split('').map(letter => {
  if(letter.toUpperCase() === letter.toLowerCase()){
    uncount++;
    return letter;
  }
  return '_';
}).join('');

//Create check is letter use
const isLetterUse = [];
const asciiA = 'a'.charCodeAt();
for(let i=0;i<26;i++) isLetterUse.push(0);

//Play
const wrongLetters= [];
let wrongCount = 10;
let score = 0;

while(currentBlank!==currentWord.word && wrongCount>0){
  let text = wrongLetters.length>0? ', wrong guessed: ':'';
  console.log(`${currentBlank} score ${score}, remaining wrong guess ${wrongCount}${text}${wrongLetters}`);
  let inputLetter = readlineSync.question().toLowerCase();
  let counter = 0;
  currentBlank = currentBlank.split('').map((oldLetter,index) => {
    if(inputLetter===currentWord.word[index]){
      counter++;
      return inputLetter;
    }
    return oldLetter;
  }).join('');

  if(isLetterUse[inputLetter.charCodeAt()-asciiA]===0){
    if(counter===0){
      wrongLetters.push(inputLetter);
      wrongCount--;
    }else{
      score+=(5*counter);
    }
    isLetterUse[inputLetter.charCodeAt()-asciiA]=1;
  }
}

//Score
if(score === (currentWord.word.length - uncount)*5){
  console.log(currentBlank);
  console.log('Congratulation !!!');
}else{
  console.log('Game Over');
}
console.log(`Score: ${score}`);
