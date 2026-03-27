export function toCamelCase(pString: string) {
    if(pString == '') return "label";
    const noAccent = pString
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
    
    const camelCase = noAccent
        .split(/\s+/)
        .map((word, index) =>
        index === 0
            ? word
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
    return camelCase;
}
