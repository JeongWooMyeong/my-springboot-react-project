// 하위 디렉토리까지 모두 포함
const modules = import.meta.glob('../../pages/**/*.jsx', { eager: true });

export const componentMap = {};

Object.entries(modules).forEach(([path, module]) => {
    const name = path
        .replace('../../pages/', '')   // 앞부분 제거
        .replace('.jsx', '')           // 확장자 제거
        .split('/')                    // 경로 분리
        .pop();                        // 마지막 파일명만 사용

    componentMap[name] = module.default;
});
