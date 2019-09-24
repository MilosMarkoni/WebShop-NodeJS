const prepareQuery = unparsedQuery => {
	let query = [];
	let tempObj = {};

	for (const [paramName, paramValue] of Object.entries({ ...unparsedQuery })) {
		if (paramName !== "perPage" && paramName !== "pageNum") {
			query[paramName] = !isNaN(paramValue) ? parseInt(paramValue) : paramValue;
		} else {
			tempObj[paramName] = parseInt(paramValue);
		}
	}

	return { ...tempObj, filter: { ...query } };
};

module.exports = {
	prepareQuery,
};
