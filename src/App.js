import * as React from "react";
import QRCode from "qrcode.react";

const icon = require("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEU7V53///8yUZrf5O8jR5aDkr45VZwrTJhFYaTY3eo1U5tqfbNOZqb4+vzJ0ONkebCtuNSJmMFBXaDq7fS7w9t8jbuNnMKksM/l6fLb4OzS1+fGzeC9xdyzvNegrM2TocZbcatwg7Xw8/hUa6kfRZUGOpHhj9NWAAAEF0lEQVR4nO3d6XKbMBSGYSGIJOQYMLbxltRL0vu/xXqJm3baYAER50jzvX8yk5kQnjG7AIvko6IpaxFLdTkr7jBx+1GZTFpFPWPflrIyM9UfwrTU8ejuKV2md2FuJPXseEma/CZMIwUKYU16FZaxAs+fYnkRVpp6Pjymq7PQxLeR+UyZRGwz6rnwWlaIJt618JJsRGmpZ8JrthR1zKvheUWM51AUIYQQQgghhBBCCPnt80KZUpFdNFNWaq3l74ud6vyLy28uSSlt2F51ppjJbLUo8nT+0TpNN/m22L28rn7sZ8vJ4VnoQIc9ldbPs0U6TdqbTk/rraGe2R5JfVilD3CfyufQPkSlbePMC1CotFk9WjZDFipZd/QFJlT6ad3RF5ZQml1nX1BCfTz1AIYjVNm+jy8gYVb1AwYj1C89gaEI9WtfYCBCveoNDEOoZ/2BQQjtoetxTGhC2f1AJiyh7rufCEVoD4OAAQj1JnKhfBoGZC9Utsv5fIjCwR8hd6GS28iFcjIUyF044Ig7DKGq55EL5XIwkLlQL2IXqkHH3AEI1cBD0luchbLbme9pnW+Lf9pxHnvqsBrOF8u32t5HR/+KWtGWdD2t2CyvI8GMF8evcrvIPW20DBB3zr65ASeBDmSfhUcn4ZH1mtaa26a0CvjRQafrwNMQty/3nHYWr+Euo0JkLgOik5Cf/swczu9P1DM5qCx/LMxDXkhF5nBI8xK20OFC4ip64T7kDY2TcBa98AlC1kEIIf8ghJB/EELIPwgh5B+EEPIPQgj5F4dQtfTuJGybAodHu01L0uVqYusULtEa7fBbDx+1ob0oPoJwF72Q+BXIIwiJBzZGEB6jF77RviHYv3BK6htDOCceQfUvzInvJ/Iv3EUvpB7n9y+kHgX3L5wQv07ev5D6Nnbvwin1+aF34Zr6hiLvwm30wkX0wh/RC5fUl+K8C8m/XcW7kHp36F1If4+0b+GG/Gkh38KCelPqXUj/MIZv4T56Ifnu0LuQfHfoW8jgMW7Pwjm1z7swJ98d+hYSj6xdUmWaf93W4TVt65a/33B4oEb97wH6ez8dRrmX7y0TYABsz+1OBeq5HFIcd5u0BSGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8ghJB/EELIPwgh5B+EEPIPQgg7VNO8ImQsoaoF0at6xhLaUjQ0C/tYQtmILc0ro8cSZoVIaL7oYyShMokg+pKIkYS6OguTkmJNHEcoy+QiTA3B5nQUoTXpVZjkZvxPcQyhNHlyEyZpqcfe3PgXKl1e/4e4TawyWtoxlX6FykptqttUxH1yRVPW30l4kF9hXTbFfSq/AEUxTy1Jf882AAAAAElFTkSuQmCC");

export default function QrCode() {
  const qrRef = React.useRef();
  const [url, setUrl] = React.useState("");

  const downloadQRCode = (evt: React.FormEvent) => {
    evt.preventDefault();
    // @ts-ignore
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const qrCode = (
    <QRCode
      id="qrCodeElToRender"
      size={500}
      value={url}
      bgColor="white"
      fgColor="#141926"
      level="H"
      imageSettings={{
        src: icon,
        excavate: true,
        width: 500 * 0.1,
        height: 500 * 0.1,
      }}
    />
  );

  return (
    <div className="qr-container">
      <form onSubmit={downloadQRCode} className="qr-container__form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />

        <button type="submit">Download QR Code</button>
      </form>

      <div className="qr-container__qr-code" ref={qrRef}>
        {qrCode}
      </div>
    </div>
  );
}
