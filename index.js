//get the flashcard type constructors
var cloze = require("./cloze.js");
var basic = require("./basic.js");

//package
var inquirer = require("inquirer");

//array to push all cards into
var cards = [];

//starting inquirer prompt
var newActivity = function(){
	inquirer.prompt([//ask user what they want to do
		{
			name:"action",
			message:"What do you want do?",
			choices:["make new card","review current flashcards"],
			type:"list"
		}
	]).then(function(response1){
		if(response1.action=="make new card"){
			newCard();//make new card
		} else {
			reviewCards();//review existing cards
		}
	});
}

var newCard = function(){//function to create new card
	inquirer.prompt([
	{
		name:"typeOfCard",
		message:"What type of card do you want to create?",
		choices:["basic","cloze deleted"],
		type:"list"
	}
	]).then(function(response2){//if new card type is basic, call newbasicCard, else call newcloseCard
		response2.typeOfCard=="basic" ? newbasicCard() : newclozeCard();
	});
}

var newbasicCard = function(wrong){//function to create new basic card

	if(wrong){
		console.log("both questions need to have an answer supplied to them. please try again.");
	}

	inquirer.prompt([
		{
			name:"text",
			message:"What is the question that you want to ask?",
			type:"input"
		},
		{
			name:"answer",
			message:"What is the answer that you want to assign to this question?",
			type:"input"
		}
	]).then(function(response3){
		
		if(response3.text.length==0 || response3.answer.length==0){//if either of these prompts were responded with no response, then call the function again and print the issue 
			newbasicCard(true);
		} else {
			cards.push(new basic(response3.text,response3.answer));//if both have a response, then push to cards array so that the question can be reviewed later
			newActivity();//then ask user if they want to run function again
		}
	});

}

var newclozeCard = function(wrong){//function to create new cloze card

	if(wrong){
		console.log("both questions need to have an answer supplied to them. please try again.");
	}

	inquirer.prompt([
		{//prompt user with two questions - ask for statement and then ask for portion of statement that they want to hide
			name:"text",
			message:"What is the statement that you want to convert to a cloze statement?",
			type:"input"
		},
		{
			name:"answer",
			message:"What is the portion of the statement that you want to hide?",
			type:"input"
		}
	]).then(function(response3){
		
		if(response3.text.length==0 || response3.answer.length==0){//if either of these prompts were responded with no response, then call the function again and print the issue 
			newclozeCard(true);
		} else {//if both received a response, then do the following
			var newCard = new cloze(response3.text,response3.answer);//create a new instance of cloze class
			//within the constructor function for cloze, there is a check on the param values passed to it
			//to make sure that the answer is indeed a substring of the full text phrase
			//if the answer is not a substring of the full text, then the set phrase is "" and will be of length 0
			//additionally a statement that the answer is not part of the phrase is printed to the console
			if(newCard.phrase.length!=0){//so this check is to make sure that phrase is not ""
				cards.push(newCard);
			}
			newActivity();//after the above is complete, I ask what else the user wants to do
		}
	});

}

//retrieve random card so user can review and try to answer question
var reviewCards = function(){
	if(cards.length==0){//if there is currently no cards in the cards array, this means that the user has not created any cards
		console.log("No flash cards to read!");
		newActivity();
	} else {
		console.log("Here's a random card:");
		var randomCardNum = Math.floor(Math.random()*cards.length);//pick random card
		var que = cards[randomCardNum].getQuestion();//return question (called phrase in the objects)
		var ans = cards[randomCardNum].getAnswer();//return answer to question
		inquirer.prompt([{name:"question",message:que,type:"input"}]).then(function(response){//ask user the question
			//check answer and return statement whether user got it correct or not
			var stmt = ans.toUpperCase() == response.question.toUpperCase()? "You got the question correct!": "You got the question incorrect! Answer was " + ans;
			console.log(stmt);
			newActivity();//ask user what else they want to do
		});
	}
}

newActivity();//start off execution