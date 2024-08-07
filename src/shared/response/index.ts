import { Response } from "express";
import { StatusCodes } from "http-status-codes";

function sendWithData(res: Response, code: number, data: any) {
	res.status(code).send({ data }).end();
}

function sendWithError(res: Response, code: number, data: any) {
	res.status(code).send({ error: data }).end();
}

function sendWithNoContent(res: Response) {
	res.status(StatusCodes.NO_CONTENT).send().end();
}

function sendWithMessage(res: Response, code: number, msg: string) {
	res.status(code).send({ msg }).end();
}

export default {
	sendWithData,
	sendWithError,
	sendWithNoContent,
	sendWithMessage,
};
