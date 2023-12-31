import { Swatch } from "./swatchList";
import { HSL } from "./hsl";
import { RGB } from "./rgb";
import { Hex } from "./hex";

type TextEditorProps = {
  curSwatch: Swatch;
  type: string;
  updateCurSwatch: (
    hue: number,
    sat: number,
    lum: number,
    r: number,
    g: number,
    b: number,
    hex: string
  ) => void;
  changeType: (type: string) => void;
};

type ColourTypeProps = {
  type: string;
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

export function TextEditor({
  curSwatch,
  type,
  updateCurSwatch,
  changeType,
}: TextEditorProps) {
  const handleClick = (e: Event) => {
    const type = (e.target as HTMLInputElement).value;
    changeType(type);
  };
  return (
    <div id="textEditor">
      <div>
        <input
          type="radio"
          id="hsl"
          name="colour"
          value="HSL"
          checked={type == "HSL"}
          onClick={handleClick}
        >
          {" "}
        </input>
        HSL
        <input
          type="radio"
          id="rgb"
          name="colour"
          value="RGB"
          checked={type == "RGB"}
          onClick={handleClick}
        >
          {" "}
        </input>
        RGB
        <input
          type="radio"
          id="hex"
          name="colour"
          value="Hex"
          checked={type == "Hex"}
          onClick={handleClick}
        >
          {" "}
        </input>
        Hex
      </div>
      <ColourType
        type={type}
        curSwatch={curSwatch}
        updateCurSwatch={updateCurSwatch}
      ></ColourType>
    </div>
  );
}

function ColourType({ type, curSwatch, updateCurSwatch }: ColourTypeProps) {
  if (type == "HSL") {
    return <HSL curSwatch={curSwatch} updateCurSwatch={updateCurSwatch}></HSL>;
  } else if (type == "RGB") {
    return <RGB curSwatch={curSwatch} updateCurSwatch={updateCurSwatch}></RGB>;
  } else if (type == "Hex") {
    return <Hex curSwatch={curSwatch} updateCurSwatch={updateCurSwatch}></Hex>;
  }
  return <></>;
}
