import * as React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

export const BackgroundCircleLoginSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={375}
    height={473}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      fillOpacity={0.9}
      d="M-183.555-230.548c101.424-101.424 265.864-101.424 367.287 0 101.423 101.423 101.423 265.863 0 367.286-101.423 101.424-265.863 101.424-367.287 0-101.423-101.423-101.423-265.863 0-367.286Zm334.224 334.224c83.164-83.164 83.164-217.998 0-301.162-83.163-83.163-217.998-83.163-301.161 0-83.163 83.164-83.163 217.998 0 301.162 83.163 83.163 217.998 83.163 301.161 0Z"
      opacity={0.15}
    />
    <Path
      fill="url(#b)"
      fillOpacity={0.9}
      d="M242.671-255.443c133.961 133.961 133.961 351.154 0 485.114-133.96 133.961-351.153 133.961-485.114 0-133.96-133.96-133.96-351.153 0-485.114 133.961-133.96 351.154-133.96 485.114 0Zm-441.444 441.445c109.842 109.842 287.932 109.842 397.775 0 109.842-109.843 109.842-287.933 0-397.775-109.843-109.843-287.933-109.843-397.775-.001-109.843 109.843-109.843 287.933 0 397.776Z"
      opacity={0.15}
    />
    <Circle
      cx={0.114}
      cy={-12.886}
      r={176.226}
      fill="url(#c)"
      fillOpacity={0.9}
      opacity={0.15}
      transform="rotate(-45 .114 -12.886)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={-183.554}
        x2={183.733}
        y1={205.738}
        y2={-161.549}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#57435C" />
        <Stop offset={0.498} stopColor="#57435C" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#57435C" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={-352}
        x2={384.5}
        y1={-47}
        y2={-13}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#57435C" stopOpacity={0} />
        <Stop offset={0.498} stopColor="#57435C" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#57435C" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={0.114}
        x2={0.114}
        y1={-189.111}
        y2={163.34}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#57435C" stopOpacity={0} />
        <Stop offset={0.498} stopColor="#57435C" stopOpacity={0.8} />
        <Stop offset={1} stopColor="#57435C" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
