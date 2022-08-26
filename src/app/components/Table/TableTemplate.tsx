import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getStudents,
  listStudents,
  loadingStudent,
} from "../../../features/student/studentSlice";

interface DataType {
  key: string;
  fullname: string;
  age: number;
  address: string;
  id: string;
  username: string;
  password: string;
  phone: string;
  email: string;
}

export function TableTemplate() {
  const dispatch = useAppDispatch();
  const listStudent = useAppSelector(listStudents);
  const loading : boolean = useAppSelector(loadingStudent);
  //Modal update
  const [visible, setVisible] = useState(false);

  const showModalUpdate = () => {
    setVisible(true);
  };

  const handleUpdateOk = () => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const handleUpdateCancel = () => {
    setVisible(false);
  };

  //Modal delete
  const [isModalVisible, setIsModalDeleteVisible] = useState(false);

  const showModalDelete = () => {
    setIsModalDeleteVisible(true);
  };

  const handleDeleteOk = () => {
    setIsModalDeleteVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsModalDeleteVisible(false);
  };

  const columns: ColumnsType<DataType> = [
    // {
    //   title: "ID",
    //   dataIndex: "fullname",
    //   key: "fullname",
    //   render: (item: any) => <a>{item.fullname}</a>,
    // },
    {
      title: "MSSV",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="update-button"
            type="primary"
            onClick={showModalUpdate}
          >
            <EditOutlined />
          </Button>
          <Button
            className="delete-button"
            type="primary"
            danger
            onClick={showModalDelete}
          >
            {" "}
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getStudents());
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={listStudent} />;
      <Modal
        visible={visible}
        title="Cập nhật thông tin Sinh Viên"
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
        footer={[
          <Button key="back" onClick={handleUpdateCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleUpdateOk}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="input-field">
          <Input placeholder="Fullname" />
          <Input placeholder="Age" />
          <Input placeholder="MSSV" />
          <Input disabled placeholder="Username" />
          
          <Input placeholder="Phone" />
          <Input placeholder="Email" />
          <Input placeholder="Address" />
        </div>
      </Modal>
      <Modal
        title="Xóa Sinh Viên"
        visible={isModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Bạn muốn xóa sinh viên này không</p>
      </Modal>
    </>
  );
}

export default TableTemplate;
