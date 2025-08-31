import { Button, Dialog } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { useState } from "react";
import CustomTabbar from "../../components/CustomTabbar";
import "./index.scss";

function Index() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View className="nutui-react-demo" style={{ paddingBottom: "60px" }}>
        <View>欢迎使用 NutUI 3.x React 开发 Taro 多端项目。</View>
        <View>
          <Button type="primary" onClick={() => setVisible(true)}>
            点击打开对话框
          </Button>
          <Dialog
            visible={visible}
            onConfirm={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            title="提示"
          >
            欢迎使用 NutUI 3.x！
          </Dialog>
        </View>
      </View>
      <CustomTabbar />
    </>
  );
}

export default Index;
