import { describe, expect, test, it, vi } from 'vitest';
import request from "supertest";
import { app } from "../index"
import { RequestType } from '@prisma/client';
import { prismaClient } from '../db';

vi.mock('../db', () => ({
  prismaClient: {
    sum: {
      create: vi.fn(),
      findFirst: vi.fn(),
      // user: {
      //   findFirst: vi.fn(),
      //   create: vi.fn(),
      //   update: vi.fn(),
      //   delete: vi.fn()
      // }
    }
  }
}));

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
      type: RequestType.ADD
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
      type: RequestType.MULTIPLY
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(2);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).post("/sum").send({});
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  });
});

// describe("GET /sum", () => {
//   it("should return the sum of two numbers", async () => {
//     const res = await request(app)
//       .get("/sum")
//       .set({
//         a: "1",
//         b: "2"
//       })
//       .send();
//     expect(res.statusCode).toBe(200);
//     expect(res.body.answer).toBe(3);
//   });

//   it("should return 411 if no inputs are provided", async () => {
//     const res = await request(app).get("/sum").send({});
//     expect(res.statusCode).toBe(411);
//     expect(res.body.message).toBe("Incorrect inputs");
//   });
// })