import { useState } from 'react';
import { View, Text, Switch } from '@tarojs/components';
import CustomTabbar from '../../components/CustomTabbar';
import './index.scss';

interface SubscriptionItem {
  id: number;
  title: string;
  description: string;
  type: 'meeting' | 'activity' | 'training' | 'deadline';
  category: string;
  subscribedAt: string;
  nextEvent: string;
  isActive: boolean;
  reminderEnabled: boolean;
  reminderTime: number; // minutes before event
  reminderMethod: 'push' | 'sms' | 'email';
}

interface ReminderSetting {
  id: string;
  label: string;
  value: number;
  unit: string;
}

const Subscribe = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock 订阅数据
  const subscriptions: SubscriptionItem[] = [
    {
      id: 1,
      title: '技术分享会',
      description: '前端技术交流与最新框架分享',
      type: 'meeting',
      category: '技术学习',
      subscribedAt: '2025-08-15',
      nextEvent: '2025-09-08 19:00',
      isActive: true,
      reminderEnabled: true,
      reminderTime: 30,
      reminderMethod: 'push'
    },
    {
      id: 2,
      title: '团队建设活动',
      description: '户外拓展和团队协作训练',
      type: 'activity',
      category: '团队活动',
      subscribedAt: '2025-08-20',
      nextEvent: '2025-09-05 09:00',
      isActive: true,
      reminderEnabled: true,
      reminderTime: 60,
      reminderMethod: 'push'
    },
    {
      id: 3,
      title: '项目截止日期',
      description: 'Q3季度项目交付截止提醒',
      type: 'deadline',
      category: '工作提醒',
      subscribedAt: '2025-07-10',
      nextEvent: '2025-09-30 18:00',
      isActive: true,
      reminderEnabled: false,
      reminderTime: 1440, // 1 day
      reminderMethod: 'email'
    },
    {
      id: 4,
      title: 'React 进阶课程',
      description: '高级组件设计和性能优化',
      type: 'training',
      category: '在线课程',
      subscribedAt: '2025-08-05',
      nextEvent: '2025-09-15 20:00',
      isActive: true,
      reminderEnabled: true,
      reminderTime: 15,
      reminderMethod: 'push'
    },
    {
      id: 5,
      title: '月度总结会议',
      description: '部门月度工作总结和计划',
      type: 'meeting',
      category: '定期会议',
      subscribedAt: '2025-07-25',
      nextEvent: '2025-09-28 14:00',
      isActive: false,
      reminderEnabled: false,
      reminderTime: 30,
      reminderMethod: 'push'
    }
  ];

  // 提醒时间选项
  const reminderOptions: ReminderSetting[] = [
    { id: '5min', label: '5分钟前', value: 5, unit: '分钟' },
    { id: '15min', label: '15分钟前', value: 15, unit: '分钟' },
    { id: '30min', label: '30分钟前', value: 30, unit: '分钟' },
    { id: '1hour', label: '1小时前', value: 60, unit: '小时' },
    { id: '1day', label: '1天前', value: 1440, unit: '天' }
  ];

  // 事件类型配置
  const typeConfig = {
    meeting: { color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)', label: '会议', icon: '💼' },
    activity: { color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', label: '活动', icon: '🎯' },
    training: { color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)', label: '培训', icon: '📚' },
    deadline: { color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', label: '截止', icon: '⏰' }
  };

  // 获取统计数据
  const getStatistics = () => {
    const total = subscriptions.length;
    const active = subscriptions.filter(item => item.isActive).length;
    const withReminder = subscriptions.filter(item => item.reminderEnabled).length;
    return { total, active, withReminder };
  };

  // 切换选择项目
  const toggleSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedItems.length === subscriptions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(subscriptions.map(item => item.id));
    }
  };

  // 批量取消订阅
  const handleBatchUnsubscribe = () => {
    // 这里应该调用 API
    console.log('批量取消订阅:', selectedItems);
    setSelectedItems([]);
    setIsEditMode(false);
  };

  const statistics = getStatistics();

  return (
    <>
      <View className="subscribe-container">
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
          {/* 订阅统计 */}
          <View className="section stats-section">
            <View className="section-header">
              <View className="header-icon">📊</View>
              <View className="header-content">
                <Text className="section-title">订阅概览</Text>
                <Text className="section-subtitle">我的订阅统计</Text>
              </View>
              <View className="header-badge">STATS</View>
            </View>
            <View className="stats-grid">
              <View className="stat-card">
                <View className="stat-number">{statistics.total}</View>
                <Text className="stat-label">总订阅</Text>
              </View>
              <View className="stat-card active">
                <View className="stat-number">{statistics.active}</View>
                <Text className="stat-label">活跃订阅</Text>
              </View>
              <View className="stat-card reminder">
                <View className="stat-number">{statistics.withReminder}</View>
                <Text className="stat-label">已设提醒</Text>
              </View>
            </View>
          </View>

          {/* 快捷操作 */}
          <View className="section actions-section">
            <View className="section-header">
              <View className="header-icon">⚙️</View>
              <View className="header-content">
                <Text className="section-title">订阅管理</Text>
                <Text className="section-subtitle">批量操作</Text>
              </View>
              <View 
                className={`edit-toggle ${isEditMode ? 'active' : ''}`}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? '完成' : '编辑'}
              </View>
            </View>
            
            {isEditMode && (
              <View className="batch-actions">
                <View className="action-buttons">
                  <View 
                    className="action-btn select-all"
                    onClick={toggleSelectAll}
                  >
                    <Text className="btn-icon">📋</Text>
                    <Text className="btn-text">
                      {selectedItems.length === subscriptions.length ? '取消全选' : '全选'}
                    </Text>
                  </View>
                  <View 
                    className={`action-btn unsubscribe ${selectedItems.length > 0 ? 'enabled' : ''}`}
                    onClick={selectedItems.length > 0 ? handleBatchUnsubscribe : undefined}
                  >
                    <Text className="btn-icon">🗑️</Text>
                    <Text className="btn-text">批量取消({selectedItems.length})</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* 订阅列表 */}
          <View className="section subscriptions-section">
            <View className="section-header">
              <View className="header-icon">📝</View>
              <View className="header-content">
                <Text className="section-title">我的订阅</Text>
                <Text className="section-subtitle">所有订阅事件</Text>
              </View>
            </View>
            <View className="subscriptions-list">
              {subscriptions.map((item) => (
                <View 
                  key={item.id} 
                  className={`subscription-card ${item.type} ${!item.isActive ? 'inactive' : ''} ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                >
                  {/* 选择框 */}
                  {isEditMode && (
                    <View 
                      className="selection-checkbox"
                      onClick={() => toggleSelection(item.id)}
                    >
                      <View className={`checkbox ${selectedItems.includes(item.id) ? 'checked' : ''}`}>
                        {selectedItems.includes(item.id) && <Text className="check-mark">✓</Text>}
                      </View>
                    </View>
                  )}

                  {/* 主要内容 */}
                  <View className="card-content">
                    <View className="card-header">
                      <View className="title-area">
                        <View className="type-indicator">
                          <Text className="type-icon">{typeConfig[item.type].icon}</Text>
                          <View 
                            className="type-dot"
                            style={{ backgroundColor: typeConfig[item.type].color }}
                          ></View>
                        </View>
                        <View className="title-info">
                          <Text className="subscription-title">{item.title}</Text>
                          <Text className="subscription-category">{item.category}</Text>
                        </View>
                      </View>
                      <View className="status-area">
                        <View className={`status-badge ${item.isActive ? 'active' : 'inactive'}`}>
                          {item.isActive ? '活跃' : '暂停'}
                        </View>
                      </View>
                    </View>

                    <Text className="subscription-description">{item.description}</Text>

                    <View className="card-meta">
                      <View className="meta-item">
                        <Text className="meta-label">下次事件</Text>
                        <Text className="meta-value">{item.nextEvent}</Text>
                      </View>
                      <View className="meta-item">
                        <Text className="meta-label">订阅时间</Text>
                        <Text className="meta-value">{item.subscribedAt}</Text>
                      </View>
                    </View>

                    {/* 提醒设置 */}
                    <View className="reminder-settings">
                      <View className="reminder-header">
                        <Text className="reminder-label">提醒设置</Text>
                        <View className="reminder-toggle">
                          <Switch 
                            checked={item.reminderEnabled}
                            onChange={() => {
                              // 这里应该更新提醒状态
                              console.log('切换提醒状态:', item.id);
                            }}
                          />
                        </View>
                      </View>
                      
                      {item.reminderEnabled && (
                        <View className="reminder-options">
                          <View className="reminder-time">
                            <Text className="option-label">提醒时间</Text>
                            <View className="time-selector">
                              {reminderOptions.map((option) => (
                                <View 
                                  key={option.id}
                                  className={`time-option ${item.reminderTime === option.value ? 'selected' : ''}`}
                                  onClick={() => {
                                    // 更新提醒时间
                                    console.log('更新提醒时间:', item.id, option.value);
                                  }}
                                >
                                  <Text className="option-text">{option.label}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                          
                          <View className="reminder-method">
                            <Text className="option-label">提醒方式</Text>
                            <View className="method-selector">
                              <View className={`method-option ${item.reminderMethod === 'push' ? 'selected' : ''}`}>
                                <Text className="method-icon">📱</Text>
                                <Text className="method-text">推送</Text>
                              </View>
                              <View className={`method-option ${item.reminderMethod === 'sms' ? 'selected' : ''}`}>
                                <Text className="method-icon">💬</Text>
                                <Text className="method-text">短信</Text>
                              </View>
                              <View className={`method-option ${item.reminderMethod === 'email' ? 'selected' : ''}`}>
                                <Text className="method-icon">📧</Text>
                                <Text className="method-text">邮件</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* 类型装饰条 */}
                  <View 
                    className="type-bar"
                    style={{ backgroundColor: typeConfig[item.type].color }}
                  ></View>
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

export default Subscribe;
