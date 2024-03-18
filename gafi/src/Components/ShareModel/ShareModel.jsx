import React, { useState } from "react";
import { Modal } from "@mantine/core";
import PostShare from "../SharePost/PostShare"
const ShareModel = ({ modelsOpened}) => {
  const [exist,setExist] = useState(null)
  const Close = ()=>{
     setExist(false)
  }
  return (
    <Modal
      title="Share"
      size="55%"
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modelsOpened}
      onClose={Close}
    >
     <PostShare/>
    </Modal>
  );
};

export default ShareModel;
