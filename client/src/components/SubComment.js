import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import CommentDeleteModal from "./modals/CommentDeleteModal";
import AnonyCommentDeleteModal from "./modals/AnonyCommentDeleteModal";

function getTimeToString(inputTime) {
  let date = new Date(inputTime);

  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!

  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  yyyy = yyyy.toString();
  mm = mm.toString();
  dd = dd.toString();

  var m = date.getHours();
  var s = date.getMinutes();

  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  m = m.toString();
  s = s.toString();

  var s1 = `${yyyy}-${mm}-${dd} ${m}:${s}`;
  return s1;
}

const SubComment = ({
  uuid,
  updatedAt,
  content,
  anonymouseId,
  userId,
  deleted,
}) => {
  const loginedUserId = useSelector((state) => state?.user?.userInfo?.id);

  return (
    <Card
      sx={{
        backgroundColor: "#9F9C92",
        mb: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe" sx={{ display: "none" }}></Avatar>}
        title={userId === null ? "anonymous" : userId}
        subheader={getTimeToString(updatedAt)}
        sx={{ width: "300px" }}
      />
      <CardContent sx={{ width: "100%" }}>
        <Typography variant="h6" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      {loginedUserId === userId && deleted !== 1 && (
        <CommentDeleteModal uuid={uuid} />
      )}
      {anonymouseId !== null && deleted !== 1 && (
        <AnonyCommentDeleteModal uuid={uuid} />
      )}
    </Card>
  );
};

export default SubComment;
