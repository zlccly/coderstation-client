import { useState, useEffect } from "react";
import PagerHeader from "../components/PagerHeader";
import styles from "../css/Issue.module.css";
import { getIssutByPage } from "../api/issue";
import IssueItem from "../components/IssueItem";
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
      console.log(data.data, "分页获取问答数据");
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

  return (
    <div className={styles.container}>
      {/* 头部区域 */}
      <PagerHeader title="问答列表" />
      {/* 列表内容区域 */}
      <div className={styles.issueContainer}>
        {/* 左侧区域 */}
        <div className={styles.leftSlide}>{issueList}</div>
        {/* 右侧区域 */}
        <div className={styles.rightSlide}></div>
      </div>
    </div>
  );
}

export default Issues;
