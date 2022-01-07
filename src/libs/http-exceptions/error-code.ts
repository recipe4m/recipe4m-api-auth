export enum ErrorCode {
  /**
   * HttpStatus =400
   */
  BAD_REQUEST = 40000,
  INVALID_TOKEN = 40001,
  INVALID_PARAM = 40002,
  INVALID_DATA = 40003,

  /**
   * HttpStatus =401
   */
  UNAUTHORIZED = 40100,
  EXPIRED_TOKEN = 40101,

  /**
   * HttpStatus =403
   */
  FORBIDDEN = 40300,
  NO_PERMISSION = 40301,
  BLOCK_STATUS = 40302,
  DORMANT_STATUS = 40303,

  /**
   * HttpStatus=404
   */
  NOT_FOUND = 40400,

  /**
   * HttpStatus =409
   */
  CONFLICT = 40900,
  ALREADY_REGISTERED = 40901,
  HAS_REFERENCE = 40902,
}
