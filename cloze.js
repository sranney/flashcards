var basic = require("./basic.js");//import parent class basic

module.exports = class cloze extends basic{

//basic is the parent function which has functionality for all types of flashcards
//cloze is a specific type of flashcard, but still needs functionality that basic has
//so I set cloze to be a child class of the basic class and cloze thus inherits functionality from 
//its basic parent class. i use the keyword extends to execute cloze as a child class of basic and have it inherit attributes and methods of basic

	constructor(phrase,answer){//constructor function for cloze class
		if(!phrase.includes(answer)){//if answer is not in phrase, then console log this and create a "empty" instance of cloze class
			console.log("the answer is not part of the phrase");
			super("","");
		} else {//if answer is part of the phrase, then do the following
			var clozePhrase = phrase.replace(answer,"...");//create clozePhrase which will be the phrase with the answer replaced by "..."
			super(clozePhrase,answer);//call parent class constructor, passing clozePhrase and answer to set cloze's properties that are inherited from basic (this.phrase and this.answer)
			//phrase will be what the partial text is
			//answer is the cloze portion
			this.fullText = phrase;//set additional cloze class attribute
		}
	}



}
