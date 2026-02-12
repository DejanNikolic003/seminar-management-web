import { STYLES } from "../constants/alert";

const Alert = ({ type = "success", children }) => {
  return (
    <div className={`p-2 rounded-lg border ${STYLES[type]} mb-2 text-sm`}>
      {children}
    </div>
  );
};

export default Alert;
