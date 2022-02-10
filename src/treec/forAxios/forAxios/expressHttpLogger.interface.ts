import axios from "axios";
import { Request, Response } from "express";
import { IHttpLogger } from "../httpLogger.interface";

export interface IExpressHttpLogger extends IHttpLogger<Request, Response, Error>{}

