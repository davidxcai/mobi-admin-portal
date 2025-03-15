import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { RootState } from "../redux/store";
import {
  toggleDarkMode,
  setCurrentPage,
  openModal,
  closeModal,
} from "../redux/slices/uiSlice";

const useUi = () => {
  const dispatch = useDispatch();

  // States
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const currentPage = useSelector((state: RootState) => state.ui.currentPage);
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);

  // Actions
  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  const changePage = useCallback(
    (page: string) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const openModalHandler = useCallback(() => {
    dispatch(openModal());
  }, [dispatch]);

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  // Effects/Navigation

  // Memoized return
  return useMemo(
    () => ({
      darkMode,
      currentPage,
      isModalOpen,
      toggleDarkModeHandler,
      changePage,
      openModalHandler,
      closeModalHandler,
    }),
    [
      darkMode,
      currentPage,
      isModalOpen,
      toggleDarkModeHandler,
      changePage,
      openModalHandler,
      closeModalHandler,
    ]
  );
};

export default useUi;
