import React from "react";
import { View } from "@tarojs/components";
import { Tabbar } from "@nutui/nutui-react-taro";
import { Home, Message, Star, Service } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import "./CustomTabbar.scss";

const tabs = [
  {
    title: "首页",
    icon: () => <Home />,
    page: "pages/index/index",
  },
  {
    title: "群组",
    icon: () => <Message />,
    page: "pages/group/index",
  },
  {
    title: "日历",
    icon: () => <Service />,
    page: "pages/calendar/index",
  },
  {
    title: "订阅",
    icon: () => <Star />,
    page: "pages/subscribe/index",
  },
];

const getCurrentPage = () => {
  const pages = Taro.getCurrentPages();
  const current = pages[pages.length - 1];
  return current.route;
};

const CustomTabbar = () => {
  const currentPage = getCurrentPage();
  const currentIndex = tabs.findIndex((tab) => tab.page === currentPage);

  return (
    <View
      className="custom-tabbar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "#fff",
        borderTop: "1px solid #eee",
      }}
    >
      <Tabbar
        defaultValue={currentIndex >= 0 ? currentIndex : 0}
        safeArea
        onSwitch={(value) => {
          if (tabs[value].page !== currentPage) {
            Taro.switchTab({ url: "/" + tabs[value].page });
          }
        }}
      >
        {tabs.map((tab, index) => (
          <Tabbar.Item key={tab.title} title={tab.title} icon={tab.icon} />
        ))}
      </Tabbar>
    </View>
  );
};

export default CustomTabbar;
