import { Readable } from "node:stream";

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
      }, 10);
    }
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundreadStream(),
  duplex: "half", // adicione essa linha
})
  .then((res) => {
    return res.text();
  })
  .then((data) => {
    console.log(data);
  });
