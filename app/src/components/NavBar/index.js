import React from 'react'

import usePage from '@/helpers/hooks/usePage'

import NavBarContent from './components/NavBarContent'

const NavBar = () => {
  const page = usePage()

  const navItems = [
    {
      icon: 'calendar',
      name: 'Events',
      routeName: page.eventsPage,
    },
    {
      icon: 'team',
      name: 'Visitors',
      routeName: page.visitorsPage,
      subItems: [
        {
          name: 'Campers',
          routeName: page.campersPage,
        },
        {
          name: 'Groups',
          routeName: page.groupsPage,
        },
        {
          name: 'Registrations',
          routeName: page.registrationsPage,
        },
      ],
    },
    {
      icon: 'appstore',
      name: 'Camp',
      routeName: page.campPage,
      subItems: [
        {
          name: 'Counselors',
          routeName: page.counselorsPage,
        },
        {
          name: 'Cabins',
          routeName: page.cabinsPage,
        },
        {
          name: 'Users',
          routeName: page.usersPage,
        },
        {
          name: 'Snack Shop Items',
          routeName: page.snackShopItemsPage,
        },
        {
          name: 'Coupons',
          routeName: page.couponsPage,
        },
        {
          name: 'Custom Fields',
          routeName: page.customFieldsPage,
        },
        {
          name: 'Import Data',
          routeName: page.importPage,
        },
        {
          name: 'Settings',
          routeName: page.settingsPage,
        },
      ],
    },
  ]

  return <NavBarContent navItems={navItems} />
}

export default NavBar
