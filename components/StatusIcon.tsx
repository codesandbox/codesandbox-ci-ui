import React from "react";

import { SuccessIcon } from "./icons/Success";
import { QueuedIcon } from "./icons/Queued";
import { CanceledIcon } from "./icons/Canceled";
import { RunningIcon } from "./icons/Running";
import { FailedIcon } from "./icons/Failed";
import { Status } from "../utils/api";

const statusToIcon: { [key in Status]: React.FC } = {
  succeeded: SuccessIcon,
  queued: QueuedIcon,
  canceled: CanceledIcon,
  running: RunningIcon,
  failed: FailedIcon
};

interface Props {
  status: Status;
  style?: React.CSSProperties;
}

export const StatusIcon: React.FC<Props> = ({ status, ...props }) => {
  const Icon = statusToIcon[status];

  return <Icon {...props} />;
};
