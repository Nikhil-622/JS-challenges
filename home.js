function ageindays (){
    var birthyear=prompt('enter your birth year ?......');
    var age = (2021-birthyear)*365;
    var h3=document.createElement('h3');
    var textans=document.createTextNode('Your are'+ age+' days older');
    h3.setAttribute('id', 'ageid');
    h3.appendChild(textans);
    document.getElementById('result1').appendChild(h3);

}
function reset(){
    document.getElementById('ageid').remove();
}
//imagegen
function gencat(){
    var image= document.createElement('img');
    var div = document.getElementById('flex-gen');
    image.src= "https://picsum.photos/200";
    div.appendChild(image);

}
//rock paper scissors
function rpsgame(yourChoice){
    var humanchoice,botchoice ;
    humanchoice=yourChoice.id;
    botchoice=numberofchoice(randbotchoice());

    results=decidewinner(humanchoice,botchoice);
    //console.log(results);

    mess=finalmessage(results);
   // console.log(mess);

    rpsfrontend(humanchoice,botchoice,mess);

}
function randbotchoice(){
    return Math.floor(Math.random()*3);
}
function numberofchoice(number){
   return ['rock','paper','scissors'][number];
}


function decidewinner(yourChoice,computerchoice){
    var database={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }
    var yourscore = database[yourChoice][computerchoice];
    var compscore=database[computerchoice][yourChoice];
    return [yourscore,compscore];
}


function finalmessage([yourscore, compscore] ){
    if(yourscore===0){
        return {'message':'You Lost !','color':'red'};
    }
    else if (yourscore===0.5){
        return {'message':'You tied ','color':'yellow'};
    }
    else{
        return {'message':'You Won !','color':'green'};
    }
}

function rpsfrontend(humanimg,botimage,finalmessage){
    var imagedatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humandiv=document.createElement('div');
    var botdiv=document.createElement('div');
    var messagediv=document.createElement('div');
    
    humandiv.innerHTML="<img src='" + imagedatabase[humanimg] +"' height=150 width=150>"

    messagediv.innerHTML="<h1 style='color:" + finalmessage['color'] + "; font-size:60px; padding:20px;'>"+finalmessage['message']+"</h1>"

    botdiv.innerHTML="<img src='" + imagedatabase[botimage] +"'height=150 width=150>"

    document.getElementById('flex-box44').appendChild(humandiv);
    document.getElementById('flex-box44').appendChild(messagediv);
    document.getElementById('flex-box44').appendChild(botdiv);
}

//BUTTON COLOR CHANGER
var all_buttons = document.getElementsByTagName('button');

var copyallbuttons = [];
for(let i=0 ; i<all_buttons.length; i++){
    copyallbuttons.push(all_buttons[i].classList[1]);
}

function buttonchangecolor(choice){
    if(choice.value === 'red'){
        buttonred();
    }
    else if (choice.value ==='green'){
        buttongreen();
    }
    else if (choice.value === 'reset'){
        resetbuttons();
    }
    else if(choice.value === 'random'){
        randomcolor();
    }
}

function buttonred(){
    for(let i=0; i<all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttongreen(){
    for(let i=0; i<all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}    

function resetbuttons(){
    for(let i=0; i<all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyallbuttons[i]);
    }
}

function randomcolor(){
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for(let i=0 ; i<all_buttons.length; i++){
        var randno = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randno]);
    }
}

//black jack

let blackjackGame={
    'you':{'scorespan':'#my-result', 'div':'#your-box','score':0},

    'dealer':{'scorespan':'#dealer-result', 'div':'#dealer-box','score':0},

    'cards':['2', '3', '4', '5', '6','7','8','9','10','K','J','Q','A'],

    'scores':{'2':2, '3':3, '4':4, '5':5, '6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},

    'wins':0,
    'losses':0,
    'draws':0,
    'isstand':false,
    'turnsover':false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitsound= new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lostSound = new Audio('sounds/aww.mp3');

document.querySelector('#hit-button').addEventListener('click', blackjackhit);
document.querySelector('#stand-button').addEventListener('click', dealerlogic);
document.querySelector('#deal-button').addEventListener('click',blackjackDeal);

function blackjackhit(){
    if(blackjackGame['isstand'] === false ){
    let card = randomcard();
    showcard(card , YOU);
    updatescore(card,YOU);
    showscore(YOU);
    }
}

function showcard(card , activeplayer){
    if(activeplayer['score'] <= 21){
        let cardimg = document.createElement('img');
        cardimg.src = `./images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardimg);
        hitsound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsover'] === true){

        blackjackGame['isstand'] = false;
        let yourimges = document.querySelector('#your-box').querySelectorAll('img');
        let dealerimges = document.querySelector('#dealer-box').querySelectorAll('img');

        for(i=0; i<yourimges.length; i++){
            yourimges[i].remove();
        }
        for(i=0; i<dealerimges.length; i++){
            dealerimges[i].remove();
        }

        YOU['score']=0
        DEALER['score']=0

        document.querySelector('#my-result').textContent = 0;
        document.querySelector('#my-result').style.color = 'white'

        document.querySelector('#dealer-result').textContent = 0;
        document.querySelector('#dealer-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Play !";
        document.querySelector('#blackjack-result').style.color = 'black'
        //blackjackGame['turnsover'] = true;
    }
}

function randomcard(){
    let randomindex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomindex];
}

function updatescore(card , activeplayer){
    if(card === 'A'){
        if(activeplayer['score']+blackjackGame['scores'][card][1]<=21){
            activeplayer['score']+=blackjackGame['scores'][card][1]
        }
        else{
            activeplayer['score']+=blackjackGame['scores'][card][0]
        }
    }
    else{
    activeplayer['score']+=blackjackGame['scores'][card]
    }
    
}
 
function showscore(activeplayer){
    if(activeplayer['score'] > 21 ){
        document.querySelector(activeplayer['scorespan']).textContent = 'BUST !';
        document.querySelector(activeplayer['scorespan']).style.color = 'red'
    }
    else{
        document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score']
    }    
}   

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve ,ms));
}

async function dealerlogic(){
    blackjackGame['isstand'] = true ;

    while(DEALER['score'] < 16 && blackjackGame['isstand'] === true){
        let card = randomcard();
        showcard(card , DEALER);
        updatescore(card , DEALER);
        showscore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsover'] = true;
    let winner = computewinner();
    showResult(winner);
    //console.log(blackjackGame['turnsover']);
}


//compute winner and return who just won
//update scores internally
function computewinner(){
    let winner ; 
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if (YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    }
    //condition where you and dealer bust
    else if (YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
     console.log(blackjackGame);  
     return winner;
}

function showResult(winner){
    let message , messageColor ;
    if(blackjackGame['turnsover'] === true){

        if(winner === YOU){
            message = 'You Won !';
            messageColor = 'green';
            winSound.play();
            document.querySelector('#wins').textContent=blackjackGame['wins'];
        }
        else if(winner === DEALER){
            message = 'You lost !';
            messageColor = 'red';
            lostSound.play();
            document.querySelector('#losses').textContent=blackjackGame['losses'];
        }
        else{
            document.querySelector('#draws').textContent=blackjackGame['draws'];
            message = 'You Drew';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
    







