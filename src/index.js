class ReduxAction {
	constructor(typeName, propMap, action) {
		if (typeof typeName !== 'string') {
			throw new Error(`Invalid Action Type`)
		}

		if (typeof propMap !== 'object') {
			throw new Error(`Invalid Prop Map for Type ${typeName}`)
		}

		if (typeof action !== 'object') {
			throw new Error(`Invalid Action for Type ${typeName}`)
		}

		const actionTest = ReduxAction.isValid(action, propMap)
		if (!actionTest.result) {
			throw new Error(`Invalid Action Property for Type [${typeName}]: [${actionTest.key}] expected to be type [${actionTest.expectedType}] but saw [${actionTest.actualType}] instead.`)
		}

		this.typeName = typeName
		this.propMap = propMap
		this.props = action
	}

	static isValid(action, propMap) {
		for (const key in propMap) {
			const expectedType = propMap[key]
			const actualType = (Array.isArray(action[key])) ? ReduxAction.ARRAY : typeof action[key]
			if (actualType !== expectedType) {
				return { result: false, key, expectedType, actualType }
			}
		}
		return { result: true }
	}

	toObject() {
		return Object.assign({}, this.props, { type: this.typeName })
	}
}

ReduxAction.STRING  = 'string'
ReduxAction.OBJECT  = 'object'
ReduxAction.NUMBER  = 'number'
ReduxAction.ARRAY   = 'array'
ReduxAction.BOOLEAN = 'boolean'

export default ReduxAction