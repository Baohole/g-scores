import { Express } from "express";

import DashBRoutes from './dashboard.routes'
import SearchRoutes from './search.routes'
import ReportRoutes from './report.routes'
// import * as AuthMdlw from '../middleware/auth.mdlw'

// import sysApi from "../config/apilink";

export default (app: Express) => {
    app.use(`/dashboard`, DashBRoutes);
    app.use(`/search`, SearchRoutes)
    app.use(`/reports`, ReportRoutes)
    // app.use(`${sysApi}/user`, UserRoutes);
    // app.use(`${sysApi}/friends`, AuthMdlw.protect, FriendRoutes);
}
