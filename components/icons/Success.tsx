import React from "react";

export const SuccessIcon: React.FC<{}> = props => (
  <svg width={16} height={16} fill="none" {...props}>
    <circle cx={8} cy={8} r={8} fill="#5BC266" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.104 9.857L11.96 5 13 6.102 7.104 12 3 7.894l1.04-1.101 3.064 3.064z"
      fill="#fff"
    />
  </svg>
);
