export function getAttribute(pAttribute: string) {
    return  pAttribute.replace(/[^a-zA-Z]/g, "");
}