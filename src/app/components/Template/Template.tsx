import {
  DatabaseTwoTone,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Checkbox, Form, MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "./Template.scss";
import { Col, Row } from "antd";
import TableTemplate from "../Table/TableTemplate";
import { Avatar, Image } from "antd";
import { Button, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  createStudent,
  getStudents,
  listStudents,
  loadingStudent,
} from "../../../features/student/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yub from "yup";

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
  const loading: boolean = useAppSelector(loadingStudent);
  const dispatch = useAppDispatch();
  const [studentStages, setStudentStages] = useState<any | null>(null);
  const addNewStudent = async () => {
    try {
     
      await dispatch(createStudent(studentStages));
      await dispatch(getStudents());
      handleOk();
      setStudentStages(null);
      
      
    } catch (error) {}
  };

  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
                  <Breadcrumb.Item></Breadcrumb.Item>
                  <Breadcrumb.Item></Breadcrumb.Item>
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
            <p>footer </p>
          </Footer>
        </Layout>
      </Layout>
      <Modal
        visible={visible}
        title="Thêm Sinh Viên"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          //   <Button key="back" onClick={handleCancel}>
          //     Cancel
          //   </Button>
          //   <Button type="primary" htmlType="submit" onClick={addNewStudent} >
          //     Submit
          //   </Button>
          // </Form.Item>
          null,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
         
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: "Please input your Fullname!" }]}
          >
            <Input
              placeholder="Fullname"
              value={studentStages!?.fullname}
              onChange={(e) =>
                setStudentStages({ ...studentStages, fullname: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input
              placeholder="Age"
              value={studentStages!?.age}
              onChange={(e) =>
                setStudentStages({
                  ...studentStages,
                  age: Number(e.target.value),
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="MSSV"
            name="mssv"
            rules={[{ required: true, message: "Please input your mssv!" }]}
          >
            <Input
              placeholder="MSSV"
              value={studentStages!?.mssv}
              onChange={(e) =>
                setStudentStages({
                  ...studentStages,
                  mssv: Number(e.target.value),
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="Username"
              value={studentStages!?.username}
              onChange={(e) =>
                setStudentStages({ ...studentStages, username: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              placeholder="Password"
              value={studentStages!?.password}
              type="password"
              onChange={(e) =>
                setStudentStages({ ...studentStages, password: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your Phone!" }]}
          >
            <Input
              placeholder="Phone"
              value={studentStages!?.phone}
              onChange={(e) =>
                setStudentStages({ ...studentStages, phone: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              placeholder="Email"
              value={studentStages!?.email}
              type="email"
              onChange={(e) =>
                setStudentStages({ ...studentStages, email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="adrress"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input
              placeholder="Address"
              value={studentStages!?.address}
              onChange={(e) =>
                setStudentStages({ ...studentStages, address: e.target.value })
              }
            />
          </Form.Item>

          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        //   <Button key="back" onClick={handleCancel}>
        //     Cancel
        //   </Button>
        //   <Button type="primary" htmlType="submit" onClick={addNewStudent} >
        //     Submit
        //   </Button>
        // </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button key="back" onClick={handleCancel}> Cancel  </Button>
            
            <Button type="primary" htmlType="submit" onClick={addNewStudent}  loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Template;
