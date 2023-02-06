import { StarOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

function RatingModal({ children }: any) {
  const { auth } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  let navigate = useNavigate();
  let { slug } = useParams();

  const handleModal = () => {
    if (auth && auth.idToken) {
      setModalVisible(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {auth ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. It will apper soon");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
}

export default RatingModal;
