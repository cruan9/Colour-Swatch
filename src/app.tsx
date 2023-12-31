import { useState } from "preact/hooks";
import { Swatch, SwatchList } from "./swatchList";
import { TextEditor } from "./textEditor";
import { HSLToHex, HSLToRGB } from "./conversion";

export function App() {
  const [numSwatches, setNumSwatches] = useState(10);
  const [selectedSwatch, setSelectedSwatch] = useState(0);
  const [type, setType] = useState("HSL");
  const startingSwatches: Swatch[] = [];
  if (startingSwatches.length == 0) {
    for (let i = 0; i < 10; i++) {
      const hue = Math.random() * 360;
      const sat = Math.random() * 100;
      const lum = Math.random() * 100;
      const rgb = HSLToRGB(hue, sat, lum);
      const hex = HSLToHex(hue, sat, lum);
      startingSwatches.push({
        hue: hue,
        sat: sat,
        lum: lum,
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
        hex: hex,
      });
    }
  }
  const [swatchList, setSwatchList] = useState(startingSwatches);

  const changeSwatch = (newSwatch: number) => {
    setSelectedSwatch(newSwatch);
  };

  const getColour = () => {
    return `hsl(${swatchList[selectedSwatch].hue},${swatchList[selectedSwatch].sat}%,${swatchList[selectedSwatch].lum}%)`;
  };

  function updateCurSwatch(
    hue: number,
    sat: number,
    lum: number,
    r: number,
    g: number,
    b: number,
    hex: string
  ) {
    const newSwatchList = [...swatchList];
    newSwatchList[selectedSwatch] = {
      hue: hue,
      sat: sat,
      lum: lum,
      r: r,
      g: g,
      b: b,
      hex: hex,
    };
    setSwatchList(newSwatchList);
  }

  const addSwatch = () => {
    if (numSwatches < 16) {
      const hue = Math.floor(Math.random() * 360);
      const sat = Math.floor(Math.random() * 100);
      const lum = Math.floor(Math.random() * 100);
      const rgb = HSLToRGB(hue, sat, lum);
      const hex = HSLToHex(hue, sat, lum);
      setSwatchList([
        ...swatchList,
        {
          hue: hue,
          sat: sat,
          lum: lum,
          r: rgb[0],
          g: rgb[1],
          b: rgb[2],
          hex: hex,
        },
      ]);
      setNumSwatches(numSwatches + 1);
      setSelectedSwatch(numSwatches);
    }
  };

  const deleteSwatch = () => {
    console.log(selectedSwatch + " " + numSwatches);
    if (numSwatches > 1) {
      if (selectedSwatch == numSwatches - 1) {
        const newSwatchList = [...swatchList];
        newSwatchList.splice(-1);
        setSelectedSwatch(selectedSwatch - 1);
        setNumSwatches(numSwatches - 1);
        setSwatchList(newSwatchList);
      } else {
        const newSwatchList = swatchList.filter((_, i) => {
          return i != selectedSwatch;
        });
        setNumSwatches(numSwatches - 1);
        setSwatchList(newSwatchList);
      }
    }
  };
  const changeType = (type: string) => {
    setType(type);
  };

  return (
    <>
      <div id="toolbar">
        <button
          class="toolbarButton"
          id="addButton"
          onClick={addSwatch}
          disabled={numSwatches >= 16}
        >
          Add
        </button>
        <button
          class="toolbarButton"
          id="deleteButton"
          onClick={deleteSwatch}
          disabled={numSwatches <= 1}
        >
          Delete
        </button>
      </div>
      <div id="container">
        <div id="editor">
          <div id="rectangle" style={{ background: getColour() }}></div>
          <TextEditor
            curSwatch={swatchList[selectedSwatch]}
            type={type}
            updateCurSwatch={updateCurSwatch}
            changeType={changeType}
          ></TextEditor>
        </div>
        <SwatchList
          selectedSwatch={selectedSwatch}
          swatchList={swatchList}
          notify={changeSwatch}
        ></SwatchList>
      </div>
      <div id="footer">
        <div id="status">
          {" "}
          {numSwatches} swatches (selected #{selectedSwatch + 1}){" "}
        </div>
      </div>
    </>
  );
}
