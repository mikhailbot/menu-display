export default [
  {
    path: '/',
    name: 'menu',
    component: require('components/MenuView')
  },
  {
    path: '/settings',
    name: 'settings',
    component: require('components/SettingsView'),
    children: [
      {
        path: 'general',
        component: require('components/SettingsView/GeneralView')
      },
      {
        path: 'images',
        component: require('components/SettingsView/ImagesView')
      },
      {
        path: 'schedule',
        component: require('components/SettingsView/ScheduleView')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
