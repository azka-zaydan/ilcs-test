export type RepoError = Promise<{
	failure?: Failure;
}>;

export type Failure = {
	error: Error;
	code: number;
};
