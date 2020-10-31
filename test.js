require('dotenv').config();
require('rootpath')();

const { getPostById } = require('./tests/bd')

// Argv: test cmd params
// for (let j = 0; j < process.argv.length; j++) {
//   console.log(j + ' -> ' + (process.argv[j]));
// }
if (process.argv.length > 2) {
  if (process.argv[2] === 'db' && process.argv.length == 5) { // all with db are fixd length?
    if (process.argv[3] === 'getPostById') {
      console.log('Wait 3 seconds...')
      setTimeout(async () => {
        console.log(`post with id ${process.argv[3]}`, await getPostById(parseInt(process.argv[4])))
      }, 3000);
    }
  }
}
