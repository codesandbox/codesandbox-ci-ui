import React from 'react';
import { colors } from '../../theme/colors';

export const RunningIcon: React.FC<{ title: string }> = props => (
  <svg width={16} height={16} fill="none" {...props}>
    <title>{props.title}</title>
    <circle cx={8} cy={8} r={8} fill={colors.white} />
    <path
      d="M11.459 7.882a.442.442 0 01-.023.735l-4.76 2.963A.442.442 0 016 11.204V4.857c0-.36.405-.569.698-.36l4.761 3.385z"
      fill={colors.gray}
    />
  </svg>
);
