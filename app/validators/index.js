const { LinValidator, Rule } = require('../../core/lin-validator')

/**
 * 正整数校验
 */
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [new Rule('isInt', '需要是正整数', { min: 1 })]
    }
}

/**
 * 空判断
 */
class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.email = [new Rule('isLength', 'email不允许为空', { min: 1 })]
    }
}

/**
 * 提交周报校验
 */
class SubmitWeeklyValidator extends NotEmptyValidator {}

/**
 * 查询周报校验
 */
class PreviewWeeklyValidator extends LinValidator {
    constructor() {
        super()
        this.date = [new Rule('isLength', 'date不允许为空', { min: 1 })]
        this.type = [new Rule('isLength', 'type不允许为空', { min: 1 })]
    }
}

class SearchWeeklyValidator extends LinValidator {}

module.exports = {
    PositiveIntegerValidator,
    NotEmptyValidator,
    SubmitWeeklyValidator,
    PreviewWeeklyValidator,
    SearchWeeklyValidator,
}
