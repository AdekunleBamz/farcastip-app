import { FARCASTER_API } from '../config/constants';

export async function resolveFarcasterUsername(username: string): Promise<string | null> {
  try {
    const response = await fetch(`${FARCASTER_API.BASE_URL}${FARCASTER_API.USERNAME_RESOLUTION}/${username}`);
    const data = await response.json();
    
    if (data.result?.user?.verifications?.[0]) {
      return data.result.user.verifications[0];
    }
    return null;
  } catch (error) {
    console.error('Error resolving Farcaster username:', error);
    return null;
  }
} 