const express = require("express");
const router = express.Router();

router.get("/", async (req,res) =>{
    if (req.isAuthenticated()) {
        if (req.session.passport.user === "admin") {
            const today = new Date();
            let year = req.query.year || today.getFullYear();
            let month = req.query.month || today.getMonth() + 1;
            if (month < (today.getMonth() + 1)) {
                month = today.getMonth() + 1;
            }
            res.render("admin/Dashboard", {
                title: "Dashboard",
                layout: "admin",
                Month: month,
                Year: year,
                mainJs: () => 'empty',
            });
        }
    } else {
        res.redirect('/');
    }
})

module.exports = router;