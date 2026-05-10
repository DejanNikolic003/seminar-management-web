const STATUSES = {
    RESERVED: "RESERVISAN",
    SUBMITTED: "PREDAT",
    DEFENDED: "ODBRANJEN",
    DECLINED: "ODBIJEN",
}

const STATUS_STYLES = {
    RESERVED: "bg-green-100 text-green-700",
    SUBMITTED: "bg-amber-100 text-amber-700",
    DEFENDED: "bg-cyan-100 text-cyan-700",
    DECLINED: "bg-rose-100 text-rose-700",
};

const SeminarStatusBadge = ({ status }) => {
    if (!status) return null;

    return (
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.RESERVED}`}>
            {STATUSES[status] || status}
        </span>
    );
};

export default SeminarStatusBadge;
