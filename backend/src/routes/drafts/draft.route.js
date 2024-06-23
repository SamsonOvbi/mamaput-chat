const express = require("express");
const draftRoute = express.Router();
const { isAuth } = require("../auth/auth.middleware");
const draftContr = require("./draft.controller");

draftRoute.get("/get-all-draft", isAuth, draftContr.getAllDrafts);
draftRoute.get("/get-single-draft/:id", isAuth, draftContr.getSingleDraft);
draftRoute.post("/save-draft", isAuth, draftContr.saveDraft);
draftRoute.delete("/delete-draft/:id", isAuth, draftContr.deleteDraft);
draftRoute.put("/update-draft/:id", isAuth, draftContr.updateDraft);
draftRoute.post("/publish-draft/:id", isAuth, draftContr.publishDraft);

module.exports = draftRoute;
