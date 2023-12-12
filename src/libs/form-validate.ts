export function maxFileSize(v: FileList | undefined) {
  if (v && v.length > 0) {
    return (
      v[0].size < 1 * 1024 * 1024 || "1MB 이하의 이미지 파일만 가능합니다."
    );
  }
}
