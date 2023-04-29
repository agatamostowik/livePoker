import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { getUserAccount } from "../../hooks";

export const Layout = () => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  getUserAccount();

  return <Outlet />;
};
