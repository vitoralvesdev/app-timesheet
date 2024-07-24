import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const HistorySvg = (props) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      fill="#9CA4AB"
      fillRule="evenodd"
      d="M6.121 16.562a.75.75 0 0 1-.75-.75v-6.86a.75.75 0 0 1 1.5 0v6.86a.75.75 0 0 1-.75.75ZM10.788 16.561a.75.75 0 0 1-.75-.75V5.668a.75.75 0 0 1 1.5 0v10.143a.75.75 0 0 1-.75.75ZM15.378 16.561a.75.75 0 0 1-.75-.75v-3.234a.75.75 0 0 1 1.5 0v3.234a.75.75 0 0 1-.75.75Z"
      clipRule="evenodd"
    />
    <Path
      fill="#9CA4AB"
      fillRule="evenodd"
      d="M6.064 1.5C3.292 1.5 1.5 3.397 1.5 6.335v8.83C1.5 18.103 3.292 20 6.064 20h9.372C18.209 20 20 18.103 20 15.165v-8.83C20 3.397 18.209 1.5 15.436 1.5H6.064Zm9.372 20H6.064C2.437 21.5 0 18.954 0 15.165v-8.83C0 2.546 2.437 0 6.064 0h9.372C19.063 0 21.5 2.546 21.5 6.335v8.83c0 3.789-2.437 6.335-6.064 6.335Z"
      clipRule="evenodd"
    />
  </Svg>
);
