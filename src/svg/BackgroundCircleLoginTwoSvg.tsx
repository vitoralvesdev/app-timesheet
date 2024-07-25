import * as React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  G,
} from "react-native-svg";

export const BackgroundCircleLoginTwoSvg = (props) => (
  <Svg width={375} height={511} fill="none" {...props}>
    <G opacity={0.05}>
      <Path
        fill="url(#a)"
        d="M214.39 195.848c73.838 63.964 81.842 175.676 17.878 249.514C168.303 519.2 56.592 527.205-17.246 463.24c-73.839-63.965-81.843-175.676-17.878-249.514 63.964-73.839 175.675-81.843 249.514-17.878ZM3.605 439.17c60.545 52.448 152.144 45.885 204.592-14.66 52.449-60.544 45.886-152.143-14.659-204.592-60.544-52.448-152.144-45.885-204.592 14.659-52.449 60.545-45.885 152.144 14.66 204.593Z"
      />
      <Path
        fill="url(#b)"
        d="M275.146 482.533c-84.485 97.525-232.034 108.098-329.56 23.613-97.526-84.485-108.098-232.034-23.613-329.56C6.458 79.06 154.007 68.488 251.533 152.973c97.525 84.485 108.098 232.034 23.613 329.56Zm-321.38-278.406c-69.275 79.968-60.606 200.952 19.361 270.227 79.968 69.274 200.952 60.605 270.227-19.362 69.274-79.968 60.605-200.952-19.362-270.227-79.968-69.274-200.952-60.605-270.227 19.362Z"
      />
      <Circle
        cx={98.559}
        cy={329.56}
        r={119.604}
        fill="url(#c)"
        stroke="#57435C"
        strokeWidth={0.843}
        transform="rotate(40.902 98.56 329.56)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="a"
        x1={-35.124}
        x2={232.268}
        y1={213.726}
        y2={445.362}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#57435C" />
        <Stop offset={0.498} stopColor="#57435C" />
        <Stop offset={1} stopColor="#57435C" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={251.533}
        x2={-54.414}
        y1={152.973}
        y2={506.146}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#57435C" />
        <Stop offset={0.498} stopColor="#57435C" />
        <Stop offset={1} stopColor="#57435C" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={98.559}
        x2={98.559}
        y1={209.535}
        y2={449.585}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#57435C" />
        <Stop offset={0.498} stopColor="#57435C" />
        <Stop offset={1} stopColor="#57435C" />
      </LinearGradient>
    </Defs>
  </Svg>
);
