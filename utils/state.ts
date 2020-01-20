import * as state from 'react-hooks-global-state';
import { IPR } from './api';

export interface IState {
  prs: IPR[];
}

export const {
  GlobalStateProvider,
  setGlobalState,
  useGlobalState,
} = state.createGlobalState<IState>({
  prs: undefined,
});
