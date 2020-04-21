import { MyNode } from './MyNode';

export class SuffixTrie {
  private nodes = new Array<MyNode>();

  public consoleLog() {
    this.nodes.forEach(node => {
      console.log(node);
    });
  }

  /**
   * @param word Adds a word to our datastructur
   */
  public add(word: string): void {
    // makes word lowercase
    word = word.toLowerCase();

    // makes sure we use all suffixes of the word
    for (let i = 0; i < word.length; i++) {
      // Create a substring for each suffix
      let substring: string = word;
      // if the word is longer then 1 subtract the the first letter
      if (word.length != 1) {
        substring = word.substring(i);
      }
      // Takes the first letter in our substring and saves it in letter
      let letter: string = substring.charAt(0);

      // Iterates each child node and see if we can find the node with the same letter
      // as 'letter'
      // we then call that nodes addChild method
      let found: boolean = false;

      this.nodes.forEach(node => {
        if (node.getLetter() == letter) {
          node.addChild(substring, word);
          found = true;
        }
      });

      // If we cant find that node we create a new node with the given letter
      if (!found) {
        let newNode = new MyNode(letter, 1);
        this.nodes.push(newNode);
        newNode.addChild(substring, word);
      }
    }
  }

  public find(substring: string): Set<MyNode> {
    // We find the first letter and checks if we can find a node with the given
    // letter in out child list
    let rootLetter: string = substring.charAt(0);

    this.nodes.forEach(node => {
      if (node.getLetter() === rootLetter) {
        return node.find(substring, substring);
      }
    });
    return new Set<MyNode>();
  }
}
