import React from "react";

export const CollapseIcon: React.FC<{
  style?: React.CSSProperties;
}> = props => (
  <svg width={9} height={6} fill="none" style={props.style}>
    <path d="M4.5 6L0 0h9L4.5 6z" fill="#fff" />
  </svg>
);
