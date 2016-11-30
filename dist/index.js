'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxAction = function () {
	function ReduxAction(typeName, propMap, action) {
		_classCallCheck(this, ReduxAction);

		if (typeof typeName !== 'string') {
			throw new Error('Invalid Action Type');
		}

		if ((typeof propMap === 'undefined' ? 'undefined' : _typeof(propMap)) !== 'object') {
			throw new Error('Invalid Prop Map for Type ' + typeName);
		}

		if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) !== 'object') {
			throw new Error('Invalid Action for Type ' + typeName);
		}

		var actionTest = ReduxAction.isValid(action, propMap);
		if (!actionTest.result) {
			throw new Error('Invalid Action Property for Type [' + typeName + ']: [' + actionTest.key + '] expected to be type [' + actionTest.expectedType + '] but saw [' + actionTest.actualType + '] instead.');
		}

		this.typeName = typeName;
		this.propMap = propMap;
		this.props = action;
	}

	_createClass(ReduxAction, [{
		key: 'toObject',
		value: function toObject() {
			return Object.assign({}, this.props, { type: this.typeName });
		}
	}], [{
		key: 'isValid',
		value: function isValid(action, propMap) {
			for (var key in propMap) {
				var expectedType = propMap[key];
				var actualType = Array.isArray(action[key]) ? ReduxAction.ARRAY : _typeof(action[key]);
				if (actualType !== expectedType) {
					return { result: false, key: key, expectedType: expectedType, actualType: actualType };
				}
			}
			return { result: true };
		}
	}]);

	return ReduxAction;
}();

ReduxAction.STRING = 'string';
ReduxAction.OBJECT = 'object';
ReduxAction.NUMBER = 'number';
ReduxAction.ARRAY = 'array';
ReduxAction.BOOLEAN = 'boolean';

exports.default = ReduxAction;