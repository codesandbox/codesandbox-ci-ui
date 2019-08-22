import React, { useEffect } from "react";
import Ansi from "ansi-to-react";
import { Status } from "../utils/api";
import { colors } from "../theme/colors";
import { secondsToCounter } from "../utils/countdown";
import { BuildInfoItem } from "./BuildInfoItem";

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
        <pre
          style={{
            margin: 0,
            padding: "0.5rem 1rem",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          {log
            ? log.split("\n").map((line, i) =>
                line.startsWith("+") ? (
                  <code key={i} style={{ color: "white", fontWeight: 600 }}>
                    {line}
                    <br />
                  </code>
                ) : (
                  <span key={i} style={{ color: "#ccc" }}>
                    <Ansi key={i} linkify={false}>
                      {line}
                    </Ansi>
                    <br />
                  </span>
                )
              )
            : status === "queued"
            ? "Waiting to be built..."
            : "Loading..."}
        </pre>
      </div>
    </BuildInfoItem>
  );
};
