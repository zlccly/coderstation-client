import { useState, useEffect } from "react";
import { getUserByPointsRank } from "../api/user";
import ScoreItem from "./ScoreItem";
import { Card } from "antd";

function ScoreRank(props) {
  const [userRankInfo, setUserRankInfo] = useState([]);
  useEffect(() => {
    async function fetchDate() {
      const result = await getUserByPointsRank();
      console.log(result, "获取积分排名前十的用户列表");
      setUserRankInfo(result.data);
    }
    fetchDate();
  }, []);
  const userPointsRankArr = userRankInfo.map((item, index) => (
    <ScoreItem rankInfo={item} rank={index + 1} key={item._id}></ScoreItem>
  ));

  return (
    <div>
      <Card title="积分排行榜">{userPointsRankArr}</Card>
    </div>
  );
}

export default ScoreRank;
