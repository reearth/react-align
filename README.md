# Re:Align

A highly customizable and powerful drag 'n drop align system for React.

- Build your own alignment grid as simple or complex as you need
- Built-in, *opt-in* **Editor Mode** through React's context API
- Customizable features and styles to integrate into your app effectively
- Fully written in TypeScript

<img width="1281" alt="Screen Shot 2021-06-24 at 18 42 01" src="https://user-images.githubusercontent.com/34051327/123241401-17cc5600-d51c-11eb-8388-4c0ab8c562aa.png">

## Basic use
```tsx
<div style={{ width: "100vw", height: "100vh" }}> 
// element containing GridWrapper needs to set the width and height
    <GridWrapper>
        <GridSection>
            <GridArea location={{ section: "left", area: "top" }}>
                <GridItem
                    id="1234"
                    index={1}
                    minH={100}
                    maxH={150}
                    minW={100}
                    maxW={150}
                    onReorder={YourReorderCallbackFunction}
                    onMoveArea={YourMoveAreaCallback}>
                ...your component
                </GridItem>
            </GridArea>
        </GridSection>
    </GridWrapper>
</div>
```
All props used in the example above are **mandatory**. 

Location is based on a section/area combo that allows for unique grid layouts. The drag n drop will recognize the GridAreas based on your own desired naming convention that makes sense with your layout.

GridItem's id, index, onReorder and onMoveArea are necessary for the drag n drop as well. The id and index are presumed to be needed in your onMoveArea and OnReorder callback functions, respectively, as a way to manipulate your unique data. Types necessary for the callbacks are:

```tsx
    type onReorder: (
        originalLocation?: { section: string, area: string },
        currentIndex?: number,
        hoverIndex?: number
    ) => void;
    onMoveArea: (
        currentItem?: string,
        dropLocation?: { section: string, area: string},
        originalLocation?: { section: string, area: string}
    ) => void;
```

Finally, the min/max for width and height is expected to set the GridItem container that will dynamically shrink when space is limited or if you choose to allow your GridItems to extend.

## Editor mode
Re:Align comes with a context provider and more that allows for a toggleable Editor Mode that enables and disables the editing functionality of Re:Align. 

<img width="854" alt="Screen Shot 2021-06-24 at 18 15 51" src="https://user-images.githubusercontent.com/34051327/123240889-ad1b1a80-d51b-11eb-9a7d-8f9e75a9b9e0.png">

The general idea of use is to wrap the part of your app you want aligned as well as any components like a toggle button in the EditorModeContextProvider component so that they can all access the same context.

Something like this:
```tsx
<EditorModeContextProvider>
    <Button>Editor Mode Toggle</Button>
    <GridWrapper>
        ...
    </GridWrapper>
</EditorModeContextProvider>
```
Then, inside the Button you have two ways to manipulate the context. First is through the ContextConsumer HOC that injects the context into your component. This approach adds it as a prop and keeps everything tidy. Or you can use the useContext function that you can pull the context out through destructuring and use within a component however you like.

```tsx
const ButtonWrapper = () => {
    const ContextedButton = ContextConsumer(Button);
    return (
        <ContextedButton />
    );
};
```
(If you want to use your own method, pass *draggable* into GridItem and *droppable* into GridArea to enable drag 'n drop functionality directly)

Enjoy!

## License

[MIT License](LICENSE)
