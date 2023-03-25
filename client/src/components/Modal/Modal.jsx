import React from "react";
import UiDialog from "../../ui/uiKit/componentsUi/UiDialog";
import SearchForm from "./SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../state/reducers/appSlice";

export default function Modal() {
  const { isOpen } = useSelector((state) => state.app.modal);
  const dispatch = useDispatch();

  const handleOnClose = () => {
    console.log("close modal");
    dispatch(closeModal());
  };

  return (
    <UiDialog open={isOpen} onClose={handleOnClose}>
      <SearchForm />
    </UiDialog>
  );
}
