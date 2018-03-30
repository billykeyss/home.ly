const moment = require('moment');

module.exports = {
	groupBy: function(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) hash[array[i][property]] = [];
        hash[array[i][property]].push(array[i]);
    }
    return hash;
	},

	convertUnixToMomentString(unix) {
		return moment(unix * 1000).utcOffset('-0400').format("dddd, MMMM Do YYYY, H:mm:ss");
	},

	convertUnixToMomentStringTable(unix) {
		return moment(unix * 1000).utcOffset('-0400').format("MMMM D YYYY, HH:mm:ss");
	},

	convertUnixToMomentStringSnoreGraph(unix) {
		return moment(unix * 1000).utcOffset('-0400').format("dddd, MMMM Do YYYY, H:mm:ss:SS");
	},

	getMaxValueFromArray(array) {
    return Math.max.apply( Math, array );
	},

	roundArrayTwoDecimal(array) {
		var x = 0;
		var len = array.length
		while(x < len){
		    array[x] = array[x].toFixed(2);
		    x++;
		}
		return array;
	}
};
