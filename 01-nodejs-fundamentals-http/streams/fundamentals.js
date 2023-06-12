/*
No node toda porta de entrada e saida é uma stream

stream é a tecnologia de enviar arquivos e receber informação aos poucos
*/

//  process.stdin.pipe(process.stdout);
import { Readable, Transform, Writable, Duplex } from "node:stream";

/* 
  Duplex -> Faz a leitura e escrita
  União das Readable e Writable
*/

class OneToHundreadStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      setTimeout(() => {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }, 1000);
    }
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundreadStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
