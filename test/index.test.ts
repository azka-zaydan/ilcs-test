import { expect } from "chai";
import { describe, it } from "mocha";
import { agent as request } from "supertest";
import app from "../src";
describe("Get Task By ID Test", () => {
	it("SHOULD GET /v1/task/:id AND ERROR BAD REQUEST", function (done) {
		request(app)
			.get("/v1/task/123")
			.end((err, res) => {
				if (err) return done(err);
				expect(res.status).to.equal(400);
				expect(res.body).not.to.be.empty;
				expect(res.body.error.message).to.equal("Invalid ID Param");
				done();
			});
	});
});

describe("Create Task", () => {
	it("SHOULD POST /v1/task/ AND ERROR BAD REQUEST", function (done) {
		request(app)
			.post("/v1/task")
			.send({ title: "asdasd", status: "bad", createdBy: "1001" })
			.end((err, res) => {
				if (err) return done(err);
				expect(res.status).to.equal(400);
				expect(res.body).not.to.be.empty;
				done();
			});
	});
});

describe("Upadate Task By ID", () => {
	it("SHOULD PUT /v1/task/:id AND ERROR BAD REQUEST", function (done) {
		request(app)
			.put("/v1/task/123")
			.send({ title: "asdasd", status: "pending", updatedBy: "1001" })
			.end((err, res) => {
				if (err) return done(err);
				expect(res.status).to.equal(400);
				expect(res.body).not.to.be.empty;
				expect(res.body.error.message).to.equal("Invalid ID Param");
				done();
			});
	});
	it("SHOULD PUT /v1/task/:id AND ERROR BAD REQUEST", function (done) {
		request(app)
			.put("/v1/task/e7ed8242-c47a-4a31-943b-68856afa10a7")
			.send({ title: "asdasd", status: "bad", updatedBy: "1001" })
			.end((err, res) => {
				if (err) return done(err);
				expect(res.status).to.equal(400);
				expect(res.body).not.to.be.empty;
				done();
			});
		request(app)
			.get("/v1/task")
			.end((err, res) => {
				if (err) return done(err);
				console.log(res);
				done();
			});
	});
});
