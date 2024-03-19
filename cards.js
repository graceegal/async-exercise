"use strict";
// ///////////////////////////////////////////////////////////////////////
const CARDS_BASE_API = 'https://deckofcardsapi.com';
//returns id
const SHUFFLE_ENDPOINT = 'shuffle';
//draws from deckid--> returns info
const DRAW_ENDPOINT = '/api/deck/[deck-id]/draw';
//gets new deck
const NEW_DECK_URL = 'https://deckofcardsapi.com/api/deck/new/';

//holds new deck ID
let deck_id_card_deck;

//gets new deck id
async function newDeckToShow() {
  const newDeck = await fetch(`${NEW_DECK_URL}${SHUFFLE_ENDPOINT}`);
  const data = await newDeck.json();
  console.log(data);
  deck_id_card_deck = data.deck_id;
}

//loads page w card ID from new deck
$(document).ready(function () {
  newDeckToShow();
});



//draws card on events
async function drawCard() {
  $('.card-area').empty();

  const response = await fetch(`${CARDS_BASE_API}/api/deck/${deck_id_card_deck}/draw`);
  const data = await response.json();
  console.log(data);
  const theCard = data.cards[0].image;

  let cardToShow = generateHtmlMarkup(theCard);
  $('.card-area').append(cardToShow);
}

$('#click-card').on('click', drawCard);



//adds cards to html
function generateHtmlMarkup(card) {
  return (`
  <ul id="card-image"><img src="${card}" alt=""> </ul>
  `);
}