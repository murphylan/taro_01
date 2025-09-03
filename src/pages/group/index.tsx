import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import CustomTabbar from '../../components/CustomTabbar';
import './index.scss';

interface WeChatGroup {
  id: number;
  name: string;
  avatar: string;
  description: string;
  memberCount: number;
  isActive: boolean;
  lastActivity: string;
  unreadCount: number;
  type: 'work' | 'social' | 'study' | 'family';
  isOwner: boolean;
}

const Group = () => {
  const [activeGroupId, setActiveGroupId] = useState(1);

  // Mock数据 - 已绑定的微信群
  const wechatGroups: WeChatGroup[] = [
    {
      id: 1,
      name: '技术交流群',
      avatar: '💻',
      description: '前端技术交流与分享',
      memberCount: 156,
      isActive: true,
      lastActivity: '5分钟前',
      unreadCount: 12,
      type: 'work',
      isOwner: true
    },
    {
      id: 2,
      name: '项目协作团队',
      avatar: '🚀',
      description: '日常项目沟通协调',
      memberCount: 25,
      isActive: true,
      lastActivity: '1小时前',
      unreadCount: 3,
      type: 'work',
      isOwner: false
    },
    {
      id: 3,
      name: '周末户外活动',
      avatar: '🏃',
      description: '运动健身，生活分享',
      memberCount: 89,
      isActive: false,
      lastActivity: '昨天',
      unreadCount: 0,
      type: 'social',
      isOwner: false
    },
    {
      id: 4,
      name: '在线学习小组',
      avatar: '📚',
      description: '知识分享，共同进步',
      memberCount: 234,
      isActive: true,
      lastActivity: '30分钟前',
      unreadCount: 7,
      type: 'study',
      isOwner: true
    },
    {
      id: 5,
      name: '家庭群聊',
      avatar: '👨‍👩‍👧‍👦',
      description: '温馨的家庭时光',
      memberCount: 8,
      isActive: true,
      lastActivity: '2小时前',
      unreadCount: 2,
      type: 'family',
      isOwner: false
    },
    {
      id: 6,
      name: '创业讨论组',
      avatar: '💡',
      description: '创新想法，商业机会',
      memberCount: 67,
      isActive: false,
      lastActivity: '3天前',
      unreadCount: 0,
      type: 'work',
      isOwner: true
    }
  ];

  // 群组类型配置
  const groupTypeConfig = {
    work: { color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)', label: '工作', icon: '💼' },
    social: { color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', label: '社交', icon: '🎉' },
    study: { color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)', label: '学习', icon: '📖' },
    family: { color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', label: '家庭', icon: '🏠' }
  };

  // 获取活跃群组数量
  const getActiveGroupsCount = () => {
    return wechatGroups.filter(group => group.isActive).length;
  };

  // 获取总未读消息数
  const getTotalUnreadCount = () => {
    return wechatGroups.reduce((total, group) => total + group.unreadCount, 0);
  };

  // 切换活跃群组
  const handleGroupSwitch = (groupId: number) => {
    setActiveGroupId(groupId);
    // 这里可以添加切换群组的逻辑
  };

  // 获取当前活跃群组
  const getCurrentGroup = () => {
    return wechatGroups.find(group => group.id === activeGroupId) || wechatGroups[0];
  };

  const currentGroup = getCurrentGroup();

  return (
    <>
      <View className="group-container">
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
          {/* 当前群组状态 */}
          <View className="section current-group-section">
            <View className="section-header">
              <View className="header-icon">👥</View>
              <View className="header-content">
                <Text className="section-title">当前活跃群组</Text>
                <Text className="section-subtitle">{currentGroup.name}</Text>
              </View>
              <View className="status-badge active">在线</View>
            </View>
            
            <View className="current-group-card">
              <View className="group-avatar-large">
                {currentGroup.avatar}
              </View>
              <View className="group-info-main">
                <Text className="group-name-large">{currentGroup.name}</Text>
                <Text className="group-desc">{currentGroup.description}</Text>
                <View className="group-stats">
                  <View className="stat-item">
                    <Text className="stat-icon">👥</Text>
                    <Text className="stat-text">{currentGroup.memberCount}人</Text>
                  </View>
                  <View className="stat-item">
                    <Text className="stat-icon">⏰</Text>
                    <Text className="stat-text">{currentGroup.lastActivity}</Text>
                  </View>
                  {currentGroup.isOwner && (
                    <View className="owner-badge">群主</View>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* 群组统计 */}
          <View className="section stats-section">
            <View className="section-header">
              <View className="header-icon">📊</View>
              <View className="header-content">
                <Text className="section-title">群组概览</Text>
                <Text className="section-subtitle">数据统计</Text>
              </View>
            </View>
            <View className="stats-grid">
              <View className="stat-card">
                <View className="stat-number">{wechatGroups.length}</View>
                <Text className="stat-label">总群数</Text>
              </View>
              <View className="stat-card active">
                <View className="stat-number">{getActiveGroupsCount()}</View>
                <Text className="stat-label">活跃群</Text>
              </View>
              <View className="stat-card unread">
                <View className="stat-number">{getTotalUnreadCount()}</View>
                <Text className="stat-label">未读消息</Text>
              </View>
            </View>
          </View>

          {/* 群组列表 */}
          <View className="section groups-list-section">
            <View className="section-header">
              <View className="header-icon">💬</View>
              <View className="header-content">
                <Text className="section-title">已绑定群组</Text>
                <Text className="section-subtitle">点击切换群组</Text>
              </View>
            </View>
            <View className="groups-list">
              {wechatGroups.map((group) => (
                <View 
                  key={group.id} 
                  className={`group-card ${group.id === activeGroupId ? 'selected' : ''} ${group.type}`}
                  onClick={() => handleGroupSwitch(group.id)}
                >
                  <View className="group-card-content">
                    <View className="group-avatar">
                      {group.avatar}
                      {!group.isActive && <View className="offline-indicator"></View>}
                    </View>
                    <View className="group-info">
                      <View className="group-header">
                        <Text className="group-name">{group.name}</Text>
                        <View className="group-badges">
                          {group.isOwner && (
                            <View className="mini-badge owner">群主</View>
                          )}
                          <View 
                            className="mini-badge type"
                            style={{ 
                              backgroundColor: groupTypeConfig[group.type].color,
                              color: 'white'
                            }}
                          >
                            {groupTypeConfig[group.type].label}
                          </View>
                        </View>
                      </View>
                      <Text className="group-description">{group.description}</Text>
                      <View className="group-meta">
                        <View className="meta-left">
                          <Text className="member-count">👥 {group.memberCount}人</Text>
                          <Text className="last-activity">⏰ {group.lastActivity}</Text>
                        </View>
                        <View className="meta-right">
                          <View className={`status-indicator ${group.isActive ? 'active' : 'inactive'}`}>
                            {group.isActive ? '🟢' : '⚫'}
                          </View>
                          {group.unreadCount > 0 && (
                            <View className="unread-badge">
                              <Text className="unread-count">{group.unreadCount}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                  
                  {/* 选中指示器 */}
                  {group.id === activeGroupId && (
                    <View className="selected-indicator">
                      <Text className="check-icon">✓</Text>
                    </View>
                  )}
                  
                  {/* 类型装饰条 */}
                  <View 
                    className="type-indicator"
                    style={{ backgroundColor: groupTypeConfig[group.type].color }}
                  ></View>
                </View>
              ))}
            </View>
          </View>

          {/* 群组类型分类 */}
          <View className="section type-filter-section">
            <View className="section-header">
              <View className="header-icon">🏷️</View>
              <View className="header-content">
                <Text className="section-title">群组分类</Text>
                <Text className="section-subtitle">按类型筛选</Text>
              </View>
            </View>
            <View className="type-filter-grid">
              {Object.entries(groupTypeConfig).map(([type, config]) => {
                const count = wechatGroups.filter(group => group.type === type).length;
                return (
                  <View key={type} className="type-filter-item">
                    <View 
                      className="type-color"
                      style={{ backgroundColor: config.color }}
                    ></View>
                    <Text className="type-icon">{config.icon}</Text>
                    <Text className="type-label">{config.label}</Text>
                    <Text className="type-count">{count}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      <CustomTabbar />
    </>
  );
};

export default Group;
