import { createClient } from "@supabase/supabase-js";
import type { Response } from "express";

import asyncHandler from "./asyncHandler";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";
import ApiError from "./apiError";
import { NOT_FOUND, UNAUTHORIZED } from "../constants/status-codes";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

const bucketName = process.env.SUPABASE_BUCKET_NAME!;

const uploadTeamJson = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user?.userID) {
    throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  }

  const user = await User.findById(req.user.userID);

  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  const userAuthorised = ["ADMIN", "ORGANIZOR"].includes(user.role);

  if (!userAuthorised) {
    throw new ApiError(UNAUTHORIZED, "access denied, you arent authorised to perform this action");
  }

  const teamData = req.body;

  if (!teamData || typeof teamData !== "object") {
    return res.status(400).json({
      message: "Valid team JSON is required",
    });
  }

  const fileName = "team/team.json";

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, Buffer.from(JSON.stringify(teamData, null, 2)), {
      contentType: "application/json",
      upsert: true,
    });

  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return res.status(200).json({
    message: "Team JSON updated successfully",
    url: data.publicUrl,
  });
});

const getTeamJson = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const fileName = "team/team.json";

  const { data, error } = await supabase.storage.from(bucketName).download(fileName);

  if (error) {
    return res.status(404).json({
      message: error.message,
    });
  }

  const teamData = JSON.parse(await data.text());

  return res.status(200).json(teamData);
});

export { uploadTeamJson, getTeamJson };
