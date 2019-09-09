import React from "react";

import { SuccessIcon } from "./icons/Success";
import { QueuedIcon } from "./icons/Queued";
import { CanceledIcon } from "./icons/Canceled";
import { RunningIcon } from "./icons/Running";
import { FailedIcon } from "./icons/Failed";
import { Status } from "../utils/api";

const statusToIcon: { [key in Status]: React.FC<{ title: string }> } = {
  succeeded: SuccessIcon,
  queued: QueuedIcon,
  canceled: CanceledIcon,
  running: RunningIcon,
  failed: FailedIcon
};

const statusToLabel: { [key in Status]: string } = {
  succeeded: "Succeeded",
  queued: "Queued",
  canceled: "Canceled",
  running: "Running",
  failed: "Failed"
};

interface Props {
  status: Status;
  style?: React.CSSProperties;
}

export const StatusIcon: React.FC<Props> = ({ status, ...props }) => {
  const Icon = statusToIcon[status];

  return <Icon title={statusToLabel[status]} {...props} />;
};
