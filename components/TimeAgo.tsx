import ReactTimeAgo from "react-time-ago";

interface Props {
  date: number;
}

export const TimeAgo = ({ date, ...props }: Props) => (
  <span title={new Date(date).toString()}>
    <ReactTimeAgo date={date} {...props} />
  </span>
);
