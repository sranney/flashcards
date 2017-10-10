module.exports = class basic{//class basic - basic flashcard

	constructor(phrase,answer){
		this.phrase = phrase;
		this.answer = answer;
	}//constructor sets phrase and answer attributes

	getQuestion(){//getter function for question
		return this.phrase;//returns question
	}

	getAnswer(){//getter function for answer
		return this.answer;
	}

}
