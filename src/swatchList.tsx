export class Swatch {
  constructor(
    public hue: number,
    public sat: number,
    public lum: number,
    public r: number,
    public g: number,
    public b: number,
    public hex: string
  ) {}
}
type SwatchListProps = {
  selectedSwatch: number;
  swatchList: Swatch[];
  notify: (swatchNum: number) => void;
};
export function SwatchList({
  selectedSwatch,
  swatchList,
  notify,
}: SwatchListProps) {
  return (
    <div id="swatchList">
      {swatchList.map((s, i) =>
        selectedSwatch == i ? (
          <div
            class="swatchSelected"
            id={`swatch${i}`}
            style={{ background: `hsl(${s.hue},${s.sat}%,${s.lum}%)` }}
            onClick={() => {
              notify(i);
            }}
          ></div>
        ) : (
          <div
            class="swatch"
            id={`swatch${i}`}
            style={{ background: `hsl(${s.hue},${s.sat}%,${s.lum}%)` }}
            onClick={() => {
              notify(i);
            }}
          ></div>
        )
      )}
    </div>
  );
}
