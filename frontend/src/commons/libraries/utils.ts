export const getToday = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const MM = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  return `${yyyy}/${MM}/${dd}`;
};

export const checkFileValidation = (file?: File) => {
  if (!file?.size) {
    alert('파일이 없습니다.');
    return false;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert('2MB 이하의 파일만 업로드 가능합니다.');
    return false;
  }
  if (!file.type.includes('jpeg') && !file.type.includes('png')) {
    alert('jpg 파일 또는 png 파일만 업로드 가능합니다.');
    return false;
  }

  return true;
};
