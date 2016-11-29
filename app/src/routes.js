export default [
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
      }
    ]
  },
  {
    path: '*',
    redirect: '/settings/general'
  }
]
