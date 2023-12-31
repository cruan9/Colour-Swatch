import { useState } from "preact/hooks";
import { Swatch } from "./swatchList";
import { HexToHSL, HexToRGB } from "./conversion";

type HSLProps = {
  curSwatch: Swatch;
  updateCurSwatch: (
    hue: number,
    sat: number,
    lum: number,
    r: number,
    g: number,
    b: number,
    hex: string
  ) => void;
};

export function Hex({ curSwatch, updateCurSwatch }: HSLProps) {
  const [invalidHex, setInvalidHex] = useState(false);
  const [lastValidHex, setLastValidHex] = useState(curSwatch.hex);
  const handleInput = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(newValue);
    console.log(
      newValue + " " + result + " " + (e.target as HTMLInputElement).value
    );
    if (!result) {
      if (!invalidHex) setLastValidHex(curSwatch.hex);
      setInvalidHex(true);
      updateCurSwatch(
        curSwatch.hue,
        curSwatch.sat,
        curSwatch.lum,
        curSwatch.r,
        curSwatch.g,
        curSwatch.b,
        newValue
      );
    } else {
      setLastValidHex(newValue);
      setInvalidHex(false);
      const hsl = HexToHSL(newValue);
      const rgb = HexToRGB(newValue);
      updateCurSwatch(hsl.h, hsl.s, hsl.l, rgb.r, rgb.g, rgb.b, newValue);
    }
  };
  const onChange = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(newValue);
    if (!result)
      updateCurSwatch(
        curSwatch.hue,
        curSwatch.sat,
        curSwatch.lum,
        curSwatch.r,
        curSwatch.g,
        curSwatch.b,
        lastValidHex
      );
    setInvalidHex(false);
  };
  return (
    <>
      <input
        id="hexInput"
        type="text"
        onInput={handleInput}
        value={curSwatch.hex}
        onChange={onChange}
      ></input>
      {invalidHex ? (
        <p style={{ color: "red", margin: "10px" }}>
          {" "}
          Invalid: must be valid hex colour
        </p>
      ) : (
        <></>
      )}
    </>
  );
}
