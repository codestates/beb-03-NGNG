import request from "supertest";
import app from "../config/express";

const http = request(app);
export default http;