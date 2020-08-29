
import dotenv from "dotenv";
dotenv.config({path: ".env"});

export class Lex {

  private keywords: string[] = [];
  private word: string[] = [];
  private punc: string[] = [];
  private symbols: string[] = [];

  // Store generated tokens
  public tokens: Token[];

  constructor(input: string[]) {
    // Process tokens
    this.tokens = input.map((line) => {
      return this.tokenize(line);
    });
  }

  /**
   * @param input { string } - Hearthstone card text
   *
   * @returns { Token[] } - An array of tokens for the card text
   *
   * Take a string and generate appropriate tokens
   */
  private tokenize(input: string): Token[] {
    // Split text input to each character
    const charArray = input.split('');

    // Build and progressively store each term
    let type: string;
    let term: string[] = [];
    let foundIndex: number = 0;

    charArray.forEach((char, index) => {

      if(char.match(/^[A-Za-z]+$/)) { // If alphabetic char, push to term array
        term.push(char);
      }else {

      }


    });
  }

  private phraseMap(): string {

  }

}

/**
 * Token interface
 * @param index { number } - The character index that the token is mapped to
 * @param type { string:enum } - The type defining what the token is, one of:
 *                > Keyword: An important or bolded word that has other implied effects.
 *                > Word: Just any other word that is used in the sentence.
 *                > Punc: Punctuation used on the card.
 *                > Symbol: Math or other non alphanumeric symbol used.
 *                > Epsilon: Indiates that there is no text.
 * @param value { string } - Inner text matching each corresponding card text type.
 */
interface Token {
  index: number;
  type: 'Keyword' | 'Word' | 'Punc' | 'Symbol' | 'Epsilon';
  value: string;
}
