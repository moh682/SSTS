// TODOS: Change Array to linked list

export class MyNode {
  private letter: string;
  private children = new Array<MyNode>();
  private word: string | undefined = undefined;
  private wordSubstring: string | undefined;
  private layer: number;
  private finalStrings = new Array<string>();

  constructor(letter: string, layer: number) {
    this.letter = letter;
    this.layer = layer;
  }

  public addChild(substring: string, wholeWord: string) {
    substring = substring.substring(1);

    if (!substring || substring === '') {
      if (this.wordSubstring !== undefined && this.wordSubstring === '') {
        this.finalStrings.push(wholeWord);
        return;
      }
      if (this.word !== undefined && this.word !== wholeWord) {
        let orginalWord: string = this.word;
        let orginalWordSubstring: string = this.wordSubstring as string;
        let orginalLetter: string = orginalWordSubstring.charAt(0);

        let node: MyNode = new MyNode(orginalLetter, this.layer + 1);

        this.children.push(node);
        node.addChild(orginalWordSubstring, orginalWord);
      }
      this.word = wholeWord;
      this.wordSubstring = substring;
      return;
    }
    //This makes the node compact if possible
    if (this.word == undefined && this.children.length == 0) {
      this.word = wholeWord;
      this.wordSubstring = substring;
      return;
    }

    let substringLetter: string = substring.charAt(0);

    // Looks for a child node which matches the current letter
    this.children.forEach(node => {
      if (node.getLetter() == substringLetter) {
        node.addChild(substring, wholeWord);
        return;
      }
    });
    // If the orginal word is in the right location create new node for the curren word
    if (this.wordSubstring == undefined || this.wordSubstring == '') {
      let newNode: MyNode = new MyNode(substringLetter, this.layer + 1);
      newNode.addChild(substring, wholeWord);
      this.children.push(newNode);
      return;
    }

    let orginalWord: string = this.word as string;
    let orginalWordSubstring: string = this.wordSubstring;
    let orginalLetter: string = orginalWordSubstring.charAt(0);

    // If the orginal letter and the current letter is the same create one node and
    // add both words as children
    if (orginalLetter == substringLetter) {
      let node: MyNode = new MyNode(orginalLetter, this.layer + 1);

      this.children.push(node);
      node.addChild(substring, wholeWord);
      node.addChild(orginalWordSubstring, orginalWord);
      this.word = undefined;
      this.wordSubstring = undefined;
      return;
    }
    // if not create two nodes with each word
    let orginalNode: MyNode = new MyNode(orginalLetter, this.layer + 1);

    orginalNode.addChild(orginalWordSubstring, orginalWord);

    let newNode: MyNode = new MyNode(substringLetter, this.layer + 1);
    newNode.addChild(substring, wholeWord);
    this.children.push(orginalNode);
    this.children.push(newNode);
    this.word = undefined;
    this.wordSubstring = undefined;
  }

  public getWordFromChildren() {
    let resList = new Set<string>();
    if (this.word !== undefined) {
      resList.add(this.word);
      this.finalStrings.forEach(v => resList.add(v));
    }
    this.children.forEach(node => {
      node.getWordFromChildren().forEach(v => {
        resList.add(v);
      });
    });
    return resList;
  }

  public find(substring: string, orginalSubstring: string) {
    // removes the first letter and checks if string is not empty
    let tempString: string = substring.substring(1);

    let resList = new Set<string>();

    if (tempString == '') {
      return this.getWordFromChildren();
    }

    if (this.children.length == 0) {
      const word = this.word as string;
      if (word.includes(orginalSubstring)) {
        resList.add(this.word as string);
      }
      this.finalStrings.forEach(finalString => {
        if (finalString.includes(finalString)) {
          resList.add(finalString);
        }
      });
      return resList;
    }

    // saves the first letter
    let letter: string = tempString.charAt(0);

    // iterate our children list and checks if we can find a child with the given
    // letter and then call that childs find method recursively
    this.children.forEach(node => {
      if (node.getLetter() == letter) {
        return node.find(tempString, orginalSubstring);
      }
    });
  }
  /**
   * @return List<Node>
   */
  public getChildren(): Array<MyNode> {
    return this.children;
  }

  public getLetter(): string {
    return this.letter;
  }
}
