import * as React from 'react';
import { connect } from 'react-redux';
import { Pagination, List, BackTop, Row, Col, Affix, Divider, Tag } from 'antd';
import BlogCell from '../../components/blog-cell';
import API from '../../axios/githubAPI';

const mapStateToProps = state => {
  return {
    blogList: state.blogList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getIssuseData() {
      API.issuse
        .getAll({
          params: {
            state: 'all'
          }
        })

        .then(res => {
          dispatch({
            type: 'blogList/update',
            payload: res
          });
        });
    }
  };
};

interface P
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

function IndexPage(props: P) {
  React.useEffect(() => {
    props.getIssuseData();
  }, []);
  return (
    <Row style={{ maxWidth: 1200, margin: 'auto', padding: 20 }} gutter={20}>
      <Col xs={24} sm={16}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={props.blogList}
          pagination={{
            onChange: page => {
              window.scrollTo(0, 0);
            },
            showQuickJumper: true,
            showSizeChanger: true
          }}
          renderItem={BlogCell}
        />
      </Col>
      <Col xs={0} sm={8}>
        <Affix offsetTop={20}>
          <div>
            <div style={{ marginBottom: 10 }}>标签</div>
            <div>
              {['magenta', 'red', 'volcano'].map(item => {
                return (
                  <Tag style={{ marginBottom: 10 }} key={item} color={item}>
                    {item}
                  </Tag>
                );
              })}
            </div>
            <Divider />
            右侧
            <Divider />
            测试
            <Divider />
            测试
          </div>
        </Affix>
      </Col>
      <BackTop />
    </Row>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
