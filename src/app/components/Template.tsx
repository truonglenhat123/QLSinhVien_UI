import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "./Template.scss";
import { Col, Row } from "antd";
import TableTemplate from "./Table/TableTemplate";
import { Avatar, Image } from "antd";
import { Button, Modal } from "antd";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const onSearch = (value: string) => console.log(value);
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Trang Chủ", "1", <PieChartOutlined />),
  getItem("Thông Tin Sinh Viên", "2", <DesktopOutlined />),
  getItem("Quản Lý Sinh Viên", "3", <UserOutlined />),
  getItem(
    "Team",
    "sub2",
    <TeamOutlined />
    // getItem("Team 1", "6"),
    // getItem("Team 2", "8"),
  ),
  getItem("Files", "9", <FileOutlined />),
];

function Template() {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
              <Col span={20}>
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                  className="search"
                />
              </Col>
              <Col span={4}>
                <Avatar
                  className="avatar"
                  size={45}
                  src="https://joeschmoe.io/api/v1/random"
                />
              </Col>
            </Row>
          </Header>
          <Content className="content">
            <Row className="row-content">
              <Col span={18} className="col-content">
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col span={6} className="col-content-button">
                <Button type="primary" onClick={showModal}>
                  Thêm
                </Button>
              </Col>
            </Row>

            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <TableTemplate />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      <Modal
        visible={visible}
        title="Thêm Sinh Viên"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="input-field">
          <Input placeholder="Fullname" />
          <Input placeholder="Age" />
          <Input placeholder="MSSV" />
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Input placeholder="Phone" />
          <Input placeholder="Email" />
          <Input placeholder="Address" />
        </div>
      </Modal>
    </>
  );
}

export default Template;
