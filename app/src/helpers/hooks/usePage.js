import {useRoute} from 'react-router5'

export default () => {
  const routerContext = useRoute()
  const routeName = routerContext.route.name

  return {
    // checks : return bool
    // users
    isUserAddPage: routeName.includes('users.add'),
    isUserEditPage: routeName.includes('users.edit'),
    isUserAddOrEditPage:
      routeName.includes('users.add') || routeName.includes('users.edit'),

    // events
    isEventAddPage: routeName.includes('events.add'),
    isEventEditPage: routeName.includes('events.edit'),
    isEventAddOrEditPage:
      routeName.includes('events.add') || routeName.includes('events.edit'),
    isEventUserEditPage: routeName.includes('events.user'),

    // values : return string
    // users
    usersPage: 'users',
    userAddPage: 'users.add',
    userEditPage: 'users.edit',

    // events
    eventsPage: 'events',
    eventAddPage: 'events.add',
    eventEditPage: 'events.edit',
    eventUserEditPage: 'events.user',
  }
}
