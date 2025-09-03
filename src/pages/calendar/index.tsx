import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import CustomTabbar from '../../components/CustomTabbar';
import './index.scss';

interface Event {
  id: number;
  title: string;
  type: 'meeting' | 'work' | 'activity' | 'social' | 'training';
  time: string;
}

const Calendar = () => {
  const [currentDate] = useState(new Date(2025, 8, 4)); // September 2025
  const [selectedDate, setSelectedDate] = useState(4);

  // 事件数据 - 不同类型使用不同颜色
  const events: { [key: number]: Event[] } = {
    3: [
      { id: 1, title: '团队会议', type: 'meeting', time: '09:00' },
      { id: 2, title: '项目评审', type: 'work', time: '14:00' }
    ],
    5: [
      { id: 3, title: '团队建设活动', type: 'activity', time: '全天' }
    ],
    8: [
      { id: 4, title: '技术分享会', type: 'meeting', time: '19:00' }
    ],
    12: [
      { id: 5, title: '月度聚餐', type: 'social', time: '18:00' }
    ],
    15: [
      { id: 6, title: '培训课程', type: 'training', time: '10:00' },
      { id: 7, title: '客户拜访', type: 'work', time: '15:00' }
    ],
    20: [
      { id: 8, title: '生日派对', type: 'social', time: '19:30' }
    ],
    25: [
      { id: 9, title: '产品发布', type: 'work', time: '14:00' }
    ]
  };

  // 事件类型配置
  const eventTypeConfig = {
    meeting: { color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)', label: '会议', icon: '💼' },
    work: { color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)', label: '工作', icon: '📋' },
    activity: { color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', label: '活动', icon: '🎯' },
    social: { color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', label: '社交', icon: '🎉' },
    training: { color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)', label: '培训', icon: '📚' }
  };

  // 获取月份的天数
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 获取月份第一天是星期几
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 生成日历网格
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: (number | null)[] = [];

    // 填充空白天数
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 填充实际天数
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                     '七月', '八月', '九月', '十月', '十一月', '十二月'];

  // 获取今日事件
  const getTodayEvents = () => {
    return events[selectedDate] || [];
  };

  return (
    <>
      <View className="calendar-container">
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
          {/* 日历头部 */}
          <View className="section calendar-header-section">
            <View className="section-header">
              <View className="header-icon">📅</View>
              <View className="header-content">
                <Text className="section-title">
                  {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
                </Text>
                <Text className="section-subtitle">日程管理</Text>
              </View>
              <View className="today-badge">今天</View>
            </View>
          </View>

          {/* 日历主体 */}
          <View className="section calendar-main-section">
            <View className="calendar-widget">
              {/* 星期标题 */}
              <View className="week-header">
                {weekDays.map((day, index) => (
                  <View key={index} className="week-day">
                    <Text className="week-day-text">{day}</Text>
                  </View>
                ))}
              </View>

              {/* 日期网格 */}
              <View className="calendar-grid">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <View key={index} className="calendar-day empty"></View>;
                  }

                  const hasEvents = events[day];
                  const isSelected = day === selectedDate;
                  const isToday = day === 4; // 当前日期

                  return (
                    <View 
                      key={index} 
                      className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <Text className="day-number">{day}</Text>
                      {hasEvents && (
                        <View className="event-indicators">
                          {hasEvents.slice(0, 3).map((event, eventIndex) => (
                            <View 
                              key={eventIndex}
                              className="event-dot"
                              style={{ backgroundColor: eventTypeConfig[event.type].color }}
                            ></View>
                          ))}
                          {hasEvents.length > 3 && (
                            <Text className="more-events">+{hasEvents.length - 3}</Text>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* 今日事件 */}
          <View className="section today-events-section">
            <View className="section-header">
              <View className="header-icon">⭐</View>
              <View className="header-content">
                <Text className="section-title">
                  {selectedDate}日 事件
                </Text>
                <Text className="section-subtitle">
                  {getTodayEvents().length > 0 ? `共${getTodayEvents().length}项安排` : '暂无安排'}
                </Text>
              </View>
            </View>

            {getTodayEvents().length > 0 ? (
              <View className="events-list">
                {getTodayEvents().map((event) => (
                  <View key={event.id} className={`event-item event-${event.type}`}>
                    <View className="event-indicator">
                      <View 
                        className="event-color-bar"
                        style={{ backgroundColor: eventTypeConfig[event.type].color }}
                      ></View>
                      <View className="event-icon">
                        {eventTypeConfig[event.type].icon}
                      </View>
                    </View>
                    <View className="event-content">
                      <View className="event-header">
                        <Text className="event-title">{event.title}</Text>
                        <Text className="event-time">{event.time}</Text>
                      </View>
                      <Text className="event-type-label">
                        {eventTypeConfig[event.type].label}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View className="no-events">
                <View className="no-events-icon">🌤️</View>
                <Text className="no-events-text">今日暂无安排</Text>
                <Text className="no-events-subtitle">享受轻松的一天</Text>
              </View>
            )}
          </View>

          {/* 事件类型图例 */}
          <View className="section legend-section">
            <View className="section-header">
              <View className="header-icon">🎨</View>
              <View className="header-content">
                <Text className="section-title">事件分类</Text>
                <Text className="section-subtitle">颜色图例</Text>
              </View>
            </View>
            <View className="legend-grid">
              {Object.entries(eventTypeConfig).map(([type, config]) => (
                <View key={type} className="legend-item">
                  <View 
                    className="legend-color"
                    style={{ backgroundColor: config.color }}
                  ></View>
                  <Text className="legend-icon">{config.icon}</Text>
                  <Text className="legend-label">{config.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <CustomTabbar />
    </>
  );
};

export default Calendar;
