import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Log from "../../models/log.model";
import Event from "../../models/event.model";
import NotFoundError from "../../error/not-found";
import {StatusCodes} from 'http-status-codes'

/**
 * @desc    Get all logs
 * @route   GET /api/logs
 */
export const getLogs = asyncHandler(async (req: Request, res: Response) => {
  const logs = await Log.find().sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json(logs);
});

/**
 * @desc    Get logs for a specific event
 * @route   GET /api/logs/event/:eventId
 */
export const getLogsByEvent = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params;

  const eventExists = await Event.findById(eventId);
  if (!eventExists) {
    throw new NotFoundError("Event not found");
  }

  const logs = await Log.find({ eventId }).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json(logs);
});


/**
 * @desc    Get single log by ID
 * @route   GET /api/logs/:id
 */
export const getLogById = asyncHandler(async (req: Request, res: Response) => {
  const log = await Log.findById(req.params.id);

  if (!log) {
    throw new NotFoundError("Log not found");
  }

  res.status(StatusCodes.OK).json(log);
});