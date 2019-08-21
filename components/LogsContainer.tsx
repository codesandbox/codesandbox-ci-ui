import React, { useEffect } from "react";
import styled from "styled-components";
import Ansi from "ansi-to-react";
import { Status } from "../utils/api";
import { colors } from "../theme/colors";
import { secondsToCounter } from "../utils/countdown";

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
        backgroundColor: colors.bg2,
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
      return { message: "Queued", backgroundColor: "red" };
  }
};

const Header = styled.div<{ backgroundColor: string; color: string }>`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  height: 2rem;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-size: 0.75rem;

  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};

  border: 1px solid ${props => props.theme.bg3};
`;

const Contents = styled.pre`
  background-color: ${props => props.theme.bg1};
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  border: 1px solid ${props => props.theme.bg3};
  border-top: 0;

  margin: 0;

  max-height: 23rem;
  overflow-y: auto;
  code {
    font-family: "Menlo", monospace;
  }
`;

export const LogsContainer = ({ status, duration, log }: Props) => {
  const statusInfo = getStatusInfo(status, duration);
  const contentsRef = React.useRef<HTMLPreElement>();

  useEffect(() => {
    if (contentsRef.current) {
      contentsRef.current.scrollTo(0, contentsRef.current.scrollHeight);
    }
  }, [log, contentsRef]);

  return (
    <>
      <Header
        color={statusInfo.color}
        backgroundColor={statusInfo.backgroundColor}
      >
        {statusInfo.message}
      </Header>
      <Contents ref={contentsRef}>
        {log
          ? log.split("\n").map((line, i) =>
              line.startsWith("+") ? (
                <code key={i} style={{ color: "white", fontWeight: 600 }}>
                  {line}
                  <br />
                </code>
              ) : (
                <span style={{ color: "#ccc" }}>
                  <Ansi key={i} linkify={false}>
                    {line}
                  </Ansi>
                  <br />
                </span>
              )
            )
          : "Loading..."}
      </Contents>
    </>
  );
};
