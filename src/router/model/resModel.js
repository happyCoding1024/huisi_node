class BaseModel {
  constructor(data, message) {
    // 我们需要传入的data应该是一个对象，message应该是一个字符串，但是
    // 如果只传入了一个字符串，那么也需要兼容这种情况，此时将this.message
    // 赋值为data。
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}