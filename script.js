"use strict";

const NUMBERS_API_BASE = 'http://numbersapi.com';
const gracie_number = 7;


/** get trivia fact from Numbers API and log it to the console */

async function showNumberTrivia() {
  const response = await fetch(`${NUMBERS_API_BASE}/${gracie_number}/trivia?json`);
  const data = await response.json();
  console.log("showNumberTrivia: ", data.text);
}


/** make 4 requests to Numbers API and returns the first response; displays trivia
 * fact of first response to console */

async function showNumberRace() {

  const n1 = fetch(`${NUMBERS_API_BASE}/1/trivia?json`);
  const n2 = fetch(`${NUMBERS_API_BASE}/2/trivia?json`);
  const n3 = fetch(`${NUMBERS_API_BASE}/3/trivia?json`);
  const n4 = fetch(`${NUMBERS_API_BASE}/4/trivia?json`);

  const answerPromise = await Promise.race([n1, n2, n3, n4]);

  // const response = await fetch((await answerPromise).url);

  const data = await answerPromise.json();

  console.log("showNumberRace: ", data.text);
}


/** make 4 requests to Numbers API; shows all successful trivia facts and
 * displays errors separately */

async function showNumberAll() {

  const n1 = fetch(`${NUMBERS_API_BASE}/1/trivia?json`);
  const n2 = fetch(`${NUMBERS_API_BASE}/2/trivia?json`);
  const n3 = fetch(`${NUMBERS_API_BASE}/3/trivia?json`);
  const n4 = fetch(`${NUMBERS_API_BASE}/"WRONG"/trivia?json`);

  let results = await Promise.allSettled([n1, n2, n3, n4]);
  // console.log("results", results)

  let success = [];
  let errors = [];

  for (let result of results) {
    if (result.value.ok) {
      // let resp = await fetch((await result.value).url);
      success.push((await result.value.json()).text);
    } else {
      errors.push(result.value.statusText);
    }
  }

  console.log(`showNumberAll fulfilled: ${success}, showNumberAll rejected: ${errors}`);
}


/** runs all 3 functions and displays result in console  */

async function main() {
  await showNumberTrivia();
  await showNumberRace();
  await showNumberAll();
}








