import { Swatch } from "./swatchList";
import { HSLToHex, HSLToRGB } from "./conversion";

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

export function HSL({ curSwatch, updateCurSwatch }: HSLProps) {
  const handleHueInput = (e: Event) => {
    const newValue = parseInt((e.target as HTMLInputElement).value);
    const rgb = HSLToRGB(newValue, curSwatch.sat, curSwatch.lum);
    const hex = HSLToHex(newValue, curSwatch.sat, curSwatch.lum);
    updateCurSwatch(
      newValue,
      curSwatch.sat,
      curSwatch.lum,
      rgb[0],
      rgb[1],
      rgb[2],
      hex
    );
  };
  const handleSatInput = (e: Event) => {
    const newValue = parseInt((e.target as HTMLInputElement).value);
    const rgb = HSLToRGB(newValue, curSwatch.sat, curSwatch.lum);
    const hex = HSLToHex(newValue, curSwatch.sat, curSwatch.lum);
    updateCurSwatch(
      curSwatch.hue,
      newValue,
      curSwatch.lum,
      rgb[0],
      rgb[1],
      rgb[2],
      hex
    );
  };
  const handleLumInput = (e: Event) => {
    const newValue = parseInt((e.target as HTMLInputElement).value);
    const rgb = HSLToRGB(newValue, curSwatch.sat, curSwatch.lum);
    const hex = HSLToHex(newValue, curSwatch.sat, curSwatch.lum);
    updateCurSwatch(
      curSwatch.hue,
      curSwatch.sat,
      newValue,
      rgb[0],
      rgb[1],
      rgb[2],
      hex
    );
  };
  return (
    <>
      <div id="hue" class="colourInput">
        Hue
        <input
          class="numberInput"
          id="hueInput"
          type="number"
          min="0"
          max="360"
          width="50px"
          value={Math.round(curSwatch.hue)}
          onInput={handleHueInput}
        >
          {" "}
        </input>
        <input
          class="rangeInput"
          id="hueRangeInput"
          type="range"
          min="0"
          max="360"
          width="20px"
          value={Math.round(curSwatch.hue)}
          onInput={handleHueInput}
        >
          {" "}
        </input>
      </div>
      <div id="sat" class="colourInput">
        Sat
        <input
          class="numberInput"
          id="satInput"
          type="number"
          min="0"
          max="100"
          width="50px"
          value={Math.round(curSwatch.sat)}
          onInput={handleSatInput}
        >
          {" "}
        </input>
        <input
          class="rangeInput"
          id="satRangeInput"
          type="range"
          min="0"
          max="100"
          width="20px"
          value={Math.round(curSwatch.sat)}
          onInput={handleSatInput}
        >
          {" "}
        </input>
      </div>
      <div id="lum" class="colourInput">
        Lum
        <input
          class="numberInput"
          id="lumInput"
          type="number"
          min="0"
          max="100"
          width="50px"
          value={Math.round(curSwatch.lum)}
          onInput={handleLumInput}
        >
          {" "}
        </input>
        <input
          class="rangeInput"
          id="lumRangeInput"
          type="range"
          min="0"
          max="100"
          width="20px"
          value={Math.round(curSwatch.lum)}
          onInput={handleLumInput}
        >
          {" "}
        </input>
      </div>
    </>
  );
}
