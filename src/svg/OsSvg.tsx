import * as React from "react"
import Svg, { Path } from "react-native-svg"

const OsSvg = (props) => (
    <Svg
        width={22}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            stroke="#9CA4AB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.639 12.396H16.59a2.693 2.693 0 0 1-2.693-2.692 2.693 2.693 0 0 1 2.693-2.69h4.048M17.049 9.643h-.312"
        />
        <Path
            stroke="#9CA4AB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.748 1h8.643a5.248 5.248 0 0 1 5.248 5.248v7.177a5.248 5.248 0 0 1-5.248 5.247H6.748A5.248 5.248 0 0 1 1.5 13.425V6.248A5.248 5.248 0 0 1 6.748 1Z"
            clipRule="evenodd"
        />
        <Path
            stroke="#9CA4AB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.036 5.538h5.399"
        />
    </Svg>
)
export default OsSvg
