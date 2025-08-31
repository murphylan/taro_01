export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/group/index',
    'pages/calendar/index',
    'pages/subscribe/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#666',
    selectedColor: '#0081ff',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/group/index',
        text: '群组'
      },
      {
        pagePath: 'pages/calendar/index',
        text: '日历'
      },
      {
        pagePath: 'pages/subscribe/index',
        text: '订阅'
      }
    ]
  }
})
