import { useCallback, useState } from "react";
import { GridWrapper, GridSection, GridArea, GridItem } from "react-align";

function App() {
  const [edit, setEdit] = useState(false);
  const handleReorder = useCallback((id: string, originalLocation: number, currentIndex: number, hoverIndex: number) => {
    console.log('reorder', id, originalLocation, currentIndex, hoverIndex);
  }, []);
  const handleMoveArea = useCallback((id: string, dropLocation: number, originalLocation: number) => {
    console.log('moveArea', id, dropLocation, originalLocation);
  }, []);
  const handleExtend = useCallback((id: string, extended: boolean) => {
    console.log('extended', id, extended);
  }, []);

  return (
    <GridWrapper enabled={edit}>
      <GridSection>
        <GridArea location={1} editorStyles={{ background: "red" }}>
          <GridItem id="a" location={1} index={0} onReorder={handleReorder} onMoveArea={handleMoveArea} onExtend={handleExtend}>
            <div style={{ width: "200px", height: "50px", border: "1px solid green", background: "#fff" }}>a</div>
          </GridItem>
          <GridItem id="b" location={1} index={1} onReorder={handleReorder} onMoveArea={handleMoveArea} onExtend={handleExtend}>
            <div style={{ width: "200px", height: "50px", border: "1px solid green", background: "#fff" }}>b</div>
          </GridItem>
        </GridArea>
        <GridArea location={2} vertical stretch editorStyles={{ background: "blue" }} />
        <GridArea location={3} end editorStyles={{ background: "red" }} />
      </GridSection>
      <GridSection stretch>
        <GridArea location={4} editorStyles={{ background: "red" }} />
        <div style={{ flex: "auto" }}>
          <p><button onClick={() => setEdit(e => !e)}>{edit ? "Finish" : "Start"} editing</button></p>
        </div>
        <GridArea location={6} end  editorStyles={{ background: "red" }}/>
      </GridSection>
      <GridSection>
        <GridArea location={7} reverse end editorStyles={{ background: "red" }} />
        <GridArea location={8} end vertical stretch editorStyles={{ background: "blue" }} />
        <GridArea location={9} reverse end editorStyles={{ background: "red" }} />
      </GridSection>
    </GridWrapper>
  )
}

export default App
