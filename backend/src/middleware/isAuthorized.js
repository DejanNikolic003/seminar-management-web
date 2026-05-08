import * as ROLES from "../constants/roles.js";

const isAuthorized = (role) => {
    return (req, res, next) => {
        const allowedRoles = Array.isArray(role) ? role : [role];

        if (!allowedRoles.every(currentRole => [ROLES.ADMIN, ROLES.STUDENT, ROLES.PROFESSOR].includes(currentRole)))
           return res.status(404).json({ message: "Tražena grupa permisija ne postoji." });

        const { role: userRole } = req.user;
        if(!allowedRoles.includes(userRole))
            return res.status(401).json({ message: "Niste ovlašćeni!" });

        next();
    };
};

export default isAuthorized;