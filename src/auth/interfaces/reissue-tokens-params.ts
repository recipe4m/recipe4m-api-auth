import { IssueTokensParams } from './issue-tokens-params';

export interface ReissueTokensParams extends IssueTokensParams {
  refreshTokenId: number;
}
