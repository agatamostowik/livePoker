import { Navigate, useNavigate } from "react-router-dom";
import { AuthApi } from "../../redux/RTK";

export const Rooms = () => {
  const navigate = useNavigate();
  const me = AuthApi.endpoints.me.useQuery();

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Game name</th>
            <th>Dealer</th>
            <th>Bids</th>
            <th>Players</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Poker Game!</td>
            <td>Agata Mostowik</td>
            <td>10$/20$</td>
            <td>2 / 6</td>
            <td>
              <button>Join</button>
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleSignIn}>Login</button>
      <button>Create room</button>
    </div>
  );
};
