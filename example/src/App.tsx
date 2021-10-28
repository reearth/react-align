import { useState } from "react";
import { GridWrapper, GridSection, GridArea, GridItem, Alignment } from "react-align/src/index";

type Item = { id: string, location: string, index: number, extended: boolean; extendable: boolean; };

const initItems: Item[] = [
  { id: "A", location: "1", index: 0, extended: false, extendable: false },
  { id: "B", location: "1", index: 1, extended: false, extendable: false },
  { id: "C", location: "2", index: 0, extended: true, extendable: true },
  { id: "D", location: "2", index: 1, extended: false, extendable: false },
];

const initAlignments: Record<string, Alignment> = {
  "1": "start",
  "2": "start",
  "3": "start",
  "4": "start",
  "6": "start",
  "7": "start",
  "8": "start",
  "9": "start",
}

const hoz = (l: string) => l === "4" || l === "6";
const ver = (l: string) => l === "2" || l === "8";
const ItemComponent = (item: Item, i: number) => (
  <GridItem id={item.id} index={i} key={item.id} extendable={item.extendable} extended={item.extended}>
    <div
      style={{
        fontSize: "24px",
        width: item.extended && hoz(item.location) ? "100%" : "200px",
        height: item.extended && ver(item.location) ? "100%" : "50px",
        background: "#ddd",
        padding: "10px",
        boxSizing: "border-box"
      }}>{item.id}</div>
  </GridItem>
)

function App() {
  const [edit, setEdit] = useState(false);
  const [items, setItems] = useState(initItems);
  const [alignments, setAlignments] = useState(initAlignments);

  return (
    <GridWrapper
      editing={edit}
      onMove={(...args) => {
        console.log('move', ...args);
        setItems(items => {
          const target = items.find(i => i.id === args[0]);
          if (!target) return items;
          const sibilings = items.filter(i => i.location === args[1]);
          if (args[1] === args[3]) {
            sibilings.splice(sibilings.findIndex(i => i.id === args[0]), 1);
          }
          sibilings.splice(args[2], 0, target);
          target.location = args[1];
          sibilings.forEach((s, i) => {
            s.index = i;
          });
          return [...items];
        });
      }}
      onAlignChange={(...args) => {
        console.log('alignmentChange', ...args);
        setAlignments(a => ({
          ...a,
          [args[0]]: args[1]
        }));
      }}
      onExtend={(...args) => {
        console.log('extend', ...args);
        setItems(items => {
          const target = items.find(i => i.id === args[0]);
          if (!target) return items;
          target.extended = args[1];
          return [...items];
        });
      }}>
      <GridSection>
        {["1", "2", "3"].map(l => (
          <GridArea
            id={l}
            key={l}
            align={alignments[l]}
            end={l === "3"}
            vertical={l === "2"}
            stretch={l === "2"}
            editorStyle={{ background: l === "2" ? "blue" : "red" }}
            iconColor={l === "2" ? "red" : "blue"}>
            {items.filter(i => i.location === l).sort((a, b) => a.index - b.index).map(ItemComponent)}
          </GridArea>
        ))}
      </GridSection>
      <GridSection stretch>
        {["4", "5", "6"].map(l => l == "5" ? (
          <div
            key={l}
            style={{ flex: "auto" }}>
            <button onClick={() => setEdit(e => !e)}>{edit ? "Finish" : "Start"} editing</button>
          </div>
        ) : (
          <GridArea
            id={l}
            key={l}
            align={alignments[l]}
            end={l === "6"}
            editorStyle={{ background: "red" }}
            iconColor={"blue"}>
            {items.filter(i => i.location === l).sort((a, b) => a.index - b.index).map(ItemComponent)}
          </GridArea>
        ))}
      </GridSection>
      <GridSection>
        {["7", "8", "9"].map(l => (
          <GridArea
            id={l}
            key={l}
            align={alignments[l]}
            end
            vertical={l === "8"}
            stretch={l === "8"}
            editorStyle={{ background: l === "8" ? "blue" : "red" }}
            iconColor={l === "8" ? "red" : "blue"}>
            {items.filter(i => i.location === l).sort((a, b) => a.index - b.index).map(ItemComponent)}
          </GridArea>
        ))}
      </GridSection>
    </GridWrapper>
  )
}

export default App
