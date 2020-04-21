import { SuffixTrie } from './SuffixTrie';

function start() {
  const st = new SuffixTrie();

  st.add('Rasmus');
  st.add('Mohammad');
  st.add('Mohammed');

  const array = st.find('r');
  console.log(st);
  console.log(array);
  st.consoleLog();
}

start();
