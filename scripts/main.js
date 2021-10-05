
let ace = document.querySelector('#ace')
let deal = document.querySelector('#deal-button')
let hit = document.querySelector('#hit-button')
let stand = document.querySelector('#stand-button')
let newGame = document.querySelector('#newGame-button')
let player = document.querySelector(".player")
let dealer = document.querySelector(".dealer")
let dealerHand = document.querySelector('#dealer-hand')
let playerHand = document.querySelector('#player-hand')
let playerPoints = document.querySelector('#player-points')
let dealerPoints = document.querySelector('#dealer-points')
let message = document.querySelector('#messages')
let playerArr = []
let dealerArr = []
let deck = []
let dealerScore;
let playerScore;

function makeDeck(){
  let suit = ''
let makeCard = {}
for(index = 1; index<=4;index++){
  if(index == 1){
    suit = 'diamonds'
  }else if(index == 2){
    suit ='clubs'
  }else if(index == 3){
    suit ='spades'
  }else if(index == 4){
    suit ='hearts'
  }
  }for(index1 = 1; index1 < 14; index1++){
    makeCard = {rank:(index1),suit:`${suit}`,img:`images/${index1}_of_${suit}.png`}
    deck.push(makeCard)
  }
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
function cardPoints(arr, pointarr){
  for(let index = 0; index < arr.length;index++){
    let points = 0

    if( arr[index].rank > 9){
      points += 10
    }else if(arr[index].rank == 1){
      points += 11
    }
    else if( arr[index].rank < 10){
      points += arr[index].rank
    }
    pointarr.push(points)
}
}
function calcPlayerPoints(){
  let playPoints =[]
  cardPoints(playerArr,playPoints)
  let sum = 0
  
  console.log('playerpointscalc', playPoints)
  for(let index=0;index < playPoints.length;index++){
    sum += playPoints[index]
  }
  if(sum < 21 && playPoints[index] == 1){
  
  sum -= 10
  }
console.log('sum',sum);
playerPoints.textContent = sum
return sum
}

function calcDealerPoints(){
  let dealPoints =[]
  cardPoints(dealerArr,dealPoints)
  let sum = 0
  for(let index=0;index < dealPoints.length;index++){
    sum += dealPoints[index]
  }
  if(sum < 21 && dealPoints[index] == 1){
  
  sum -= 10
  }
dealerPoints.textContent = sum
return sum
}

function checkPlayerBust(){
  playerScore = calcPlayerPoints()
  if(playerScore > 21){
    message.textContent = `Player Busts!`
  }
}
function checkDealerBust(){
  dealerScore = calcDealerPoints()
  if(dealerScore > 21){
    message.textContent = `Dealer Busts!`
  }
}
function dealTo(dealtTo, arr){
  let cardDealt = deck.pop()
  let img = document.createElement('img')  
  img.setAttribute('src', `${cardDealt.img}`)
  img.setAttribute('class','hand img')
    arr.push(cardDealt)
    dealtTo.appendChild(img)
    console.log('deal to logic',dealtTo, arr);
  }
function blackJack(name,score){
  if(score == 21) {
    message.textContent = `${name} got BlackJack!`
  }
}
function winner(){
  dealerScore = calcDealerPoints()
  playerScore = calcPlayerPoints()
if(dealerScore > 17 && dealerScore <= 21){
      if(dealerScore > playerScore){
        message.textContent = 'Dealer Wins'
        
      }else{
        message.textContent = 'Player Wins'
      
      }
    }

}
deal.addEventListener('click', (e) => {
  dealTo(playerHand,playerArr);
  dealTo(playerHand,playerArr);
  calcPlayerPoints();
  blackJack('Player',playerScore)

  dealTo(dealerHand,dealerArr);
  dealTo(dealerHand,dealerArr);
  calcDealerPoints()
  blackJack('Dealer',dealerScore)

})

hit.addEventListener('click', (e) => {
  dealTo(playerHand,playerArr);
  calcPlayerPoints();
  checkPlayerBust()
})

stand.addEventListener('click', (e) => { 
  while(true){
    dealerScore = calcDealerPoints()
    if(dealerScore < 17){
      dealTo(dealerHand,dealerArr);
      checkDealerBust()
      console.log(dealerScore);
    }
    else{
      break
    }
  }
  winner()
})

newGame.addEventListener('click', (e) => {
  location.reload()

})

makeDeck()
shuffleArray(deck)