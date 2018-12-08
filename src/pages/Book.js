import React ,{Component} from 'react';
import { Table} from 'antd';
import './Book.css'
import {connect} from 'react-redux'
import store from '../store'
import {findBook} from '../store/book/BookAction'

class Book extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
      columns:[{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width:200
      }, {
        title: '手缝米数',
        dataIndex: 'sewingmeter',
        key: 'sewingmeter',
        width:100,
        align:'center'
      }, {
        title: '手缝单价',
        dataIndex: 'sewingprice',
        key: 'sewingprice',
        width:100,
        align:'center'
      }, {
        title: '描述',
        dataIndex: 'comment',
        key: 'comment',
      }
      //, {
      //   title: '操作',
      //   align:'center',
      //   key: 'action',
      //   render: (text, record) => (
      //     <span>
      //       <Button href="#"><i className="fa fa-pencil"></i></Button> &nbsp;&nbsp;&nbsp;
      //       <Button href="#"><i className="fa fa-close"></i></Button>
      //     </span>
      //   )
      // }
    ]
    }
  }

  componentWillMount(){
    let params = {
      page:0,
      pageSize:100
    }
    store.dispatch(findBook(params))
  }
  render(){
    return (
      <div className="book">
        {/* <div className="btns">
          <Button type="primary">新增</Button>
        </div> */}
        {/* {JSON.stringify(this.props.BookProducer)} */}
        <Table 
          size='small'
          rowKey='id' 
          dataSource={this.props.BookProducer.books.list} 
          columns={this.state.columns} 
          pagination={
            {
              total:this.props.BookProducer.books.total,
              pageSize:5
            }
          }
          />
      </div>
    )
  }
}
export default connect(state=>state)(Book);;
