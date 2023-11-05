import { togglRequest } from '$lib/server/toggl-client';

export async function load() {
  const data = await togglRequest('/me')
  return {
    userData: data
  };
}