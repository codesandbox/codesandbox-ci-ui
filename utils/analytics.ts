import { AmplitudeClient } from 'amplitude-js';

const AMPLITUDE_API_KEY = 'a205ed9b06a7baf5a594bdd30293aa80';

const global = (typeof window !== 'undefined' ? window : {}) as any;
export const DNT =
  typeof window !== 'undefined' &&
  Boolean(
    global.doNotTrack === '1' ||
      global.navigator.doNotTrack === '1' ||
      global.navigator.msDoNotTrack === '1'
  );

function getAmplitude(): AmplitudeClient {
  if (typeof window !== 'undefined') {
    return require('amplitude-js');
  }

  return undefined;
}

if (typeof window !== 'undefined') {
  getAmplitude().init(AMPLITUDE_API_KEY, undefined, {
    logLevel: 'ERROR',
  });
  getAmplitude().setDomain('ci.codesandbox.io');
}

export function track(eventName: string, metadata: object = {}) {
  if (typeof window !== 'undefined' && !DNT) {
    const newMetadata = {
      ...metadata,
      path: location.pathname + location.search,
      source: 'codesandbox-ci',
    };

    getAmplitude().logEvent(eventName, newMetadata);
  }
}
