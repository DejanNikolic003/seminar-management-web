const STATUSES = {
    SUBMITTED: "PRIJAVLJEN",
    APPROVED: "ODOBREN",
    DEFENDED: "ODBRANJEN",
}

const STATUS_STYLES = {
    DRAFT: "bg-slate-100 text-slate-700",
    SUBMITTED: "bg-amber-100 text-amber-700",
    APPROVED: "bg-emerald-100 text-emerald-700",
    DEFENDED: "bg-cyan-100 text-cyan-700",
};

const SeminarStatusBadge = ({ status }) => {
    if (!status) return null;

    return (
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.DRAFT}`}>
            {STATUSES[status] || status}
        </span>
    );
};

export default SeminarStatusBadge;
