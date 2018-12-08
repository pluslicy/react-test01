import React ,{Component} from 'react';
import { 
  Button,Table,Popconfirm, notification,Modal
} from 'antd';
import CustomerForm from '../components/CustomerForm'
import './Customer.css'
import {connect} from 'react-redux'
import store from '../store'
import {
  findCustomer,
  deleteCustomer,
  saveOrUpdateCustomer
} from '../store/customer/CustomerAction'

class Customer extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
      title:'保存顾客信息',
      visible:false,
      initForm:{
       
      },
      confirmLoading:false,
      columns:[{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width:100
      }, {
        title: '公司',
        dataIndex: 'compony',
        key: 'compony',
        width:200,
      }, {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width:200,
      }, {
        title: '描述',
        dataIndex: 'comment',
        key: 'comment',
      }, {
        title: '操作',
        align:'center',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button href="#" onClick={this.handleToEdit.bind(this,record)}><i className="fa fa-pencil"></i></Button> &nbsp;&nbsp;&nbsp;
            <Popconfirm title="Are you sure delete this Person?" onConfirm={this.handleDeleteConfirm.bind(this,record.id)} okText="Yes" cancelText="No">
              <Button href="#"><i className="fa fa-close"></i></Button>
            </Popconfirm>
          </span>
        )
      }]
    }
  }

  // 去添加
  handleToAddCustomer = (event) => {
    this.setState({
      title:'保存顾客信息',
      visible: true
    });
   
    event.preventDefault();
  }
  // 点击取消
  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.state.form.resetFields();
  }
  // 去编辑
  handleToEdit = (record,event)=>{
    this.setState({
      title:'修改顾客信息',
      visible: true,
      initForm:record
    });

    if(this.state.form){
      this.state.form.resetFields();
      this.state.form.setFieldsValue(record);
    } else {
      this.setState({
        initForm :record
      })
    }
   
    event.preventDefault();
  }
  // 点击确定
  handleOk=()=>{
    this.state.form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      values.type = 'normal';
      values.status = '启用';
      store.dispatch(saveOrUpdateCustomer(values))
      .then(()=>{
        this.state.form.resetFields();
        this.setState({
          visible:false
        })
        notification.info({message:'保存成功'});
      })
      .catch(()=>{
        notification.error({message:'未知异常'});
      })

    });
  }
  
  handleDeleteConfirm(id){
    // 通过ID删除顾客
    store.dispatch(deleteCustomer(id))
    .then(()=>{
      if(this.props.CustomerProducer.status === 'error'){
        notification.info({message:'删除失败'});
      } else {
        notification.info({message:"删除成功"});
      }
    })
  }
  saveFormRef = (form) => {
    this.setState({
      form
    })
  }

  componentWillMount(){
    let params = {
      page:0,
      pageSize:100
    }
    // 查询所有顾客
    store.dispatch(findCustomer(params))
  }
  render(){

    return (
      <div className="customer">
      
      {/* {JSON.stringify(this.props.CustomerProducer.status)} */}
        {/* 按钮区域 */}
        <div className="btns">
          <Button type="primary" onClick={this.handleToAddCustomer}>新增</Button>
        </div>
        {/* 表格内容 */}
        <Table 
          size='small'
          rowKey='id' 
          dataSource={this.props.CustomerProducer.customers.list} 
          columns={this.state.columns} 
          pagination={
            {
              total:this.props.CustomerProducer.customers.total,
              pageSize:5
            }
          }
          />
        {/* 模态框 */}
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CustomerForm  initForm={this.state.initForm}  ref={this.saveFormRef}/>
        </Modal>
      </div>
    )
  }
}
export default connect(state=>state)(Customer);;
