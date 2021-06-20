import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./App.css";
import "./index.css";
import { Layout, Menu, Tabs, DatePicker } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import MainMenu from "./components/MainMenu";
// 資料表引入 start
import customerTable from "./utils/customerTable";
// 資料表引入 end

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useState } from "react";
import ColumnGroup from "antd/lib/table/ColumnGroup";
const { TabPane } = Tabs;
const { Content, Sider, Header } = Layout;
function App() {
  const [customerFiles, setCustomerFiles] = useState(customerTable);
  const [mainMenuOpenState, setMainMenuOpenState] = useState(true);
  const panes = [
    { title: "Tab 1", content: "Content of Tab Pane 1", key: "1" },
    { title: "Tab 2", content: "Content of Tab Pane 2", key: "2" },
  ];
  const [stateyy, setStateyy] = useState({
    activeKey: panes[0].key,
    panes,
  });

  const onChange = (activeKey) => {
    this.setState({ activeKey });
  };
  const onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  return (
    <Layout className="main-layout">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        collapsible="true"
        trigger={null}
        collapsed={mainMenuOpenState}
      >
        <div className="logo">放logo</div>
        <MainMenu />
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item
              onClick={() => {
                setMainMenuOpenState(!mainMenuOpenState);
              }}
              key="1"
            >
              {mainMenuOpenState && <MenuUnfoldOutlined />}
              {!mainMenuOpenState && <MenuFoldOutlined />}
            </Menu.Item>
          </Menu>
        </Header>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={stateyy.activeKey}
          type="editable-card"
          onEdit={onEdit}
        >
          {panes.map((pane) => (
            <TabPane tab={pane.title} key={pane.key}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <DatePicker />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
