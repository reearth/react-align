import { useState, useEffect } from "react";

const getElementDimensions = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return { width: 0 };
  return { width: element.offsetWidth };
};

export default () => {
  const ElementSize = (id: string) => {
    const [elementDimensions, setElementDimensions] = useState(getElementDimensions(id));
    useEffect(() => {
      function handleResize() {
        setElementDimensions(getElementDimensions(id));
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [id]);

    return elementDimensions;
  };

  const CalculateColumns = (cols?: number, colSize?: number, id?: string) => {
    if (cols) return cols;
    if (!colSize || !id) return;

    const { width } = ElementSize(id);
    console.log(id);
    console.log(width);

    return Math.round(width / colSize);
  };

  return { CalculateColumns };
};
