import React, { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';
import Ansi from 'ansi-to-react';
import { Status } from '../utils/api';
import { colors } from '../theme/colors';
import { secondsToCounter } from '../utils/countdown';
import { BuildInfoItem } from './BuildInfoItem';
import { CodeBlock } from './CodeBlock';

interface Props {
  status: Status;
  duration: number;
  log: string;
}

const CodeWrapper = styled.div`
  height: 23rem;
  position: relative;
`;

const getStatusInfo = (status: Status, duration: number) => {
  switch (status) {
    case 'canceled':
      return {
        message: `Build canceled in ${secondsToCounter(
          Math.floor(duration / 1000)
        )}`,
        backgroundColor: colors.gray,
        color: colors.white,
      };
    case 'succeeded':
      return {
        message: 'Finished!',
        backgroundColor: colors.bg3,
        color: colors.white,
      };
    case 'running':
      return {
        message: 'Running...',
        backgroundColor: colors.white,
        color: colors.black,
      };
    case 'failed':
      return {
        message: `Build failed in ${secondsToCounter(
          Math.floor(duration / 1000)
        )}`,
        backgroundColor: colors.red,
        color: colors.white,
      };
    case 'queued':
      return {
        message: 'Queued',
        backgroundColor: colors.white,
        color: colors.black,
      };
  }
};
type refType = { scrollToItem(l: number): void };

export const LogsContainer = ({ status, duration, log }: Props) => {
  const statusInfo = getStatusInfo(status, duration);
  const listRef = React.createRef<refType>();
  const contentsRef = React.useRef<HTMLDivElement>();
  const logs = (log || '').split(`\n`);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollToItem(logs.length);
      }
    });
  }, [logs, log, listRef]);

  const Row = ({ index, style }) => (
    <div style={{ ...style, color: '#ccc' }}>
      <Ansi linkify={false}>{logs[index]}</Ansi>
    </div>
  );

  return (
    <BuildInfoItem
      title={statusInfo.message}
      headerColor={statusInfo.color}
      headerBGColor={statusInfo.backgroundColor}
      contentsRef={contentsRef}
      scrollable
    >
      <CodeWrapper>
        <CodeBlock
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        >
          {log ? (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  height={height}
                  itemCount={logs.length}
                  itemSize={16}
                  width={width}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          ) : status === 'queued' ? (
            'Waiting to be built...'
          ) : (
            'Loading...'
          )}

          <br />
        </CodeBlock>
      </CodeWrapper>
    </BuildInfoItem>
  );
};
