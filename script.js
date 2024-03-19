"use strict";

const NUMBERS_API_BASE = 'http://numbersapi.com';
const gracee_number = 7;


/** get trivia fact from Numbers API and log it to the console */

async function showNumberTrivia() {
  const response = await fetch(`${NUMBERS_API_BASE}/${gracee_number}/trivia?json`);
  const data = await response.json();
  console.log("showNumberTrivia: ", data.text);
}


/** make 4 requests to Numbers API and returns the first response; displays trivia
 * fact of first response to console */

async function showNumberRace(nums) {

  let numberResp = nums.map(n => fetch(`${NUMBERS_API_BASE}/${n}/trivia?json`));

  const answerPromise = await Promise.race(numberResp);

  // const response = await fetch((await answerPromise).url);

  const data = await answerPromise.json();

  console.log("showNumberRace: ", data.text);
}


/** make 4 requests to Numbers API; shows all successful trivia facts and
 * displays errors separately */

async function showNumberAll(nums) {

  let numberResp = nums.map(n => fetch(`${NUMBERS_API_BASE}/${n}/trivia?json`));

  let results = await Promise.allSettled(numberResp);
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
  await showNumberRace([1, 2, 3, 4]);
  await showNumberAll([7, 11, 22, "WRONG"]);
}










