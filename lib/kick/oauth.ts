import { getKickClientId, getKickClientSecret, getKickRedirectUri } from "./env";

const KICK_AUTHORIZE = "https://id.kick.com/oauth/authorize";
const KICK_TOKEN = "https://id.kick.com/oauth/token";
const KICK_API = "https://api.kick.com/public/v1";

const DEFAULT_SCOPE = "user:read";

export type KickTokenResponse = {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  expires_in: number | string;
  scope?: string;
};

export function buildKickAuthorizeUrl(input: {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  state: string;
  scope?: string;
}) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: input.clientId,
    redirect_uri: input.redirectUri,
    scope: input.scope ?? DEFAULT_SCOPE,
    code_challenge: input.codeChallenge,
    code_challenge_method: "S256",
    state: input.state,
  });

  // Next.js may rewrite the first `127.0.0.1` in outbound URLs; sacrificial param before redirect_uri.
  // https://docs.kick.com/getting-started/generating-tokens-oauth2-flow
  let qs = params.toString();
  if (input.redirectUri.includes("127.0.0.1")) {
    qs = `redirect=127.0.0.1&${qs}`;
  }

  return `${KICK_AUTHORIZE}?${qs}`;
}

export async function exchangeKickAuthorizationCode(input: {
  code: string;
  codeVerifier: string;
  redirectUri: string;
}): Promise<KickTokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: getKickClientId(),
    client_secret: getKickClientSecret(),
    redirect_uri: input.redirectUri,
    code_verifier: input.codeVerifier,
    code: input.code,
  });

  const res = await fetch(KICK_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const json = (await res.json()) as KickTokenResponse & { error?: string };

  if (!res.ok) {
    throw new Error(json.error || `Kick token exchange failed (${res.status})`);
  }

  if (!json.access_token) {
    throw new Error("Kick token response missing access_token");
  }

  return json;
}

export type KickUser = {
  user_id: number;
  name: string;
  email?: string;
  profile_picture?: string;
};

export async function fetchKickCurrentUser(accessToken: string): Promise<KickUser> {
  const res = await fetch(`${KICK_API}/users`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  const json = (await res.json()) as {
    data?: KickUser[];
    message?: string;
  };

  if (!res.ok) {
    throw new Error(json.message || `Kick user request failed (${res.status})`);
  }

  const user = json.data?.[0];
  if (!user?.user_id || !user.name) {
    throw new Error("Kick user response missing profile fields");
  }

  return user;
}

export { getKickRedirectUri };
