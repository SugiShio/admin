import Cookies from 'universal-cookie'

export default ({ req, route, redirect }) => {
  const cookies = req ? new Cookies(req.headers.cookie) : new Cookies()
  const credential = cookies.get('credential')

  if (!credential && route.path !== '/signin') return redirect('/signin')
  if (credential && route.path === '/signin') return redirect('/')
}
