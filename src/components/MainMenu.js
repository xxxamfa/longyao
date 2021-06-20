import { Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,

} from "@ant-design/icons";
const { SubMenu } = Menu;
const MainMenu = () => (
  <Menu
    className="main-menu"
    theme="dark"
    mode="inline"
    defaultSelectedKeys={["4"]}
    
  >
    <SubMenu key="sub1" icon={<MailOutlined />} title="基本資料">
      <Menu.Item key="11">客戶資料</Menu.Item>
      <Menu.Item key="12">廠商資料</Menu.Item>
      <Menu.Item key="13">商品資料</Menu.Item>
    </SubMenu>
    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
      nav 2
    </Menu.Item>
    <Menu.Item key="3" icon={<UploadOutlined />}>
      nav 3
    </Menu.Item>
    <Menu.Item key="4" icon={<UserOutlined />}>
      nav 4
    </Menu.Item>
  </Menu>
);

export default MainMenu;
