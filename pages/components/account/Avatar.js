import React from "react";
import Avatar from "react-avatar";

const AvatarHolder = ({ username }) => {
  return (
    <Avatar
      name={username ? username : ""}
      size="100%"
      round="50%"
      color="#174E65"
    />
  );
};

export default AvatarHolder;
