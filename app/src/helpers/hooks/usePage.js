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
      routeName.includes('users.add') ||
      routeName.includes('users.edit') ||
      routeName.includes('counselors.user') ||
      routeName.includes('groups.user'),

    // events
    isEventAddPage: routeName.includes('events.add'),
    isEventEditPage: routeName.includes('events.edit'),
    isEventAddOrEditPage:
      routeName.includes('events.add') || routeName.includes('events.edit'),
    isEventUserEditPage: routeName.includes('events.user'),

    // campers
    isCamperAddPage: routeName.includes('campers.add'),
    isCamperEditPage: routeName.includes('campers.edit'),
    isCamperAddOrEditPage:
      routeName.includes('campers.add') || routeName.includes('campers.edit'),

    // groups
    isGroupAddPage: routeName.includes('groups.add'),
    isGroupEditPage: routeName.includes('groups.edit'),
    isGroupAddOrEditPage:
      routeName.includes('groups.add') || routeName.includes('groups.edit'),
    isGroupUserAddPage: routeName.includes('groups.user'),

    // counselors
    isCounselorAddPage: routeName.includes('counselors.add'),
    isCounselorEditPage: routeName.includes('counselors.edit'),
    isCounselorAddOrEditPage:
      routeName.includes('counselors.add') ||
      routeName.includes('counselors.edit'),
    isCounselorUserAddPage: routeName.includes('counselors.user'),

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

    // campers
    campersPage: 'campers',
    camperAddPage: 'campers.add',
    camperEditPage: 'campers.edit',

    // groups
    groupsPage: 'groups',
    groupAddPage: 'groups.add',
    groupEditPage: 'groups.edit',
    groupUserAddPage: 'groups.user',

    // counselors
    counselorsPage: 'counselors',
    counselorAddPage: 'counselors.add',
    counselorEditPage: 'counselors.edit',
    counselorUserAddPage: 'counselors.user',
  }
}
