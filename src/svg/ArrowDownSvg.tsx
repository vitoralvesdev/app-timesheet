import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ArrowDownSvg = (props) => (
  <Svg width={12} height={6} fill="none" {...props}>
    <Path
      fill="#1F2C37"
      d="M6 6a.75.75 0 0 1-.48-.173l-4.5-3.75A.75.75 0 1 1 1.98.922L6 4.282l4.02-3.24a.75.75 0 0 1 1.058.113.75.75 0 0 1-.105 1.095l-4.5 3.622A.75.75 0 0 1 6 6Z"
    />
  </Svg>
);
