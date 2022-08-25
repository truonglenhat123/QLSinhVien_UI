import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
  key: string;
  fullname: string;
  age: number;
  address: string;
  id: string;
  username: string;
  password: string;
  phone:string;
  email: string;

}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'MSSV',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Họ và Tên',
    dataIndex: 'fullname',
    key: 'address',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Phone',
    dataIndex: 'Phone',
    key: 'Phone',
  },
  {
    title: 'Email',
    dataIndex: 'Email',
    key: 'Email',
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
  },
  
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
         <Button className="update-button" type="primary" ><EditOutlined /> </Button>
         <Button className="delete-button" type="primary" danger><DeleteOutlined /></Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    
    key: '1',
    id: '1001',
    phone:'09374363272',
    fullname: 'John Brown',
    username: 'JohnBrown',
    password: 'password',
    age: 32,
    address: 'New York No. 1 Lake Park',
    email: 'kieubob123@gmail.com'

  },
  {
    key: '2',
    id: '1002',
    phone:'09374363272',
    fullname: 'truong le',
    username: 'truongle',
    password: 'password',
    age: 32,
    address: 'New York No. 1 Lake Park',
    email: 'kieubob123@gmail.com'
  },
  {
    key: '3',
    id: '1003',
    phone:'09374363272',
    fullname: 'Harry Marguie',
    username: 'HarryMarguie',
    password: 'password',
    age: 32,
    address: 'New York No. 1 Lake Park',
    email: 'kieubob123@gmail.com'
  },
];

const App: React.FC = () => <Table columns={columns} dataSource={data} />;

export default App;