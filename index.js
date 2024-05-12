const Blockchain = require("./src/blockchain");
const Block = require("./src/block");

async function run() {
  const blockchain = await new Blockchain();
  
  const block1 = new Block(  "321", "c", "aaa@gmail.com", "+502 88888988");
  await blockchain.addBlock(block1);

  blockchain.print();
}

run();
