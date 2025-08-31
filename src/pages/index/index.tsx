import { Button, Dialog, Cell, CellGroup } from "@nutui/nutui-react-taro";
import { View, Text } from "@tarojs/components";
import { useState } from "react";
import CustomTabbar from "../../components/CustomTabbar";
import "./index.scss";

function Index() {
  const [visible, setVisible] = useState(false);

  // Mock数据
  const hotNews = [
    { id: 1, title: "科技巨头发布新产品引热议", time: "2小时前", views: 1234 },
    { id: 2, title: "经济政策调整影响市场走势", time: "4小时前", views: 986 },
    { id: 3, title: "环保新举措获得广泛支持", time: "6小时前", views: 756 },
  ];

  const pinnedMessages = [
    {
      id: 1,
      content: "群规更新：请大家遵守新的发言规范",
      author: "管理员",
      time: "昨天 14:30",
    },
    {
      id: 2,
      content: "本周五晚上8点群聊语音会议",
      author: "小王",
      time: "昨天 10:15",
    },
    {
      id: 3,
      content: "新成员入群须知和注意事项",
      author: "管理员",
      time: "前天 16:20",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "团队建设活动",
      date: "2025-09-05",
      location: "城市公园",
      participants: 15,
    },
    {
      id: 2,
      title: "技术分享会",
      date: "2025-09-08",
      location: "会议室A",
      participants: 25,
    },
    {
      id: 3,
      title: "月度聚餐",
      date: "2025-09-12",
      location: "海底捞",
      participants: 12,
    },
  ];

  return (
    <>
      <View className="home-container">
        {/* 顶部装饰背景 */}
        <View className="top-decoration">
          <View className="wave-bg"></View>
          <View className="floating-elements">
            <View className="floating-dot dot-1"></View>
            <View className="floating-dot dot-2"></View>
            <View className="floating-dot dot-3"></View>
          </View>
        </View>

        {/* 主要内容区 */}
        <View className="content-wrapper">
          {/* 热榜新闻 - 卡片式设计 */}
          <View className="section hot-news-section">
            <View className="section-header">
              <View className="header-icon">🔥</View>
              <View className="header-content">
                <Text className="section-title">热榜新闻</Text>
                <Text className="section-subtitle">实时热点资讯</Text>
              </View>
              <View className="header-badge">HOT</View>
            </View>
            <View className="card-container">
              {hotNews.map((item, index) => (
                <View key={item.id} className={`news-card card-${index + 1}`}>
                  <View className="card-rank">#{index + 1}</View>
                  <View className="card-content">
                    <Text className="card-title">{item.title}</Text>
                    <View className="card-meta">
                      <Text className="meta-time">{item.time}</Text>
                      <Text className="meta-views">{item.views} 浏览</Text>
                    </View>
                  </View>
                  <View className="card-arrow">→</View>
                </View>
              ))}
            </View>
          </View>

          {/* 群消息置顶 - 时间线设计 */}
          <View className="section pinned-section">
            <View className="section-header">
              <View className="header-icon">📌</View>
              <View className="header-content">
                <Text className="section-title">群消息置顶</Text>
                <Text className="section-subtitle">重要通知</Text>
              </View>
            </View>
            <View className="timeline-container">
              {pinnedMessages.map((item, index) => (
                <View key={item.id} className="timeline-item">
                  <View className="timeline-dot"></View>
                  <View className="timeline-content">
                    <View className="message-header">
                      <Text className="message-author">{item.author}</Text>
                      <Text className="message-time">{item.time}</Text>
                    </View>
                    <Text className="message-content">{item.content}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* 即将到来的事件 - 网格设计 */}
          <View className="section events-section">
            <View className="section-header">
              <View className="header-icon">📅</View>
              <View className="header-content">
                <Text className="section-title">即将到来的事件</Text>
                <Text className="section-subtitle">精彩活动预告</Text>
              </View>
            </View>
            <View className="events-grid">
              {upcomingEvents.map((item, index) => (
                <View key={item.id} className={`event-card event-${index + 1}`}>
                  <View className="event-date">
                    <Text className="date-day">{item.date.split("-")[2]}</Text>
                    <Text className="date-month">
                      {item.date.split("-")[1]}月
                    </Text>
                  </View>
                  <View className="event-info">
                    <Text className="event-title">{item.title}</Text>
                    <Text className="event-location">📍 {item.location}</Text>
                    <Text className="event-participants">
                      👥 {item.participants}人
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <CustomTabbar />
    </>
  );
}

export default Index;
