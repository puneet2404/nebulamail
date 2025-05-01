import { msal } from '@/lib/auth';
export async function callAssist(endpoint: string, id: string) {
  const acc = msal.getAllAccounts()[0];
  const token = acc ? (await msal.acquireTokenSilent({ scopes: ['User.Read'], account: acc })).accessToken : '';
  const res = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({ id }),
  });
  return (await res.json()).text as string;
}
