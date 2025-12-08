import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import GridWrapper from "../src/GridWrapper";
import GridSection from "../src/GridSection";
import GridArea from "../src/GridArea";
import GridItem from "../src/GridItem";

describe("GridWrapper", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <GridWrapper>
        <GridSection>
          <GridArea id="area1">
            <GridItem id="item1" index={0}>
              <div>Test Item</div>
            </GridItem>
          </GridArea>
        </GridSection>
      </GridWrapper>
    );

    // Verify the basic structure is rendered
    const wrapper = container.querySelector(".reactalign.wrapper");
    expect(wrapper).toBeInTheDocument();

    const section = container.querySelector(".section");
    expect(section).toBeInTheDocument();
  });

  it("should apply vertical class when vertical prop is true", () => {
    const { container } = render(
      <GridWrapper vertical>
        <GridSection>
          <GridArea id="area1">
            <GridItem id="item1" index={0}>
              <div>Test</div>
            </GridItem>
          </GridArea>
        </GridSection>
      </GridWrapper>
    );

    const wrapper = container.querySelector(".reactalign.wrapper");
    expect(wrapper).toHaveClass("vertical");
  });

  it("should apply stretch class when stretch prop is true", () => {
    const { container } = render(
      <GridWrapper stretch>
        <GridSection>
          <GridArea id="area1">
            <GridItem id="item1" index={0}>
              <div>Test</div>
            </GridItem>
          </GridArea>
        </GridSection>
      </GridWrapper>
    );

    const wrapper = container.querySelector(".reactalign.wrapper");
    expect(wrapper).toHaveClass("stretch");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <GridWrapper className="custom-class">
        <GridSection>
          <GridArea id="area1">
            <GridItem id="item1" index={0}>
              <div>Test</div>
            </GridItem>
          </GridArea>
        </GridSection>
      </GridWrapper>
    );

    const wrapper = container.querySelector(".reactalign.wrapper");
    expect(wrapper).toHaveClass("custom-class");
  });

  it("should accept multiple callback props", () => {
    const onMove = vi.fn();
    const onAlignChange = vi.fn();
    const onExtend = vi.fn();

    const { container } = render(
      <GridWrapper
        onMove={onMove}
        onAlignChange={onAlignChange}
        onExtend={onExtend}
      >
        <GridSection>
          <GridArea id="area1">
            <GridItem id="item1" index={0}>
              <div>Test</div>
            </GridItem>
          </GridArea>
        </GridSection>
      </GridWrapper>
    );

    // Verify component renders successfully with callbacks
    expect(container.querySelector(".reactalign.wrapper")).toBeInTheDocument();

    // Callbacks are passed through but not called on render
    expect(onMove).not.toHaveBeenCalled();
    expect(onAlignChange).not.toHaveBeenCalled();
    expect(onExtend).not.toHaveBeenCalled();
  });

  it("should apply custom styles when provided", () => {
    const customStyle = { backgroundColor: "red", padding: "20px" };

    const { container } = render(
      <GridWrapper style={customStyle}>
        <GridSection>
          <GridArea id="area1">
            <GridItem id="item1" index={0}>
              <div>Test</div>
            </GridItem>
          </GridArea>
        </GridSection>
      </GridWrapper>
    );

    const wrapper = container.querySelector(".reactalign.wrapper") as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.style.backgroundColor).toBe("red");
    expect(wrapper.style.padding).toBe("20px");
  });
});
