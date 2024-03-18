"use strict";

const NUMBERS_API_ENDPOINT = 'http://numbersapi.com';
const gracie_number = 7;

async function showNumberTrivia() {
  const response = await fetch(`${NUMBERS_API_ENDPOINT}/${gracie_number}/trivia?json`);
  console.log((await response.json()).text);
}



async function showNumberRace() {

  const n1 = fetch(`${NUMBERS_API_ENDPOINT}/1/trivia?json`);
  const n2 = fetch(`${NUMBERS_API_ENDPOINT}/2/trivia?json`);
  const n3 = fetch(`${NUMBERS_API_ENDPOINT}/3/trivia?json`);
  const n4 = fetch(`${NUMBERS_API_ENDPOINT}/4/trivia?json`);

  const answerPromise = Promise.race([n1, n2, n3, n4]);

  console.log(await answerPromise);
}











