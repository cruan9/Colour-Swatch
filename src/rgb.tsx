import { Swatch } from "./swatchList";
import { RGBToHSL, RGBToHex } from "./conversion";

type RGBProps = {
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

export function RGB({ curSwatch, updateCurSwatch }: RGBProps) {
  const handleRInput = (e: Event) => {
    const newValue = parseInt((e.target as HTMLInputElement).value);
    const hsl = RGBToHSL(newValue, curSwatch.g, curSwatch.b);
    const hex = RGBToHex(newValue, curSwatch.g, curSwatch.b);
    updateCurSwatch(
      hsl[0],
      hsl[1],
      hsl[2],
      newValue,
      curSwatch.g,
      curSwatch.b,
      hex
    );
  };
  const handleGInput = (e: Event) => {
    const newValue = parseInt((e.target as HTMLInputElement).value);
    const hsl = RGBToHSL(curSwatch.r, newValue, curSwatch.b);
    const hex = RGBToHex(newValue, curSwatch.g, curSwatch.b);
    updateCurSwatch(
      hsl[0],
      hsl[1],
      hsl[2],
      curSwatch.r,
      newValue,
      curSwatch.b,
      hex
    );
  };
  const handleBInput = (e: Event) => {
    const newValue = parseInt((e.target as HTMLInputElement).value);
    const hsl = RGBToHSL(curSwatch.r, curSwatch.g, newValue);
    const hex = RGBToHex(newValue, curSwatch.g, curSwatch.b);
    updateCurSwatch(
      hsl[0],
      hsl[1],
      hsl[2],
      curSwatch.r,
      curSwatch.g,
      newValue,
      hex
    );
  };
  return (
    <>
      <div class="colourInput">
        R
        <input
          class="numberInput"
          type="number"
          min="0"
          max="255"
          width="50px"
          value={Math.round(curSwatch.r)}
          onInput={handleRInput}
        >
          {" "}
        </input>
        <input
          class="rangeInput"
          type="range"
          min="0"
          max="255"
          width="20px"
          value={Math.round(curSwatch.r)}
          onInput={handleRInput}
        >
          {" "}
        </input>
      </div>
      <div class="colourInput">
        G
        <input
          class="numberInput"
          type="number"
          min="0"
          max="255"
          width="50px"
          value={Math.round(curSwatch.g)}
          onInput={handleGInput}
        >
          {" "}
        </input>
        <input
          class="rangeInput"
          type="range"
          min="0"
          max="255"
          width="20px"
          value={Math.round(curSwatch.g)}
          onInput={handleGInput}
        >
          {" "}
        </input>
      </div>
      <div class="colourInput">
        B
        <input
          class="numberInput"
          type="number"
          min="0"
          max="255"
          width="50px"
          value={Math.round(curSwatch.b)}
          onInput={handleBInput}
        >
          {" "}
        </input>
        <input
          class="rangeInput"
          type="range"
          min="0"
          max="255"
          width="20px"
          value={Math.round(curSwatch.b)}
          onInput={handleBInput}
        >
          {" "}
        </input>
      </div>
    </>
  );
}
