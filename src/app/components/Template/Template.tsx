import {
  DatabaseTwoTone,
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
import TableTemplate from "../Table/TableTemplate";
import { Avatar, Image } from "antd";
import { Button, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createStudent, listStudents, loadingStudent } from "../../../features/student/studentSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const listStudent = useAppSelector(listStudents);
  const loading : boolean = useAppSelector(loadingStudent);

  const dispatch = useAppDispatch();
  const [studentStages,setStudentStages] = useState(
    {
      fullname: '',
      age: 0,
      mssv:'',
      address: '',
      username: '',
      password: '',
      phone: '',
      email: '',
    }
  )
  const addNewStudent = () => {
    dispatch(createStudent(studentStages))
  }


  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setTimeout(() => {
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
                  <Breadcrumb.Item>HomePage</Breadcrumb.Item>
                  <Breadcrumb.Item>StudentsManagerments</Breadcrumb.Item>
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
            <p>aa </p>
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
            onClick={addNewStudent}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="input-field">
          <Input placeholder="Fullname" onChange={(e)=> setStudentStages({...studentStages, fullname: e.target.value }) } />
          <Input placeholder="Age" onChange={(e)=> setStudentStages({...studentStages, age: Number(e.target.value) }) } />
          <Input placeholder="MSSV" onChange={(e)=> setStudentStages({...studentStages, mssv: e.target.value }) } />
          <Input placeholder="Username" onChange={(e)=> setStudentStages({...studentStages, username: e.target.value }) } />
          <Input placeholder="Password" onChange={(e)=> setStudentStages({...studentStages, password: e.target.value }) } />
          <Input placeholder="Phone"  onChange={(e)=> setStudentStages({...studentStages, phone: e.target.value }) }/>
          <Input placeholder="Email" onChange={(e)=> setStudentStages({...studentStages, email: e.target.value }) } />
          <Input placeholder="Address"  onChange={(e)=> setStudentStages({...studentStages, address: e.target.value }) }/>
        </div>
      </Modal>
    </>
  );
}

export default Template;
