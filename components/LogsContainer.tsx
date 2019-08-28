import React, { useEffect } from "react";
import Ansi from "ansi-to-react";
import { Status } from "../utils/api";
import { colors } from "../theme/colors";
import { secondsToCounter } from "../utils/countdown";
import { BuildInfoItem } from "./BuildInfoItem";
import { CodeBlock } from "./CodeBlock";

interface Props {
  status: Status;
  duration: number;
  log: string;
}

const getStatusInfo = (status: Status, duration: number) => {
  switch (status) {
    case "canceled":
      return {
        message: `Build canceled in ${secondsToCounter(
          Math.floor(duration / 1000)
        )}`,
        backgroundColor: colors.gray,
        color: "white"
      };
    case "succeeded":
      return {
        message: "Finished!",
        backgroundColor: colors.bg3,
        color: "white"
      };
    case "running":
      return {
        message: "Running...",
        backgroundColor: "white",
        color: "black"
      };
    case "failed":
      return {
        message: `Build failed in ${secondsToCounter(
          Math.floor(duration / 1000)
        )}`,
        backgroundColor: "#E1270E",
        color: "white"
      };
    case "queued":
      return { message: "Queued", backgroundColor: "white", color: "black" };
  }
};

export const LogsContainer = ({ status, duration, log }: Props) => {
  const statusInfo = getStatusInfo(status, duration);
  const contentsRef = React.useRef<HTMLDivElement>();

  useEffect(() => {
    if (contentsRef.current) {
      contentsRef.current.scrollTo(0, contentsRef.current.scrollHeight);
    }
  }, [log, contentsRef]);

  return (
    <BuildInfoItem
      title={statusInfo.message}
      headerColor={statusInfo.color}
      headerBGColor={statusInfo.backgroundColor}
      contentsRef={contentsRef}
    >
      <div
        style={{
          height: "23rem",
          position: "relative"
        }}
      >
        <CodeBlock
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        >
          {log
            ? log.split(/(^\+.*\n)/m).map((line, i) =>
                line.startsWith("+") ? (
                  <code key={i} style={{ color: "white", fontWeight: 700 }}>
                    {line}
                  </code>
                ) : (
                  <span key={i} style={{ color: "#ccc", display: "block" }}>
                    <Ansi linkify={false}>{line}</Ansi>
                  </span>
                )
              )
            : status === "queued"
            ? "Waiting to be built..."
            : "Loading..."}

          <br />
        </CodeBlock>
      </div>
    </BuildInfoItem>
  );
};
