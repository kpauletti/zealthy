import request from "supertest";
import app from "../app";

describe("GET /status/info", () => {
    it("should return 200 OK", () => {
        return request(app).get("/status/info").expect(200);
    });
});

describe("GET /status/health", () => {
    it("should return 200 OK", () => {
        return request(app).get("/status/health").expect(200);
    });
});

describe("GET /status/metrics", () => {
    it("should return 200 OK", () => {
        return request(app).get("/status/metrics").expect(200);
    });
});
