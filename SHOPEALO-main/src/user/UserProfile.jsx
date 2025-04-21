import { useContext } from "react";
import { OrdenHistoryContainer } from "./OrdenHistoryContainer";
import { UserInfo } from "./UserInfo";
import Spinner from "../components/ui/Spinner";
import { AuthContext } from "../context/AuthContext";

export const UserProfile = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return <Spinner loading={true} />;

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <UserInfo userinfo={user} />
      <OrdenHistoryContainer />
    </div>
  );
};
