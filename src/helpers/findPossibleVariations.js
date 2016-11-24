// stenhård, stenhårt
const findPossibleVariations = (query, indexList) => {
	let results = [];
	const last = query.length - 1;
	if(query[last]==='t'){
		let variation_1 = query.slice(0,last);
		results = addIfExists(variation_1, indexList, results);

		let variation_2 = query.slice(0,last) + 'd';
		results = addIfExists(variation_2, indexList, results);
		
	
		console.log("findPossibleVariations >>")
		console.log(variation_1)
		console.log(variation_2)
		
	}
	console.log(results)
	return results;
}
const addIfExists = (value, list, results) => {
	
	if(list[value]){
		return Array.prototype.concat(results, list[value]);
	}
	return results;
}
export default findPossibleVariations;