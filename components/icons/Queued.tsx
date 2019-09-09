import React from "react";
import { colors } from "../../theme/colors";

export const QueuedIcon: React.FC<{ title: string }> = props => (
  <svg width={16} height={16} fill="none" {...props}>
    <title>{props.title}</title>
    <circle cx={8} cy={8} r={8} fill={colors.gray} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.674 5.349a.441.441 0 00-.442.441V9.1c0 .239.19.433.426.441V6.256c0-.244.198-.441.442-.441h4.667V5.79a.441.441 0 00-.44-.441H5.673z"
      fill={colors.white}
    />
    <rect
      x={6.353}
      y={6.477}
      width={5.647}
      height={4.634}
      rx={0.441}
      fill={colors.white}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.441 4A.441.441 0 004 4.441v3.31c0 .24.19.434.426.442V4.907c0-.243.197-.441.441-.441h4.668v-.025A.441.441 0 009.094 4H4.44z"
      fill={colors.white}
    />
  </svg>
);
