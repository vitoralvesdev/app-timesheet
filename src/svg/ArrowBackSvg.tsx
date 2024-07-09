import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const ArrowBackSvg = (props) => (
    <Svg
        width={7}
        height={14}
        fill="none"
        {...props}
    >
        <Path
            fill="#1F2C37"
            d="M5.83 14a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1.001 1.001 0 1 1 1.54 1.28L2.29 7l4.32 5.36A1 1 0 0 1 5.83 14Z"
        />
    </Svg>
)