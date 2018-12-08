import React,{Component} from 'react';
import {
  Form , Input
} from 'antd';
const { TextArea } = Input;

const FormItem = Form.Item;

class CustomerForm extends Component {
  componentDidMount(){
    if (this.props.initForm) {  // 这种方法都能想到, 我tm都佩服自己...
      this.props.form.setFieldsValue(this.props.initForm);
    }
  }

  render() {
    const { getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    
    getFieldDecorator('id')
    getFieldDecorator('telephone')
    getFieldDecorator('status')
    getFieldDecorator('type')
    return (
      <Form className="login-form" >

        <FormItem label='姓名' {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input placeholder="name" />
          )}
        </FormItem>
        <FormItem label='公司' {...formItemLayout}>
          {getFieldDecorator('compony', {
            rules: [{ required: true, message: 'Please input your compony!' }],
          })(
            <Input placeholder="compony" />
          )}
        </FormItem>
        <FormItem label='地址' {...formItemLayout}>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input your address!' }],
          })(
            <Input placeholder="address" />
          )}
        </FormItem>
        <FormItem label='备注' {...formItemLayout}>
          {getFieldDecorator('comment', {
            rules: [{ required: true, message: 'Please input your comment!' }],
          })(
            <TextArea placeholder="comment" autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedCustomerForm = Form.create()(CustomerForm);

export default WrappedCustomerForm;