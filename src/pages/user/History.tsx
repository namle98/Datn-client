import UserNav from "../../components/userNav/userNav";
import "./styles.scss";

function HistoryPage() {
  return (
    <div className="history-page">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col">
            <div className="content">History</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
