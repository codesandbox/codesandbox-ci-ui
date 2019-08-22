import React from "react";

export const FailedIcon: React.FC<{}> = props => (
  <svg width={16} height={16} fill="none" {...props}>
    <circle cx={8} cy={8} r={8} fill="#E1270E" />
    <path
      d="M12 4.727L11.273 4 8 7.273 4.727 4 4 4.727 7.273 8 4 11.273l.727.727L8 8.727 11.273 12l.727-.727L8.727 8 12 4.727z"
      fill="#fff"
    />
  </svg>
);
