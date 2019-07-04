import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from '../packages/button'
import Menu from '../packages/menu'
import Table from '../packages/table'
import Form from '../packages/form'
import Pager from '../packages/pager'
import Switch from '../packages/switch'

storiesOf('Basic', module)
  .add('Button', () => {
    return (
      <div>
        <Button onClick={action('clicked')}>Hello Button</Button>
        <Button disabled={true}>Hello Button</Button>
      </div>
    )
  })


storiesOf('Navigation', module)
  .add('Menu', () => {
    console.log(11111111111);
    return (
      <div>
        <Menu defaultActive="1">
          <Menu.Item index="1">处理中心</Menu.Item>
          <Menu.SubMenu index="2" title="我的工作台">
            <Menu.Item index="2-1">选项1</Menu.Item>
            <Menu.Item index="2-2">选项2</Menu.Item>
            <Menu.Item index="2-3">选项3</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item index="3">订单管理</Menu.Item>
        </Menu>
      </div>
    )
  })
  .add('Pager', () => {
    return (
      <div>
        <Pager total={5}  onChange={(current)  =>  this.handleChange(current)} ></Pager>
      </div>
    )
  })
storiesOf('Display', module)
  .add('table', () => {
    let state = {
      columns: [
        {
          label: "日期",
          prop: "date",
          width: 180
        },
        {
          label: "姓名",
          prop: "name",
          width: 180
        },
        {
          label: "地址",
          prop: "address"
        }
      ],
      data: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }

    return (
      <div>
        <Table
          columns={state.columns}
          data={state.data}
        />
      </div>
    )
  })


class FormDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.refs.form.validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  handleReset(e) {
    e.preventDefault();

    this.refs.form.resetFields();
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value.currentTarget.value })
    });
  }

  render() {
    return (
      <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80">
        <Form.Item label="活动名称" prop="name">
          <input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} />
        </Form.Item>
      </Form>
    )
  }
}

storiesOf('data Input', module)
  .add('form', () => {
    return (
      <div>
        <FormDemo></FormDemo>
      </div>
    )
  })
  .add('switch', () => {
    function onChange(v){
      console.log(v);
    }
    return (
      <div>
        <Switch onChange={onChange}></Switch>
      </div>
    )
  })