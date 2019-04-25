import * as React from 'react';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  console.log('行号4:', state);
  return {
    msg: '你好世界测试'
  };
};

const mapDispatchToProps = props => {
  return {
    ceshi() {}
  };
};

interface P
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}
function IndexPage(props: P) {
  return <div>{props.msg}</div>;
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
