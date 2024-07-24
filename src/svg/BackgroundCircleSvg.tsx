import * as React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  G,
  LinearGradient,
  Stop,
} from "react-native-svg";

export const BackgroundCircleSvg = (props) => (
  <Svg width={375} height={812} fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillOpacity={0.9}
      d="M-297.554-32.549c101.423-101.423 265.863-101.423 367.287 0 101.423 101.424 101.423 265.864 0 367.287-101.424 101.423-265.864 101.423-367.287 0-101.424-101.423-101.424-265.863 0-367.287ZM36.67 301.675c83.163-83.163 83.163-217.998 0-301.161-83.163-83.163-217.998-83.163-301.161 0-83.164 83.163-83.164 217.998 0 301.161 83.163 83.164 217.998 83.164 301.16 0Z"
      opacity={0.15}
    />
    <Path
      fill="url(#b)"
      fillOpacity={0.9}
      d="M128.671-91.443c133.96 133.96 133.96 351.154 0 485.114-133.96 133.961-351.154 133.961-485.114 0-133.961-133.961-133.961-351.153 0-485.114 133.961-133.96 351.153-133.96 485.114 0Zm-441.445 441.445c109.843 109.842 287.933 109.842 397.775 0 109.843-109.843 109.843-287.933 0-397.776-109.842-109.842-287.932-109.842-397.775 0-109.842 109.843-109.842 287.933 0 397.776Z"
      opacity={0.15}
    />
    <Circle
      cx={-113.886}
      cy={151.114}
      r={176.226}
      fill="url(#c)"
      fillOpacity={0.9}
      opacity={0.15}
      transform="rotate(-45 -113.886 151.114)"
    />
    <G opacity={0.05}>
      <Path
        fill="url(#d)"
        d="M542.768 586.426c123.717 50.423 183.133 191.591 132.71 315.308-50.423 123.716-191.591 183.136-315.308 132.706-123.717-50.419-183.133-191.587-132.71-315.304 50.423-123.717 191.592-183.133 315.308-132.71ZM376.607 994.114c101.443 41.346 217.196-7.374 258.541-108.817s-7.374-217.196-108.817-258.541-217.196 7.374-258.541 108.817 7.374 217.196 108.817 258.541Z"
      />
      <Path
        fill="url(#e)"
        d="M747.332 931.049c-66.599 163.401-253.054 241.881-416.46 175.281-163.406-66.6-241.883-253.052-175.284-416.458 66.599-163.406 253.055-241.883 416.461-175.284 163.405 66.599 241.882 253.055 175.283 416.461ZM208.856 711.583c-54.608 133.986 9.74 286.873 143.726 341.477 133.987 54.61 286.873-9.74 341.482-143.722 54.609-133.986-9.74-286.873-143.726-341.482-133.986-54.608-286.873 9.74-341.482 143.727Z"
      />
      <Circle
        cx={451.46}
        cy={810.461}
        r={164.14}
        fill="url(#f)"
        transform="rotate(22.174 451.46 810.461)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="a"
        x1={-297.554}
        x2={69.733}
        y1={334.738}
        y2={-32.549}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0} />
        <Stop offset={0.498} stopColor="#fff" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={-466}
        x2={270.5}
        y1={117}
        y2={151}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0} />
        <Stop offset={0.498} stopColor="#fff" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={-113.886}
        x2={-113.886}
        y1={-25.111}
        y2={327.34}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0} />
        <Stop offset={0.498} stopColor="#fff" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={227.46}
        x2={675.478}
        y1={719.136}
        y2={901.734}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0} />
        <Stop offset={0.498} stopColor="#fff" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={572.049}
        x2={330.872}
        y1={514.588}
        y2={1106.33}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0} />
        <Stop offset={0.498} stopColor="#fff" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={451.46}
        x2={451.46}
        y1={646.32}
        y2={974.601}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0} />
        <Stop offset={0.498} stopColor="#fff" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
