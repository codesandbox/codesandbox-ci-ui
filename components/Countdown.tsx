import React, { useEffect } from 'react';
import { secondsToCounter } from '../utils/countdown';

interface Props {
  startedAt: number;
}

export const Countdown = ({ startedAt }: Props) => {
  // eslint-disable-next-line
  const [_render, forceRender] = React.useState();

  useEffect(() => {
    function tick() {
      // @ts-ignore

      forceRender(r => !r);
    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  const newDuration = Date.now() - startedAt;

  return <span>{secondsToCounter(Math.floor(newDuration / 1000))}</span>;
};
