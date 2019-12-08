import {useRoute} from 'react-router5'

export default () => {
  const routerContext = useRoute()
  const routeName = routerContext.route.name

  return {
    // checks : return bool
    // events
    isEventAddPage: routeName.includes('events.add'),
    isEventEditPage: routeName.includes('events.edit'),
    isEventAddOrEditPage:
      routeName.includes('events.add') || routeName.includes('events.edit'),
    isEventUserEditPage: routeName.includes('events.user'),

    isVisitorsPages: routeName.includes('visitors'),

    // campers
    isCamperAddPage: routeName.includes('visitors.campers.add'),
    isCamperEditPage: routeName.includes('visitors.campers.edit'),
    isCamperAddOrEditPage:
      routeName.includes('visitors.campers.add') ||
      routeName.includes('visitors.campers.edit'),

    // groups
    isGroupAddPage: routeName.includes('visitors.groups.add'),
    isGroupEditPage: routeName.includes('visitors.groups.edit'),
    isGroupAddOrEditPage:
      routeName.includes('visitors.groups.add') ||
      routeName.includes('visitors.groups.edit'),
    isGroupUserAddPage: routeName.includes('visitors.groups.user'),

    isCampPages: routeName.includes('camp'),

    // counselors
    isCounselorAddPage: routeName.includes('camp.counselors.add'),
    isCounselorEditPage: routeName.includes('camp.counselors.edit'),
    isCounselorAddOrEditPage:
      routeName.includes('camp.counselors.add') ||
      routeName.includes('camp.counselors.edit'),
    isCounselorUserAddPage: routeName.includes('camp.counselors.user'),
    isCounselorCabinAddPage: routeName.includes('camp.counselors.cabin'),

    // cabins
    isCabinAddPage: routeName.includes('camp.cabins.add'),
    isCabinEditPage: routeName.includes('camp.cabins.edit'),
    isCabinAddOrEditPage:
      routeName.includes('camp.cabins.add') ||
      routeName.includes('camp.cabins.edit') ||
      routeName.includes('camp.counselors.cabin'),

    // users
    isUserAddPage: routeName.includes('camp.users.add'),
    isUserEditPage: routeName.includes('camp.users.edit'),
    isUserAddOrEditPage:
      routeName.includes('event.user') ||
      routeName.includes('visitors.groups.user') ||
      routeName.includes('camp.counselors.user') ||
      routeName.includes('camp.users.add') ||
      routeName.includes('camp.users.edit'),

    // values : return string
    // events
    eventsPage: 'events',
    eventAddPage: 'events.add',
    eventEditPage: 'events.edit',
    eventUserEditPage: 'events.user',

    // visitors
    visitorsPage: 'visitors',

    // campers
    campersPage: 'visitors.campers',
    camperAddPage: 'visitors.campers.add',
    camperEditPage: 'visitors.campers.edit',

    // groups
    groupsPage: 'visitors.groups',
    groupAddPage: 'visitors.groups.add',
    groupEditPage: 'visitors.groups.edit',
    groupUserAddPage: 'visitors.groups.user',

    // camp
    campPage: 'camp',

    // counselors
    counselorsPage: 'camp.counselors',
    counselorAddPage: 'camp.counselors.add',
    counselorEditPage: 'camp.counselors.edit',
    counselorUserAddPage: 'camp.counselors.user',
    counselorCabinAddPage: 'camp.counselors.cabin',

    // cabins
    cabinsPage: 'camp.cabins',
    cabinAddPage: 'camp.cabins.add',
    cabinEditPage: 'camp.cabins.edit',

    // users
    usersPage: 'camp.users',
    userAddPage: 'camp.users.add',
    userEditPage: 'camp.users.edit',
  }
}
