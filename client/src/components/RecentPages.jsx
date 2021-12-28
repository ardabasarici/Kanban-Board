import LooksOneRoundedIcon from "@mui/icons-material/LooksOneRounded";
import LooksTwoRoundedIcon from "@mui/icons-material/LooksTwoRounded";
import LooksThreeRoundedIcon from "@mui/icons-material/Looks3Rounded";
import LooksFourRoundedIcon from "@mui/icons-material/Looks4Rounded";
import LooksFiveRoundedIcon from "@mui/icons-material/Looks5Rounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import React from "react";
import { v4 as uuid } from "uuid";
import store from "store";
import { useNavigate } from "react-router-dom";

function RecentPages({ setBoardId }) {
  let navigate = useNavigate();
  const clickHandler = (index) => {
    let boardId =
      store.get("history", []).length > index
        ? store.get("history", []).reverse()[index]
        : uuid();
    setBoardId(boardId);
    navigate(`/${boardId}`);
  };

  let recentPagesButtons = [
    {
      icon: <LooksOneRoundedIcon />,
      BoardId:
        store.get("history", []).length > 0
          ? store.get("history").reverse()[0]
          : "new board",
    },
    {
      icon: <LooksTwoRoundedIcon />,
      BoardId:
        store.get("history", []).length > 1
          ? store.get("history").reverse()[1]
          : "new board",
    },
    {
      icon: <LooksThreeRoundedIcon />,
      BoardId:
        store.get("history", []).length > 2
          ? store.get("history").reverse()[2]
          : "new board",
    },
    {
      icon: <LooksFourRoundedIcon />,
      BoardId:
        store.get("history", []).length > 3
          ? store.get("history").reverse()[3]
          : "new board",
    },
    {
      icon: <LooksFiveRoundedIcon />,
      BoardId:
        store.get("history", []).length > 4
          ? store.get("history").reverse()[4]
          : "new board",
    },
  ];

  return (
    <div className="rencent_pages">
      <SpeedDial
        ariaLabel="recent_pages"
        sx={{ position: "absolute", top: 16, right: 16 }}
        icon={<HistoryRoundedIcon />}
        direction="left"
        color="secondary"
      >
        {recentPagesButtons.map((button, index) => (
          <SpeedDialAction
            key={uuid()}
            icon={button.icon}
            tooltipTitle={"Board ID: " + button.BoardId}
            onClick={() => clickHandler(index)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default RecentPages;
