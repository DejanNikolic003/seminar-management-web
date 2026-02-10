import * as STATUS from "../constants/statusCodes.js";
import * as ROLES from "../constants/roles.js";

const isAuthorized = (role) => {
    return (req, res, next) => {
        if(![ROLES.STUDENT, ROLES.TEACHER].includes(role)) {
           return res.status(STATUS.NOT_FOUND).json({ status: "error", message: "Tražena grupa permisija ne postoji." });
        }

        const { role: userRole } = req.user;

        if(userRole !== role) {
            return res.status(STATUS.UNAUTHORIZED).json({ status: "error", message: "Niste ovlašćeni!" });
        }

        next();
    };
};

export default isAuthorized;