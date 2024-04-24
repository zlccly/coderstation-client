import { useState, useEffect } from "react";
import PagerHeader from "../components/PagerHeader";
import styles from "../css/Issue.module.css";
import { getIssutByPage } from "../api/issue";
import IssueItem from "../components/IssueItem";
import { Pagination } from "antd";
import AddIssueBtn from "../components/AddIssueBtn";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
function Issues(props) {
  const [issueInfo, setIssueInfo] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });

  useEffect(() => {
    async function fecthData() {
      const { data } = await getIssutByPage({
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      });
      console.log(data, "分页获取问答数据");
      setIssueInfo(data.data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }
    fecthData();
  }, [pageInfo.current, pageInfo.pageSize]);

  const issueList = issueInfo.map((item, index) => {
    return <IssueItem key={index} issueInfo={item} />;
  });
  function handlePageChange(page, pagesize) {
    console.log(page, pagesize, "hhhhhhhhh");
    setPageInfo({
      ...pageInfo,
      current: page,
      pageSize: pagesize,
    });
  }

  return (
    <div className={styles.container}>
      {/* 头部区域 */}
      <PagerHeader title="问答列表" />
      {/* 列表内容区域 */}
      <div className={styles.issueContainer}>
        {/* 左侧区域 */}
        <div className={styles.leftSlide}>
          {issueList}
          <Pagination
            className="paginationContainer"
            {...pageInfo}
            showQuickJumper
            showSizeChanger
            pageSizeOptions={[5, 10, 15, 20]}
            onChange={handlePageChange}
          />
        </div>

        {/* 右侧区域 */}
        <div className={styles.rightSide}>
          <AddIssueBtn />
          <div style={{ marginBottom: "30px" }}>
            <Recommend />
          </div>
          <ScoreRank />
        </div>
      </div>
    </div>
  );
}

export default Issues;
