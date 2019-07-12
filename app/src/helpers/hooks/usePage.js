import {useRoute} from 'react-router5'

export default () => {
  const routerContext = useRoute()

  return {
    // checks : return bool
    isUserAddPage: routerContext.route.name.includes('users.add'),
    isUserEditPage: routerContext.route.name.includes('users.edit'),
    isUserAddOrEditPage:
      routerContext.route.name.includes('users.add') ||
      routerContext.route.name.includes('users.edit'),
    isEventUserEditPage: routerContext.route.name.includes('events.user'),

    // values : return string
    usersPage: 'users',
    userEditPage: 'users.edit',

    eventsPage: 'events',
    eventEditPage: 'events.edit',
    eventUserEditPage: 'events.user',
  }
}
