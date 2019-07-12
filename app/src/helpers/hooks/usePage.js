import {useRoute} from 'react-router5'

export default () => {
  const routerContext = useRoute()
  const routeName = routerContext.route.name

  return {
    // checks : return bool
    isUserAddPage: routeName.includes('users.add'),
    isUserEditPage: routeName.includes('users.edit'),
    isUserAddOrEditPage:
      routeName.includes('users.add') || routeName.includes('users.edit'),
    isEventUserEditPage: routeName.includes('events.user'),

    // values : return string
    usersPage: 'users',
    userEditPage: 'users.edit',

    eventsPage: 'events',
    eventEditPage: 'events.edit',
    eventUserEditPage: 'events.user',
  }
}
