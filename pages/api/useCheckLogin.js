import useSWR from 'swr'

export default function useCheckLogin(user) {
  // We do a request to /api/events only if the user is logged in
  const { data: events } = useSWR(user?.isLoggedIn ? `/api/checkLogin` : null);

  return { events }
}