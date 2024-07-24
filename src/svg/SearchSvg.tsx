import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const SearchSvg = (props) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fill="#9CA4AB"
      d="m17.71 16.29-3.4-3.39A7.92 7.92 0 0 0 16 8a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095ZM2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8Z"
    />
  </Svg>
);
