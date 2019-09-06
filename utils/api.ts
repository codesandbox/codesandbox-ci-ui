import axios from "axios";
import Cache from "lru-cache";

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
  title: string;
  url: string;
  source: string;
}

export interface IPackage {
  name: string;
  url: string;
}

export type IBuildDetails = IBuild & {
  log: string;
  sandboxes: ISandbox[];
  packages: IPackage[];
  pull: IPR;
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

const BASE_URL = "https://gh.staging.csb.dev/api";

const prCache = new Cache<string, Promise<{ data: IPRResponse }>>({
  maxAge: 1000 * 60
});

export async function getPrs(
  username: string,
  repo: string
): Promise<IPRResponse> {
  const key = `${username}/${repo}`;
  let prsPromise = prCache.get(key);

  if (!prsPromise) {
    prsPromise = axios.get(`${BASE_URL}/${username}/${repo}/prs`);
    prCache.set(key, prsPromise);
  }

  const response = (await prsPromise).data;

  return response;
}

interface IBuildResponse {
  builds: IBuild[];
}

const buildsCache = new Cache<string, Promise<{ data: IBuildResponse }>>({
  maxAge: 1000 * 60
});

export async function getBuilds(
  username: string,
  repo: string,
  prNumber: number
): Promise<IBuildResponse> {
  const key = `${username}/${repo}/${prNumber}`;
  let buildsPromise = buildsCache.get(key);

  if (!buildsPromise) {
    buildsPromise = axios.get(
      `${BASE_URL}/${username}/${repo}/prs/${prNumber}/builds`
    );

    buildsCache.set(key, buildsPromise);
  }

  const response = (await buildsPromise).data;

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
    `${BASE_URL}/${username}/${repo}/prs/${prNumber}/builds/${buildId}`
  )).data;

  return response;
}
