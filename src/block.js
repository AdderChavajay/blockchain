const SHA256 = require("crypto-js/sha256");
const hex2ascii = require("hex2ascii");

class Block {
  constructor(carnet, nombre, correo, telefono) {
    this.hash = null;
    this.height = 0;
    // this.body = Buffer.from(JSON.stringify(data).toString("hex"));
    this.carnet = Buffer.from(JSON.stringify(carnet).toString("hex"));
    this.nombre = Buffer.from(JSON.stringify(nombre).toString("hex"));
    this.correo = Buffer.from(JSON.stringify(correo).toString("hex"));
    this.telefono = Buffer.from(JSON.stringify(telefono).toString("hex"));
    this.time = 0;
    this.previousBlockHash = null;
  }

  validate() {
    const self = this;
    return new Promise((resolve, reject) => {
      let currentHash = self.hash;

      self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString();

      if (currentHash !== self.hash) {
        return resolve(false);
      }

      resolve(true);
    });
  }

  getBlockData() {
    const self = this;
    return new Promise((resolve, reject) => {
      // let encodedData = self.body;
      let carnet = self.carnet;
      let nombre = self.nombre;
      let correo = self.correo;
      let telefono = self.telefono; 
      let decodedData = hex2ascii(carnet, nombre, correo, telefono);
      let dataObject = JSON.parse(decodedData);

      if (dataObject === "Bloque") {
        reject(new Error("Este es un bloke"));
      }

      resolve(dataObject);
    });
  }

  toString() {
    const { hash, height, carnet, nombre, correo, telefono, time, previousBlockHash } = this;
    return `nodo -
        hash: ${hash}
        height: ${height}
        carnet: ${carnet}
        nombre: ${nombre}
        correo: ${correo}
        telefono: ${telefono}
        tiempo: ${time}
        BlockHash: ${previousBlockHash}
        ------------------------------------- \n`
        +
        `nodo -
        hash: ${hash}
        height: ${height}
        carnet: ${carnet}
        nombre: ${nombre}
        correo: ${correo}
        telefono: ${telefono}
        tiempo: ${time}
        BlockHash: ${previousBlockHash}
        -------------------------------------`;
  }
}

module.exports = Block;
