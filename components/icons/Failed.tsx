import React from "react";

export const FailedIcon: React.FC<{}> = props => (
  <svg width={16} height={16} fill="none" {...props}>
    <circle cx={8} cy={8} r={8} fill="#E1270E" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 3a5 5 0 110 10A5 5 0 018 3zm0 1a4 4 0 013.16 6.453L5.547 4.84A3.983 3.983 0 018 4zM4.84 5.547l5.613 5.613A4 4 0 014.84 5.547z"
      fill="#fff"
    />
  </svg>
);
