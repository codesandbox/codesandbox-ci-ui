export const PR_LINK = `/status/[username]/[repo]/pr/[prNumber]`;
export const BUILD_LINK = `${PR_LINK}/builds/[buildId]`;

export const prLink = (username: string, repo: string, prNumber: number) =>
  `/status/${username}/${repo}/pr/${prNumber}`;
export const buildLink = (
  username: string,
  repo: string,
  prNumber: number,
  buildId: number
) => `/status/${username}/${repo}/pr/${prNumber}/builds/${buildId}`;
