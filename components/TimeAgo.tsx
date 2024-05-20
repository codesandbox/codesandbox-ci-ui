import ReactTimeAgo from 'react-time-ago';

interface Props {
  date: number;
}

export const TimeAgo = ({ date, ...props }: Props) => (
  <span suppressHydrationWarning title={new Date(date).toString()}>
    <ReactTimeAgo suppressHydrationWarning date={date} {...props} />
  </span>
);
