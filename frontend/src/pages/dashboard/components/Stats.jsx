import { useEffect } from "react";
import useSeminars from "../../../hooks/useSeminars";
import StatCard from "../../../components/StatCard";
import { CheckCheck, Ellipsis, X } from "lucide-react";

const Stats = () => {
    const { counts, loading, fetchCounts } = useSeminars();

    useEffect(() => {
      fetchCounts();
    }, []);
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <StatCard
          title={"Završen"}
          value={counts.APPROVED}
          icon={CheckCheck}
          color={"cyan"}
          loading={loading}
        />
        <StatCard
          title={"U izradi"}
          value={counts.PENDING}
          icon={Ellipsis}
          color={"emerald"}
          loading={loading}
        />
        <StatCard
          title={"Odbijen"}
          value={counts.REJECTED}
          icon={X}
          color={"red"}
          loading={loading}
        />
      </div>
    );
};

export default Stats;