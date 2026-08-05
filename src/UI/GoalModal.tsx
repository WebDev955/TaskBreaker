import React, { useState } from "react"
import { Button, Modal } from "antd"
import GoalForm from "../components/AddNewGoal/GoalForm"

const GoalModal = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 1000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "whitesmoke",
          color: "black",
          border: "2px solid black",
          borderRadius: "20px",
        }}
      >
        Add Goal!
      </Button>
      <Modal
        open={open}
        title="1. Add a Goal and Goal Completion Date"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[null]}
      >
        <GoalForm closeModal={handleOk} />
      </Modal>
    </>
  )
}
export default GoalModal
