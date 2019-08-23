import React from "react";

export const CollapseIcon: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = props => (
  <svg
    width={9}
    height={6}
    fill="none"
    className={props.className}
    style={props.style}
  >
    <path d="M4.5 6L0 0h9L4.5 6z" fill="#fff" />
  </svg>
);
