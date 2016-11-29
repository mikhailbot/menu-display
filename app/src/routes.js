export default [
  {
    path: '/settings',
    name: 'settings',
    component: require('components/SettingsView')
  },
  {
    path: '*',
    redirect: '/settings'
  }
]
