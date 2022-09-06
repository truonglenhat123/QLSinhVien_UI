import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  createStudent,
  deleteStudent,
  getStudents,
  getStudentsById,
  listStudents,
  loadingStudent,
  studentData,
  updateStudent,
} from "../../../features/student/studentSlice";
import { getById } from "../../../api/studentClient";

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

  const DATA = useAppSelector(studentData);
  const loading: boolean = useAppSelector(loadingStudent);
  //Modal update
  const [visible, setVisible] = useState(false);

  const [student, setstudent] = useState({
    fullname: "",
    phone: "",
    age: 0,
    username: "",
    password: "",
    address: "",
    email: "",
    mssv: 0,
  });

  const showModalUpdate = async (id: number) => {
    dispatch(getStudentsById(id));
    setVisible(true);
  };
  const handleUpdateOk = async () => {
    try {
      await dispatch(updateStudent({ id: DATA!?.id as number, data: student }));
      await dispatch(getStudents());
    } catch (error) {}
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };
  useEffect(() => {
    if (DATA) {
      // debugger
      setstudent({ ...DATA });
    }
  }, [DATA]);

  const handleUpdateCancel = () => {
    setVisible(false);
  };

  //Modal delete
  const [isModalVisible, setIsModalDeleteVisible] = useState(false);

  const showModalDelete = (id: number) => {
    dispatch(getStudentsById(id));
    setIsModalDeleteVisible(true);
  };

  const handleDeleteOk = async () => {
    try {
      await dispatch(deleteStudent(DATA!.id));
      await dispatch(getStudents());
      setIsModalDeleteVisible(false);
    } catch (error) {}
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
      render: (_, record: any) => (
        <Space size="middle">
          <Button
            className="update-button"
            type="primary"
            onClick={() => showModalUpdate(record.id)}
          >
            <EditOutlined />
          </Button>
          <Button
            className="delete-button"
            type="primary"
            danger
            onClick={() => showModalDelete(record.id)}
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
      <Table columns={columns} dataSource={listStudent} />
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
          <Input
            value={student.fullname}
            placeholder="Fullname"
            onChange={(e) =>
              setstudent({ ...student, fullname: e.target.value })
            }
          />
          <Input
            value={student.age}
            placeholder="Age"
            onChange={(e) =>
              setstudent({ ...student, age: Number(e.target.value) })
            }
          />
          <Input
            value={student.mssv}
            placeholder="MSSV"
            onChange={(e) =>
              setstudent({ ...student, mssv: Number(e.target.value) })
            }
          />
          <Input
            value={student.username}
            disabled
            placeholder="Username"
            onChange={(e) =>
              setstudent({ ...student, username: e.target.value })
            }
          />
          <Input
            value={student.password}
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setstudent({ ...student, password: e.target.value })
            }
          />
          <Input
            value={student.phone}
            placeholder="Phone"
            onChange={(e) => setstudent({ ...student, phone: e.target.value })}
          />
          <Input
            value={student.email}
            placeholder="Email"
            onChange={(e) => setstudent({ ...student, email: e.target.value })}
          />
          <Input
            value={student.address}
            placeholder="Address"
            onChange={(e) =>
              setstudent({ ...student, address: e.target.value })
            }
          />
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
