import axios from "axios";

export type Status = "queued" | "canceled" | "running" | "failed" | "succeeded";

type NotStartedBuild = {
  status: "queued";
  startedAt: null;
  duration: null;
};

type StartedBuild = {
  status: "canceled" | "running" | "failed" | "succeeded";
  startedAt: string;
  duration: number;
};

export type IBuild = (NotStartedBuild | StartedBuild) & {
  id: number;
  repoId: number;
  pullId: number;
  commitSha: string;
  commitTitle: string;
  commitAuthor: string;
  targetBranch: string;
  createdAt: string;
  updatedAt: string;
};

export interface ISandbox {
  name: string;
  url: string;
}

export interface IPackage {
  name: string;
  url: string;
}

export type IBuildDetails = IBuild & {
  log: string;
  sandboxes: ISandbox[];
  packages: IPackage[];
};

export interface IPR {
  id: number;
  repoId: number;
  number: number;
  title: string;
  latestBuildId: number;
  createdAt: string;
  updatedAt: string;
  latestBuild: IBuild;
}

interface IPRResponse {
  prs: IPR[];
}

export async function getPrs(
  username: string,
  repo: string
): Promise<IPRResponse> {
  const response = (await axios.get(
    `https://gh.staging.csb.dev/api/${username}/${repo}/prs`
  )).data;

  return response;
}

interface IBuildResponse {
  builds: IBuild[];
}

export async function getBuilds(
  username: string,
  repo: string,
  prNumber: number
): Promise<IBuildResponse> {
  const response = (await axios.get(
    `https://gh.staging.csb.dev/api/${username}/${repo}/prs/${prNumber}/builds`
  )).data;

  return response;
}

interface IBuildDetailsResponse {
  build: IBuildDetails;
}

export async function getBuildDetails(
  username: string,
  repo: string,
  prNumber: number,
  buildId: number
): Promise<IBuildDetailsResponse> {
  const response = (await axios.get(
    `https://gh.staging.csb.dev/api/${username}/${repo}/prs/${prNumber}/builds/${buildId}`
  )).data;

  return response;
}
