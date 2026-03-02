import * as ROLES from "../constants/roles.js";

const isAuthorized = (role) => {
    return (req, res, next) => {
        if(![ROLES.STUDENT, ROLES.PROFESSOR].includes(role))
           return res.status(404).json({ message: "Tražena grupa permisija ne postoji." });

        const { role: userRole } = req.user;
        if(userRole !== role)
            return res.status(401).json({ message: "Niste ovlašćeni!" });

        next();
    };
};

export default isAuthorized;