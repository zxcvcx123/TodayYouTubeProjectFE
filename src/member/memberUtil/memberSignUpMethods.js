import axios from "axios";

/* 검증 관련 메세지 */
const defaultMessage = "중복확인이 필요합니다";
const defaultPatterns = "영어 소문자와 숫자만 입력 가능합니다";
const defaultLength = "글자 이상 입력 가능합니다";

/* 비밀번호 형식 검증 */
function validatePassword(password) {
  // 대,소문자, 숫자 포함 여부 및 특수문자 필수 포함
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  // IBM 규칙에 따라 가능한 특수 기호
  const hasSpecialChar = /[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>,.?/]/.test(
    password,
  );
  // 일치 갯수 계산 로직
  const findPatternMatches = [hasUpperCase, hasLowerCase, hasNumber];
  const countMatches = findPatternMatches.filter(Boolean).length;

  return countMatches > 1 && hasSpecialChar;
}

/* 이메일 형식 검증 */
function validateEmail(email) {
  const hasAvailableRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(
    email,
  );

  return hasAvailableRegex;
}

/* 소문자와 숫자 조합 검증 */
export const englishAndNumberOnly = (item) => {
  // 영문자와 소문자만 입력 가능
  return !/^[a-z0-9]+$/.test(item);
};

export {
  defaultMessage,
  defaultPatterns,
  defaultLength,
  validateEmail,
  validatePassword,
};
